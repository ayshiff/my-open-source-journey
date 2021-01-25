---
id: lifetime28
title: LifeTime - Events list
sidebar_label: 4. LifeTime - Events list
image: https://myopensourcejourney.com/img/lifetime/cover.jpg
---

<p className="post_date">19 Jan 2021</p>

export const Highlight = ({children, color}) => ( <span style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#fff',
      padding: '0.2rem',
      fontWeight: 600,
    }}>{children}</span> );

import useBaseUrl from '@docusaurus/useBaseUrl';
import { Open } from '../utils.md';

<div className="pr_infos">
<div className="marginBottom">
  <div>
    <Open />
  </div>
  <span className="badge badge--secondary marginRight">coaching</span>
  <span className="badge badge--secondary marginRight">react-native</span>
  <span className="badge badge--secondary marginRight">ReasonML</span>
</div>
</div>

:::info Contribution link
https://github.com/MoOx/LifeTime/pull/28
:::

:::tip Contribution Type
This contribution is a new **feature**.
:::

## Introduction

This contribution combines two things that I love: **Meta Languages** and **time management**.   
It is for me the opportunity to present you to a language that I particularly like... <a href="https://reasonml.github.io/"><Highlight color="#DD4B39">ReasonML</Highlight></a>.  

<div className="image-wrapper">
<br/>
<img
  alt="LifeTime presentation"
  width="100%"
  src={useBaseUrl('img/lifetime/presentation2.jpg')}
/>
<br/>
<em>LifeTime = ReasonML + calendars</em>
</div>

### Project

You can find the <a href="/docs/projects/lifetime"><Highlight color="#25c2a0">LifeTime project presentation here</Highlight></a>.

### Context

To understand a little bit more about the solution you need to understand what **ReasonML** is.

ReasonML is a programming language created at Facebook and powered by **OCaml**.   
It is a **new syntax** for the programming language OCaml. Anything possible in OCaml is possible in Reason!

It means that we can benefit from the OCaml solid type-system.   
The idea behind Reason is pretty simple: if it compiles it will works! (99% of the time)

Here is a schema showing how ReasonML fits in the OCaml ecosystem.

<div className="image-wrapper">
<br/>
<img
  alt="ReasonML presentation"
  width="800px"
  src={useBaseUrl('img/lifetime/reasonml-presentation.png')}
/>
<br/>
<em>OCaml ecosystem with ReasonML</em>
</div>
<br/>

In this project we will use some Reason bindings `reason-react-native` to allow to use Reason with <a href="https://reasonml.github.io/"><Highlight color="#48A9DC">ReasonReact</Highlight></a> (which will be used to create our React components) to make our mobile app.

**The story of Messenger.com**

On September 8, 2017 the team at Facebook working on ReasonML published a post where they explain that 50% of Messenger.com (the web version of Facebook Messenger) codebase was converted to Reason code.   

Here are some benefits they noticed:
- Build of the entire Reason part of the codebase is ~2s
- Bug reports has decreased (from a few one per day to **10 bugs** a year)
- Refactors are faster and introduce fewer bugs

### Current behavior

Let's go back to our project.   

Currently when a User arrives on the app, he arrives on the **Home screen** with:
- the **weekly chart**: displaying the week activities average
- the **top activities list**: displaying in descending order he activities with the most time 

When the User tap on an activity, he goes to the associated **Activity detail** screen with:
- the activity **category** list where he can choose the type of the activity
- the possibility to **hide/show** the activity

<div className="image-wrapper">
<br/>
<img
  alt="LifeTime presentation"
  width="600px"
  src={useBaseUrl('img/lifetime/context.png')}
/>
<br/>
<em>Home + Activity detail screens</em>
</div>
<br/>

The goal of the contribution is to add to this screen:
- an **event list** containing all the events of the activity
- a **graph** showing the different events

:::note Issue link
https://github.com/MoOx/LifeTime/issues/23
:::

## Implement the solution

:::caution code blocks
The code blocks are intentionally incomplete for the sake of readability.  
If you want to read the full code you'll find it in the PR link at the top.
:::

The idea is pretty straightforward.   
Here are the **user stories**:

1. **As a** User **I want** to see the events of the week I was on the home page **so that** I can directly see more details about the current week.
    - Find a way to keep the week currently viewed on the home screen 
    - Fetch the events related to this week

2. **As a** User **I want** to be able to switch between the 5 last weeks **so that** I can see the events related to the week that I want.
    - Implement the graph: the events fetch will be triggered when the user will swipe between the weeks

3. **As a** User **I want** to see the events list of the current week **so that** I can see more details about the events.
    - Implement the events list

### 1. Fetch the events

Before fetching the events, we need to know from which week we'll fetch them.

To do so, the `TopActivites` component (which is responsible for showing the activities) will need to know the current week the user is on.

When the user will tap an activity from the Home screen, we will pass to the Activity Detail Screen the current week information: the week start date and the week end date.

```jsx {5,6} title="src/components/Home.res"
<TopActivities 
  mapTitleDuration
  onFiltersPress
  onActivityPress
  startDate
  endDate
/>
```

```jsx {7} title="src/components/TopActivities.res"
<TouchableOpacity
  key=title
  onPress={_ =>
    onActivityPress(
      title,
      (startDate, endDate),
    )}>
// ...
```

```jsx {6,9-12} title="src/components/ActivityOptions.res"
let make = (
  ~activityTitle,
  ~refreshing,
  ~onRefreshDone,
  ~onSkipActivity,
  ~currentWeek: (string, string),
) => {
// ...
  let ((startDate, supposedEndDate), currentDates_set) = React.useState(() => {
    let (start, end) = currentWeek
    (start->Js.Date.fromString, end->Js.Date.fromString)
  })
// ...
}
```

Now that we have our initial week we can fetch our events.

```js title="src/components/ActivityOptions.res"
let events =
  getEvents(startDate, endDate, true)
  ->Option.map(event =>
    event->Calendars.filterEventsByTitle(activityTitle)->Calendars.sortEventsByDecreasingStartDate
  )
  ->Option.getWithDefault([])
```

Here are the helpers:

```js title="src/Calendars.res"
// Used to filter the events according to their title
let filterEventsByTitle = (
  events: array<ReactNativeCalendarEvents.calendarEventReadable>,
  title: string,
) => events->Array.keep(evt => !(!(evt.title == title)))

// Used to sort the events from the most recent to the oldest
let sortEventsByDecreasingStartDate = (
  events: array<ReactNativeCalendarEvents.calendarEventReadable>,
) => events->SortArray.stableSortBy((a, b) =>
    a.startDate->Js.Date.fromString->Js.Date.getTime <
      b.startDate->Js.Date.fromString->Js.Date.getTime
      ? 1
      : switch a.startDate->Js.Date.fromString->Js.Date.getTime >
          b.startDate->Js.Date.fromString->Js.Date.getTime {
        | true => -1
        | false => 0
        }
  )
```

This is for the initial events fetch when the user arrives on the activity detail screen.   
We will see below how to fetch the events when the user changes week.

### 2. Add the events graph

```js title="src/components/ActivityOptions.res"
// When the user changes the current week, we will update `startDate` and `supposedEndDate` seen above
// This will trigger the events fetch with the new week range
let onViewableItemsChanged = React.useRef(itemsChanged =>
  if itemsChanged.viewableItems->Array.length == 1 {
    itemsChanged.viewableItems[0]
    ->Option.map(wrapper => currentDates_set(_ => wrapper.item))
    ->ignore
  }
).current
// ...
<FlatList
  // ...
  onViewableItemsChanged
/>
```

```reason title="src/components/WeeklyBarChartDetail.res"
@react.component
let make = (
  ~today: Js.Date.t,
  ~todayFirst,
  ~previousFirst,
  ~startDate,
  ~supposedEndDate,
  ~activityTitle,
  ~style,
) => {
  let (settings, _setSettings) = React.useContext(AppSettings.context)
  let (getEvents, _updatedAt, _requestUpdate) = React.useContext(Calendars.context)

  let endDate = supposedEndDate->Date.min(today)
  let events =
    getEvents(startDate, endDate, false)
    ->Option.map(event => event->filterEventsByTitle(activityTitle))
    ->Option.getWithDefault([])

  let categoryId = settings->Calendars.categoryIdFromActivityTitle(activityTitle)

  <WeeklyGraphDetail events startDate supposedEndDate categoryId />
}
```

Display the events in the graph

```reason title="src/components/WeeklyGraphDetail.res"
let slices = 6
let graphHeight = 160.
let graphLetterHeight = 16.

let (settings, _setSettings) = React.useContext(AppSettings.context)

let theme = Theme.useTheme(AppSettings.useTheme())

let (_, _, colorName, _) = ActivityCategories.getFromId(categoryId)
let backgroundColor = colorName->ActivityCategories.getColor(theme.mode)

let (width, setWidth) = React.useState(() => 0.)
let onLayout = React.useCallback1((layoutEvent: Event.layoutEvent) => {
  let width = layoutEvent.nativeEvent.layout.width
  setWidth(_ => width)
}, [setWidth])

let supposedNumberOfDays = Date.durationInMs(startDate, supposedEndDate)->Date.msToDays
let dates =
  Array.range(0, supposedNumberOfDays->int_of_float)->Array.map(n =>
    startDate->DateFns.addDays(n->Js.Int.toFloat)
  )

let eventsPerDate = React.useMemo4(() => {
  let events = events->Calendars.filterEvents(settings)
  let minutesInDay = 1440.
  let minUnit = width /. minutesInDay
  dates->Array.map(date => {
    let startOfDate = date->Date.startOfDay
    let startOfDateMin = date->Date.startOfDay->Js.Date.getTime->Date.msToMin
    let endOfDate = date->Date.endOfDay
    (date, events->Array.map(evt => {
        if (
          Date.hasOverlap(
            evt.startDate->Js.Date.fromString,
            evt.endDate->Js.Date.fromString,
            date,
          )
        ) {
          let start =
            (evt.startDate
            ->Js.Date.fromString
            ->Date.max(startOfDate)
            ->Js.Date.getTime
            ->Date.msToMin -. startOfDateMin) *. minUnit
          let end =
            (evt.endDate
            ->Js.Date.fromString
            ->Date.min(endOfDate)
            ->Js.Date.getTime
            ->Date.msToMin -. startOfDateMin) *. minUnit
          (evt.id, start, end)
        } else {
          ("", 0., 0.)
        }
      })->Array.keep(((id, _, _)) => id != ""))
  })
}, (events, settings, dates, width))
```

#### Final result

Here is the activity chart

<div className="image-wrapper">
<br/>
<img
  alt="Activity chart"
  width="300px"
  src={useBaseUrl('img/lifetime/activity-chart.png')}
/>
<br/>
<em>Activity chart</em>
</div>

### 3. Add the events list

We will display the following information about the event:
- event **date** in the format: DD-MM
- event **start date** in the format: HH:SS
- event **end date** in the format: HH:SS
- event **duration** in the form of a duration bar

<div className="image-wrapper">
<br/>
<img
  alt="Events list details"
  width="600px"
  src={useBaseUrl('img/lifetime/events-list-detail.png')}
/>
<br/>
<em>Events list</em>
</div>
<br/>

#### Compute the events duration

```js title="src/components/Events.res"
// Set the layout width
let (width, setWidth) = React.useState(() => 0.)
let onLayout = React.useCallback1((layoutEvent: Event.layoutEvent) => {
  let width = layoutEvent.nativeEvent.layout.width
  setWidth(_ => width)
}, [setWidth])

// This is the total width we can use to display the duration bar
let availableWidthForBar = width -. 85. -. SpacedView.space *. 4.

// We calculate the duration for all the events
// It will be used to display the duration bar
let eventsWithDuration = events->Array.map(event => {
  let durationInMin =
    Date.durationInMs(
      event.startDate->Js.Date.fromString,
      event.endDate->Js.Date.fromString,
    )->Date.msToMin
  (event, durationInMin)
})

// We calculate the max duration through all the events
// It will be used to calculate the correct duration bar width
// in accordance with the event which has the longest duration
let maxDuration =
  eventsWithDuration->Array.reduce(0., (max, (_, duration)) => duration > max ? duration : max)
```

If we have no events for the selected week, we will show a message to the user otherwise we will display the events list.

```jsx title="src/components/Events.res"
switch eventsWithDuration->Array.length {
| 0 =>
  <SpacedView horizontal=L>
    <Center>
      <Spacer />
      <Text
        style={Style.array([
          Theme.text["title3"],
          Theme.text["medium"],
          theme.styles["textLight2"],
        ])}>
        {"No events"->React.string}
      </Text>
      <Spacer size=XXS />
      <Text style={Style.array([Theme.text["footnote"], theme.styles["textLight2"]])}>
        {"You should add some events to your calendar or activate more calendars."->React.string}
      </Text>
      <Spacer />
    </Center>
  </SpacedView>
| _x =>
  <View onLayout>
    <Row>
      <Spacer size=S />
      <BlockHeading
        style={Style.array([theme.styles["background"], theme.styles["text"]])}
        text={startDate->Js.Date.getDate->Belt.Float.toString ++
        " - " ++
        endDate->Js.Date.getDate->Belt.Float.toString ++
        " " ++
        endDate->Date.monthShortString}
      />
    </Row>
    <Separator style={theme.styles["separatorOnBackground"]} />
    {eventsWithDuration->Array.mapWithIndex((index, eventWithDuration) => {
      let (event, duration) = eventWithDuration
      let durationString = duration->Date.minToString
      // Display the current event
    })->React.array}
  </View>
}
```

#### Display the duration bar

This component will be used to display the duration bar.   
Here is the formula to compute the width of the bar, in `dp`:

$duration = \frac{eventDuration}{maxDuration} * availableWidthForBar$

For example, given:
- max duration through all the events: **90min**
- current event duration: **50min**
- available width: **200dp**

The result will be equal to (50 / 90) * 200 = **111dp**

```jsx title="src/components/Events.res"
<Row style={Predefined.styles["alignCenter"]}>
  <View
    style={
      open Style
      array([
        theme.styles["backgroundGray3"],
        viewStyle(
          ~width=(duration /. maxDuration *. availableWidthForBar)->dp,
          ~height=6.->dp,
          ~borderRadius=6.,
          ~overflow=#hidden,
          (),
        ),
      ])
    }
  />
  <Spacer size=XXS />
  <Text
    style={
      open Style
      array([Theme.text["footnote"], theme.styles["textLight1"]])
    }
    numberOfLines=1
    adjustsFontSizeToFit=true>
    // Display the duration
    // ex: 15h12m
    {durationString->React.string}
  </Text>
</Row>
```

#### Display the rest of the event information

We can know display the rest of the event information to the User.   

```jsx title="src/components/Events.res"
<View key=event.id>
  <View style={Predefined.styles["rowSpaceBetween"]}>
    <Row>
      <Spacer size=S />
      <View>
        <Text
          style={Style.array([styles["text"], theme.styles["textLight1"]])}
          numberOfLines=1
          adjustsFontSizeToFit=true>
          {(event.endDate->Js.Date.fromString->Js.Date.getDate->Belt.Float.toString ++
          " " ++
          event.endDate->Js.Date.fromString->Date.monthShortString)->React.string}
        </Text>
        // The duration bar goes here
      </View>
    </Row>
    <View>
      <SpacedView vertical=XS horizontal=None>
        // Display the start and end date of the event 
        <View style={Predefined.styles["row"]}>
          <View style={Predefined.styles["flexGrow"]}>
            <Text style={Style.array([styles["text"], theme.styles["textLight1"]])}>
              {(Js.Date.fromString(event.startDate)
              ->Js.Date.getHours
              ->Belt.Float.toString
              ->padTime ++
              ":" ++
              Js.Date.fromString(event.startDate)
              ->Js.Date.getMinutes
              ->Belt.Float.toString
              ->padTime)->React.string}
            </Text>
            <Text style={Style.array([styles["text"], theme.styles["text"]])}>
              {(Js.Date.fromString(event.endDate)
              ->Js.Date.getHours
              ->Belt.Float.toString
              ->padTime ++
              ":" ++
              Js.Date.fromString(event.endDate)
              ->Js.Date.getMinutes
              ->Belt.Float.toString
              ->padTime)->React.string}
            </Text>
          </View>
          <Spacer size=S />
        </View>
      </SpacedView>
    </View>
  </View>
  {index !== eventsWithDuration->Array.length - 1
    ? <Separator style={theme.styles["separatorOnBackground"]} />
    : React.null}
</View>
```

#### A little extra note

If you take a closer look you may notice the use of a component `Spacer`.   
It is used to replace margins. You can learn more about Spacer <a href="https://www.joshwcomeau.com/react/modern-spacer-gif/"><Highlight color="#25c2a0">here</Highlight></a>.

This is how it is implemented in `react-multiversal`:

```reason title="react-multiversal - src/Spacer.re"
let size =
  fun
  | XXL => space *. 4.
  | XL => space *. 3.
  | L => space *. 2.
  | M => space *. 1.
  | S => space *. 3. /. 4.
  | XS => space *. 2. /. 4.
  | XXS => space *. 1. /. 4.
  | Custom(value) => value;
```

We can use several sizes that are the result of a ratio with a constant `space`.   
This allows us to have more consistent margins in our application.

#### Final result

<div className="image-wrapper">
<br/>
<img
  alt="Events list final result"
  width="300px"
  src={useBaseUrl('img/lifetime/events-list.png')}
/>
<br/>
<em>Events list</em>
</div>
<br/>

### Full result - Future ?

We will surely have to change some little things to make the user experience more enjoyable.

As mentioned in the comments:

- load the current week then **lazy load** the other weeks
- in the same week, if a user has a lot of events, add a **see more** button to fetch the rest of the events

All these improvements will improve the performance and fluidity of navigation in the application.

Here is the final version of the Activity detail screen:

<div className="image-wrapper">
<br/>
<img
  alt="Final result"
  width="180px"
  src={useBaseUrl('img/lifetime/final.png')}
/>
<br/>
<em>Events list + chart</em>
</div>

## Takeaway

### Problems encountered

The first problem that I've encountered was about the way I built the Activity detail events list.    
I started by building it by fetching events from **all the weeks at once**.   
The events were grouped according to their week in the list.

As you can imagine, this could be problematic if the user has a lot of events and it could lead to **performance issues**.
I then thought about fetching the events **by week** as on the Home screen (triggered when the user switch week).

### What did I learn ?

As I said before, ReasonML is a language that I particularly love.   
This contribution was the opportunity to me to **put into practice** some concepts that I've learned in the past.
More specifically about building a **mobile app** in ReasonML.