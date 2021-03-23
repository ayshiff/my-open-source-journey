---
id: changesets80
title: Changesets - Comment on released PRs and issues
sidebar_label: 8. Changesets - Comment on released PRs and issues
---

<p className="post_date">22 Mar 2021</p>

export const Highlight = ({children, color}) => ( <span style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#fff',
      padding: '0.2rem',
      fontWeight: 600,
    }}>{children}</span> );

import useBaseUrl from '@docusaurus/useBaseUrl';
import { Open, ImageWrapper } from '../utils.md';

<div className="pr_infos">
<div className="marginBottom">
    <div>
        <Open />
    </div>
  <span className="badge badge--secondary marginRight">GitHub</span>
  <span className="badge badge--secondary marginRight">Versioning</span>
  <span className="badge badge--secondary marginRight">Changelogs</span>
  <span className="badge badge--secondary marginRight">Monorepos</span>
</div>
</div>

:::info Contribution link
https://github.com/changesets/action/pull/80
:::

:::tip Contribution Type
This contribution is a new **feature**.
:::

## Introduction

<div className="image-wrapper">
  <ImageWrapper src={useBaseUrl('img/changesets/cover.jpg')} width="100%" alt="Contribution presentation" />
<em>Changesets releases</em>
</div>

### Project

You can find the **Changesets project presentation** <a href="/docs/projects/changesets"><Highlight color="#203666">here</Highlight></a>.

### Context

This contribution will be made to a specific part of the Changesets project, the <a href="https://github.com/changesets/action"><Highlight color="#203666">Changesets Release Action</Highlight></a>.   
This action will create a release pull request with all the package versions and changelogs updated.  

Here is a workflow example.

```yml
name: Release

on:
  push:
    branches:
      - master

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repo
        uses: actions/checkout@master
        with:
          fetch-depth: 0

      - name: Setup Node.js 12.x
        uses: actions/setup-node@master
        with:
          node-version: 12.x

      - name: Install Dependencies
        run: yarn

      - name: Create Release Pull Request
        uses: changesets/action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Current behavior

<a href="https://github.com/semantic-release/semantic-release"><Highlight color="#203666">Semantic-release</Highlight></a> (a tool for automating the whole package release workflow) has a feature whereby once a commit which solves an issue is released, the action comments on the associated issue and PR thread to notify the user.   

This feature would be a "nice to have" feature for the changesets project.

:::note Issue link
https://github.com/atlassian/changesets/issues/511
:::

## Implement the solution

:::caution code blocks
The code blocks are intentionally incomplete for the sake of readability.  
If you want to read the full code you'll find it in the PR link at the top.
:::

:::warning changes
This PR being still Open, some parts are likely to change.  
 I will keep the article updated if any changes are made.
:::

Here is the main logic to comment on PRs and issues that have been released.   
The boolean variable `comment` lets the User activate or not the feature via an input property.

The comment logic is triggered once a whole repo release is published.

<div className="image-wrapper">
  <ImageWrapper src={useBaseUrl('img/changesets/workflow.png')} width="80%" alt="Workflow" />
</div>

### Workflow

Here is the different steps of the workflow with their associated code blocks.

**NOTE:** We are using the <a href="https://octokit.github.io/rest.js/v18"><Highlight color="#203666">octokit</Highlight></a> GitHub REST API client for JavaScript. This is an official client for interacting with the GitHub API.

1. Retrieve the tag associated with the release
2. Take the commit sha associated with the tag

```ts
const repo = github.context.repo;

let tagPage = 0;
let tagFound = false;
let tagCommitSha = "";

/* 1 */
while (!tagFound) {
  await octokit.repos
    .listTags({
      ...repo,
      per_page: 100,
      page: tagPage,
    })
    .then(({ data }) => {
      const tag = data.find((el) => el.name === tagName);
      if (tag) {
        tagFound = true;
        /* 2 */
        tagCommitSha = tag.commit.sha;
      }
      tagPage += 1;
    })
    .catch((err) => console.warn(err));
}
```

3. Retrieve all the commits starting from the tag commit sha

```ts
/* 3 */
const commits = await octokit.repos
  .listCommits({
    ...repo,
    sha: tagCommitSha,
  })
  .then(({ data }) => data);

const shas = commits.map(({ sha }) => sha);

const searchQueries = getSearchQueries(
  `repo:${repo.owner}/${repo.repo}+type:pr+is:merged`,
  shas
).map(
  async (q) =>
    (await octokit.search.issuesAndPullRequests({ q })).data.items
);

const queries = await (await Promise.all(searchQueries)).flat();

const queriesSet = queries.map((el) => el.number);

const filteredQueries = queries.filter(
  (el, i) => queriesSet.indexOf(el.number) === i
  );
```

Here is the `getSearchQueries` helper:

- **Definition:** Build a search query to retrieve pulls with commit hashes.   
- **Example:** `repo:<OWNER>/<REPO>+type:pr+is:merged+hash:<FIRST_COMMIT_HASH>+hash:<SECOND_COMMIT_HASH>...`

```ts
const getSearchQueries = (base: string, commits: string[]) => {
  return commits.reduce((searches, commit) => {
    const lastSearch = searches[searches.length - 1];

    if (lastSearch && lastSearch.length + commit.length <= 256 - 6) {
      searches[searches.length - 1] = `${lastSearch}+hash:${commit}`;
    } else {
      searches.push(`${base}+hash:${commit}`);
    }

    return searches;
  }, [] as string[]);
};
```

4. Retrieve the PRs with commits sha matching the release commits

```ts
/* 4 */
const pulls = await filteredQueries.filter(
  async ({ number }) =>
    (
      await octokit.pulls.listCommits({
        owner: repo.owner,
        repo: repo.repo,
        pull_number: number,
      })
    ).data.find(({ sha }) => shas.includes(sha)) ||
    shas.includes(
      (
        await octokit.pulls.get({
          owner: repo.owner,
          repo: repo.repo,
          pull_number: number,
        })
      ).data.merge_commit_sha
    )
);
```

5. Map through the list of commits and the list of PRs to find commit message or PRs body that closes an issue and get the issue number.

```ts
/* 5 */
const issues = [
  ...pulls.map((pr) => pr.body),
  ...commits.map(({ commit }) => commit.message),
].reduce((issues, message) => {
  return message
    ? issues.concat(
        parser(message)
          .actions.close.filter(
            (action) =>
              action.slug === null ||
              action.slug === undefined ||
              action.slug === `${repo.owner}/${repo.repo}`
          )
          .map((action) => ({ number: Number.parseInt(action.issue, 10) }))
      )
    : issues;
}, [] as { number: number }[]);
```

6. Create a comment for each issue and PR

```ts
/* 6 */
await Promise.all(
  [...new Set([...pulls, ...issues].map(({ number }) => number))].map(
    async (number) => {
      const issueComment = {
        ...repo,
        issue_number: number,
        body: getReleaseMessage(htmlUrl, tagName),
      };
      octokit.issues.createComment(issueComment);
    }
  )
);
```

## Final result

Every time a release is made, a comment will be made to PRs and issues that have been released.   

I also created a <a href="https://codesandbox.io/s/winter-bird-pwn6v?file=/src/index.js"><Highlight color="#203666">codesandbox project</Highlight></a> where you can see the logic to get the issues and pull-requests associated to a release more easily. You can use your own GitHub token to increase the API rate limit.

**NOTE:** In codesandbox, considering that the code does not run at the time the release is created, we will get more recent commits. This will not happen in the real world.

## Takeaway

### Problems encountered

Setting up the environment locally as well as testing the behavior of the developed functionality was a bit complicated because there was a strong dependency with GitHub.   
(e.g. Some scenarios to reproduce as creating a release...)

### What did I learn ?

This contribution allowed me to learn more about **package release workflow** and **GitHub Actions**.  
