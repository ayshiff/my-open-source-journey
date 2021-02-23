---
id: octobox2597
title: Octobox - Notifications filter
sidebar_label: 6. Octobox - Notifications filter
---

<p className="post_date">19 Feb 2021</p>

export const Highlight = ({children, color}) => ( <span style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#fff',
      padding: '0.2rem',
      fontWeight: 600,
    }}>{children}</span> );

import useBaseUrl from '@docusaurus/useBaseUrl';
import { Merged } from '../utils.md';

<div className="pr_infos">
<div className="marginBottom">
    <div>
        <Merged />
    </div>
  <span className="badge badge--secondary marginRight">Ruby</span>
  <span className="badge badge--secondary marginRight">github-notifications</span>
  <span className="badge badge--secondary marginRight">triage</span>
  <span className="badge badge--secondary marginRight">inbox</span>
</div>
</div>

:::info Contribution link
https://github.com/octobox/octobox/pull/2597
:::

:::tip Contribution Type
This contribution is a new **feature**.
:::

## Introduction

<div className="image-wrapper">
<img
  alt="Contribution presentation"
  src={useBaseUrl('img/octobox/cover.jpg')}
/>
<br/>
<em>Octobox + Notifications filter</em>
</div>

### Project

You can find the <a href="/docs/projects/octobox"><Highlight color="#25c2a0">octobox project presentation here</Highlight></a>.

To access Octobox.io you just need to sign in with your GitHub profile or install the GitHub app on the <a href="https://octobox.io/"><Highlight color="#25c2a0">homepage</Highlight></a>.

### Context

### Current behavior

Users can currently refine their GitHub notifications with specific filters.   
Notifications can be of different types: `Issue`, `Pull request` or `Vulnerability alert`.

Here is a list of some filters that can be used:

- **repo:`octobox/octobox`**	Only search notifications from the **octobox/octobox repository**.
- **owner:`microsoft`**	Only search notifications from repos in the **microsoft organisation**.
- **type:`pull_request`**	Only search **pull requests**. Also accepts: issue, release, commit, repository_invitation and repository_vulnerability_alert.

The goal of this contribution is to be able to add filtering according to the number of the issue and/or the pull-request, like Github does:

<div className="image-wrapper">
<img
  alt="IP address logic"
  width="100%"
  src={useBaseUrl('img/octobox/issue_number.png')}
/>
</div>
<br />

:::note Issue link
https://github.com/octobox/octobox/issues/2144
:::

## Implement the solution

We will follow the TDD (**T**est **D**riven **D**evelopment) approach by developing test cases to specify and validate what the code will do.

<div className="image-wrapper">
<img
  alt="TDD presentation"
  width="600"
  src={useBaseUrl('img/octobox/TDD.png')}
/>
</div>

### Add the failing tests

To filter the notifications according to their reference numbers, we need to validate that our Search engine will correctly converts our params to the right query prefix.   

Moreover, it will allow us to do refactoring afterwards by making sure that the functional part is good.

```ruby title="test/models/search_test.rb"
class SearchTest < ActiveSupport::TestCase
  # ...other tests
  test 'converts number params to number prefix without changing it' do
    search = Search.new(query: 'inbox:true', scope: Notification.all, params: {number: '123'})
    assert_equal search.to_query, 'inbox:true number:123'
  end
end
```

The following tests will allow us to test that the notifications are properly filtered according to the number(s) we specified in the search input.   

For example, given the following search input, the route:   
`/?q=inbox%3Atrue+type%3Aissue+number%3A4555` will be used.   
(**NOTE**: `3A` corresponds to the character `:`)

<div className="image-wrapper">
<img
  alt="Search bar"
  width="600"
  src={useBaseUrl('img/octobox/search-bar.png')}
/>
<br />
<em>Search bar component</em>
</div>
<br />


```ruby title="test/controllers/notifications_controller_test.rb"
require 'test_helper'

class NotificationsControllerTest < ActionDispatch::IntegrationTest
  # ...other tests 
  test 'search results can filter by number' do
    sign_in_as(@user)
    notification1 = create(:notification, user: @user, subject_type: 'Issue')
    notification2 = create(:notification, user: @user, subject_type: 'PullRequest')
    subject1 = create(:subject, notifications: [notification1])
    subject2 = create(:subject, notifications: [notification2])
    get '/?q=number%3A' + subject1.url.scan(/\d+$/).first
    assert_equal assigns(:notifications).length, 1
    assert_equal assigns(:notifications).first.subject_url, subject1.url
  end

  test 'search results can filter by multiple numbers' do
    sign_in_as(@user)
    notification1 = create(:notification, user: @user, subject_type: 'Issue')
    notification2 = create(:notification, user: @user, subject_type: 'PullRequest')
    subject1 = create(:subject, notifications: [notification1])
    subject2 = create(:subject, notifications: [notification2])
    get '/?q=number%3A' + subject1.url.scan(/\d+$/).first + '%2C' + subject2.url.scan(/\d+$/).first
    assert_equal assigns(:notifications).length, 2
  end
end
```

### Make our tests pass

In order to make our tests pass, we will need to implement different things:

- Add a new param `number` for the search which will be used to query the right filters.
- Add a new `number` scope which will be used to select the notifications from our table with a number which matches to our.
- Add a new `-number` scope which will be used to select the notifications from our table with a number which is different to our.

### Add the new search params

This step involves adding our two new params `number` and `-number` (`exclude_number`).   
They will allow to pass the right information to the scopes who will take care of the logic to retrieve the corresponding notifications in our database.   

`exclude_number` works as a negative filter and will therefore filter in the opposite way to `number`: `-number'.

```ruby title="app/models/search.rb"
class Search
  attr_accessor :parsed_query
  attr_accessor :scope

  def self.initialize_for_saved_search(query:, user:, params: {})
    eager_load_relation = [
      {
        subject: :labels
      }, 
      {
        repository: 
        {
          app_installation: 
            {
              subscription_purchase: :subscription_plan
            }
        }
      }
    ]
    scope = user.notifications.includes(eager_load_relation)
    Search.new(query: query, scope: scope, params: params)
  end

  def initialize(query: '', scope:, params: {})
    @parsed_query = SearchParser.new(query)
    @scope = scope
    convert(params)
  end

  def results
    res = scope
    res = res.number(number) if number.present?
    res = res.exclude_number(exclude_number) if exclude_number.present?
    # ... other params
  end

  def number
    parsed_query[:number]
  end

  def exclude_number
    parsed_query[:'-number']
  end
end
```

### Add the scopes

Now that we have the filters requested by the user, all we have to do is retrieve the corresponding elements.

The `subject_url` is in the following format:

`https://github.com/octobox/octobox/issues` **`/2520`**

With the reference number at the end of the url.

In the inclusive case we need to retrieve the notifications that **have** a reference number that corresponds to the one we provide.

```ruby title="lib/octobox/notifications/inclusive_scope.rb"
scope :number, ->(subject_numbers)  {
  joins(:subject).where(
    subject_numbers.map { |subject_number| 
      arel_table[:subject_url].matches("%/#{subject_number}") 
    }.reduce(:or)
  )
}
```

In the exclusive case we need to retrieve the notifications that **have not** a reference number that corresponds to the one we provide.

```ruby title="lib/octobox/notifications/exclusive_scope.rb"
scope :exclude_number, ->(subject_numbers)  {
  joins(:subject).where.not(
    subject_numbers.map { |subject_number| 
      arel_table[:subject_url].matches("%/#{subject_number}") 
    }.reduce(:or)
  )
}
```

### Add the helpers

Now that we have developed our new filtering system, all we have to do is add various helpers that will allow the user to use our filters correctly.

#### Add the search filter element

In order to help the user visualize the filters that are currently selected, we will add a new element to the `_filter-list` view.

<div className="image-wrapper">
<img
  alt="Search filter element"
  width="600"
  src={useBaseUrl('img/octobox/search-filter-list.png')}
/>
<br />
<em>Search filter component</em>
</div>
<br />

```auto title="app/views/notifications/_filter-list.html.erb"
<%= filter_option :number do %>
  Number: <%= params[:number] %>
<% end %>
```

#### Add the filters list helper

To help the user use the correct filters, there is a modal-component that is used.   
It display some information to the user about the different filters he can use.

<div className="image-wrapper">
<img
  alt="Filter list helper"
  width="600"
  src={useBaseUrl('img/octobox/filter-list-doc.png')}
/>
<br />
<em>Filter list helper</em>
</div>
<br />

```html title="app/views/shared/_search_prefixes.html.erb"
<tr>
  <td>
    <code>number:123</code>
  </td>
  <td>Filter by notifications from issues and/or pull requests with the number '123'.</td>
</tr>
```

## Final result

Here is the final result with a sample workflow:

- Filtering by **only one** reference number
- Filtering by **multiple** reference numbers
- Filtering with a **negated** reference number

<div className="image-wrapper">
<img
  alt="Final result"
  src={useBaseUrl('img/octobox/final_result.gif')}
/>
</div>
<br />

## Takeaway

### Problems encountered

The local setup of the project was a bit long (configuration of the ruby version, setting up postgres/redis...).   
But it allowed me to understand how the project works.

### What did I learn ?

This contribution allowed me to learn more about **Ruby On-Rails** and its usage in a concrete project.    
Ruby is not a language I usually use, it allowed me to use a different language from the ones I usually use.