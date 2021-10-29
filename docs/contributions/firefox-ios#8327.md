---
id: firefox-ios8327
title: Firefox for iOS - Bug fixing
sidebar_label: 10. Firefox for iOS - Bug fixing
---

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
        <Open date="13 Apr 2021"/>
    </div>
  <span className="badge badge--secondary marginRight">Swift</span>
  <span className="badge badge--secondary marginRight">Firefox</span>
  <span className="badge badge--secondary marginRight">iOS-app</span>
</div>
</div>

:::info Contribution links
https://github.com/mozilla-mobile/firefox-ios/pull/8314   
https://github.com/mozilla-mobile/firefox-ios/pull/8327
:::

:::warning Contribution Types
These contributions are **bug-fixes**.
:::

## Introduction

<div className="image-wrapper">
  <ImageWrapper src={useBaseUrl('img/firefox-ios/cover.jpg')} width="100%" alt="Firefox iOS presentation" />
<em>Firefox iOS presentation</em>
</div>

This contribution is composed of two PRs: ***Open Last Bookmark in 3D-touch*** and ***Misaligned texts in History Panel View***.

### Project

You can find the **Firefox for iOS project presentation** <a href="/docs/projects/firefox-ios"><Highlight color="#203666">here</Highlight></a>.

## Open Last Bookmark in 3D-touch

### Context

Firefox for iOS offers **3D Touch** to help the user access commonly used features. By pressing the app icon on the Home Screen, the user can open the Quick Access menu which lets him quickly perform common app-specific tasks and see interesting information. In our case it has shortcuts to open a New Private Tab, scan QR Code... and **open the last bookmark**.

This shortcut displays the title and url of the last bookmarked website and open it on user tap.

### Current behavior

Currently when a bookmarked site is removed from the bookmark list, the "Open Last Bookmark" value from the Quick Access menu is not updated.   

For example, when the user remove the last bookmark, the Quick Access menu keeps displaying it.

:::note Issue links 
https://github.com/mozilla-mobile/firefox-ios/issues/8234
:::

### Implement the solution

When we delete a bookmark, if it was the last one, we **remove the shortcut** otherwise we **update the value** of the last bookmark shortcut with the value of the most N - 1 recent one.

<div className="image-wrapper">
  <ImageWrapper src={useBaseUrl('img/firefox-ios/shortcut.jpg')} width="250px" alt="Bookmarks shortcut" />
<em>3D-touch Last bookmark</em>
</div>

<br />

In our case a user can directly access the last bookmarked site with `profile.places.getRecentBookmarks(limit: 1)`.   
If the bookmark items list response has a length of 0 (we have removed the last bookmarked website) then we remove the openLastBookmark shortcut with `removeDynamicApplicationShortcutItemOfType` otherwise we update the last bookmark site with the most recent one (`addDynamicApplicationShortcutItemOfType`).

Here is the code which implement the logic defined above.

```ts title="Client/Frontend/Library/HistoryPanel.swift"
// Get most recent bookmark
profile.places.getRecentBookmarks(limit: 1).uponQueue(.main) { result in
  guard let bookmarkItems = result.successValue else { return }
  if bookmarkItems.count == 0 {
    // Remove the openLastBookmark shortcut
    QuickActions.sharedInstance.removeDynamicApplicationShortcutItemOfType(
      .openLastBookmark,
      fromApplication: .shared)
  } else {
    // Update the last bookmark shortcut
    let userData = [
      QuickActions.TabURLKey: bookmarkItems[0].url,
      QuickActions.TabTitleKey: bookm[0].title
    ]
    QuickActions.sharedInstance.addDynamicApplicationShortcutItemOfType(
      .openLastBookmark,
      withUsuserData,
      toApplication: .shared)
  }
}
```

## Final result

Here is an example workflow demonstrating correct working of our logic.

1. Add *twitter.com* to bookmark
2. Add *facebook.com* to bookmark
3. Go to bookmark shortcut (showing the *facebook.com* bookmark)
4. Remove the *facebook.com* bookmark
5. Go to bookmark shortcut (showing the *twitter.com* bookmark)
6. Remove the *twitter.com* bookmark 
7. Go to bookmark shortcut 
8. Notice that the bookmark shortcut has disappeared

<div align="center">
  <video width="180px" muted controls>
    <source src={useBaseUrl('img/firefox-ios/shortcut.mp4')} type="video/mp4" />
  </video>
</div>

## Misaligned texts in History Panel View

### Context

Firefox for iOS has an **History** tab where you can find easily access to content you've already viewed.

### Current behavior

Currently the *Clear Recent History* and *Recently closed* cells have misaligned texts.   
The goal of the contribution is to make the UI more consistent by aligning the labels in the cells.

:::note Issue links
https://github.com/mozilla-mobile/firefox-ios/issues/8305   
:::

### Implement the solution

The problem was that the components were using `TwoLineImageOverlayCell` (a cell with an image, a label and a description) instead of a `OneLineTableViewCell` (a cell which only use an image and a label) which is more appropriate to use in our case as it meets our need and the label is centered by default.

<div className="image-wrapper">
  <ImageWrapper src={useBaseUrl('img/firefox-ios/components.jpg')} width="100%" alt="TwoLineImageOverlayCell and OneLineTableViewCell" />
<em>TwoLineImageOverlayCell and OneLineTableViewCell</em>
</div>

<br />

Before implementing our logic, the `TwoLineImageOverlayCell` was used with `cell.descriptionLabel.isHidden = true` to hide the description as the cells don't have description.   

NOTE: `isHidden` is a Boolean value that determines whether the view is hidden or not.

The problem was that hidden views still participate in Auto Layout and retain their frames, leaving other related views in their places meaning that the description layout will still affect our cell UI.

As said above, the solution is to use `OneLineTableViewCell` when we configure the `tableView`.

```ts title="Client/Frontend/Library/HistoryPanel.swift"
let oneLineCell = tableView.dequeueReusableCell(
  withIdentifier: OneLineCellIdentifier,
  for: indexPath
) as! OneLineTableViewCell

switch row {
  case .clearRecent:
      return configureClearHistory(oneLineCell, for: indexPath)
  case .showRecentlyClosedTabs:
      return configureRecentlyClosed(oneLineCell, for: indexPath)
}
```

## Final result

Here is the final result showing the History tab with the texts correctly aligned.

<div className="image-wrapper">
  <ImageWrapper src={useBaseUrl('img/firefox-ios/misaligned.jpg')} width="500px" alt="Misaligned" />
<em>Misaligned texts in History Panel View</em>
</div>

## Takeaway

### Problems encountered

The code exploration was the part that took me the most time.   
In addition, I'm not accustomed to using XCode in my everyday developer life so I had to adapt to a different IDE than the one I usually use.

### What did I learn ?

This was my first contribution in Swift to an iOS app so it taught me a lot !   
Not being an iOS user, I also learned about 3D Touch in its use case in a real app.
