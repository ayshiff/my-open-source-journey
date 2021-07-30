---
id: flutter
title: Google - Flutter contributions
sidebar_label: 13. Google - Flutter contributions
---

<p className="post_date">29 July 2021</p>

export const Highlight = ({children, color}) => ( <span style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#fff',
      padding: '0.2rem',
      fontWeight: 600,
    }}>{children}</span> );

import useBaseUrl from '@docusaurus/useBaseUrl';
import { Merged, Open, ImageWrapper } from '../utils.md';

<div className="pr_infos">
<div className="marginBottom">
  <span className="badge badge--secondary marginRight">Mobile</span>
  <span className="badge badge--secondary marginRight">Dart</span>
  <span className="badge badge--secondary marginRight">Android-iOS</span>
  <span className="badge badge--secondary marginRight">macOS-Windows</span>
  <span className="badge badge--secondary marginRight">Web</span>
</div>
</div>

## Introduction

<div className="image-wrapper">
  <ImageWrapper src={useBaseUrl('img/flutter/cover.jpg')} width="100%" alt="Flutter presentation" />
<em>Flutter presentation</em>
</div>

<br />

_It’s been 5 months since I have launched this Open Source initiative and I learned a lot from it._

_Today it’s time for something new…_

_I found that the format of one contribution every two weeks allowed me to see a wide variety of different projects but does not allow me to fully dive into the project._

_I have decided to challenge myself and change the format for the next contributions to focus more in-depth for a few weeks on a specific project (a bit like what Google Summer of Code does) which will allow me to better understand how the project works and to be able to make more significant contributions._

This article is composed of eight contributions:

- <Merged /> Flutter/Cupertino - Date order parameter <a href="#flutter--cupertino---date-order-parameter"><Highlight color="#203666">link</Highlight></a>
- <Open /> Flutter - Check for Android device battery level <a href="#flutter--check-for-android-device-battery-level"><Highlight color="#203666">link</Highlight></a>
- <Merged /> Flutter/Cocoon - Config keyHelper reference <a href="#flutter--cocoon---config-keyhelper-reference"><Highlight color="#203666">link</Highlight></a>
- <Merged /> Dart-lang - `printOnFailure` check current invoker <a href="#dart-lang--printonfailure-check-current-invoker"><Highlight color="#203666">link</Highlight></a>
- <Merged /> Codemirror.dart - Add SearchCursor wrapper <a href="#codemirrordart--add-searchcursor-wrapper"><Highlight color="#203666">link</Highlight></a>
- <Merged /> Flutter/Gallery - Refactor [web benchmarks] Move to appropriate folder <a href="#flutter---gallery--refactor-web-benchmarks-move-to-appropriate-folder"><Highlight color="#203666">link</Highlight></a>
- <Merged /> Flutter/Gallery - Back button overlapping <a href="#flutter---gallery--back-button-overlapping"><Highlight color="#203666">link</Highlight></a>
- <Open /> Flutter - CPU/GPU/memory metrics for iOS gallery transition tests <a href="#flutter--cpugpumemory-metrics-for-ios-gallery-transition-tests"><Highlight color="#203666">link</Highlight></a>

### Project

You can find the **Flutter project presentation** <a href="/docs/projects/flutter"><Highlight color="#203666">here</Highlight></a>.

## Flutter/Cupertino - Date order parameter

:::info Contribution link
https://github.com/flutter/flutter/pull/84599  
:::

:::tip Contribution Types
This contribution is a new **feature**.
:::

### Context

_**Cupertino** (iOS-style) widgets are Beautiful and high-fidelity widgets for current iOS design language._

<div className="image-wrapper">
  <ImageWrapper src={useBaseUrl('img/flutter/cupertino.png')} width="100%" alt="Flutter Cupertino" />
<em>Flutter Cupertino</em>
<br/>
</div>

### Current behavior

This contribution adds a new `dateOrder` parameter to `CupertinoDatePicker` to define the order of the columns in date mode which overrides the default order value defined by `localizations.datePickerDateOrder`.

<div className="image-wrapper">
  <ImageWrapper src={useBaseUrl('img/flutter/cupertino-date-order-before.png')} width="300px" alt="CupertinoDatePicker date order (before)" />
<em>CupertinoDatePicker default date order</em>
</div>
<br/>

:::note Issue links
https://github.com/flutter/flutter/issues/84550
:::

### Implement the solution

Define a new `dateOrder` parameter which determines the order of the columns.   
This parameter can have multiple values defined in `DatePickerDateOrder enum` (<a href="https://api.flutter.dev/flutter/cupertino/DatePickerDateOrder-class.html"><Highlight color="#203666">link</Highlight></a>).

For example, `dmy` corresponds from left to right to day, month, year.

```dart
/// Determines the order of the columns inside [CupertinoDatePicker] in date mode.
/// Defaults to the locale's default date format/order.
final DatePickerDateOrder? dateOrder;
```

If the `dateOrder` property is not defined, the order is based on internationalization.

```dart
final DatePickerDateOrder datePickerDateOrder =
    dateOrder ?? localizations.datePickerDateOrder;

switch (datePickerDateOrder) {
  /// ...
}
```

Add some **tests** to be sure that everything is working as expected.   

We check that with the `DatePickerDateOrder.ydm` value (Year/Day/Month), the component render the elements in the right order from left to right.

```dart title="packages/flutter/test/cupertino/date_picker_test.dart"
    testWidgets('DatePicker displays the date in correct order', (WidgetTester tester) async {
      await tester.pumpWidget(
        CupertinoApp(
          home: Center(
            child: SizedBox(
              height: 400.0,
              width: 400.0,
              child: CupertinoDatePicker(
                dateOrder: DatePickerDateOrder.ydm,
                mode: CupertinoDatePickerMode.date,
                onDateTimeChanged: (DateTime newDate) {},
                initialDateTime: DateTime(2018, 1, 14, 10, 30),
              ),
            ),
          ),
        ),
      );

      expect(
        tester.getTopLeft(find.text('2018')).dx,
        lessThan(tester.getTopLeft(find.text('14')).dx),
      );

      expect(
        tester.getTopLeft(find.text('14')).dx,
        lessThan(tester.getTopLeft(find.text('January')).dx),
      );
    });
```

## Final result

Users can now override the default CupertinoDatePicker date order.

<div className="image-wrapper">
  <ImageWrapper src={useBaseUrl('img/flutter/cupertino-date-order-final.png')} width="300px" alt="CupertinoDatePicker date order" />
<em>CupertinoDatePicker date order</em>
</div>

---

## Flutter - Check for Android device battery level

:::info Contribution link
https://github.com/flutter/flutter/pull/84534
:::

:::tip Contribution Types
This contribution is a new **feature**.
:::

### Context

_**DeviceLab** is a physical lab that tests Flutter on real devices._

### Current behavior

This contribution will filter out and warn about Android devices with **low battery level** (smaller than or equal to 15%).

### Implement the solution

**Get the battery level** of an Android device with `adb shell dumpsys battery`.

It should output something like this:

```
Current Battery Service state:
  AC powered: false
  USB powered: true
  Wireless powered: false
  Max charging current: 0
  Max charging voltage: 0
  Charge counter: 0
  status: 2
  health: 2
  present: true
  level: 93
  scale: 100
  voltage: 4245
  temperature: 237
  technology: Li-ion
```

We can **grab the level property** as this is what we are interested in.

```dart
Future<int> _getBatteryLevel() async {
  final String batteryInfo = await shellEval('dumpsys', <String>['battery']);
  final String batteryLevel = grep('level:', from: batteryInfo).single.split(':')[1].trim();
  return int.parse(batteryLevel);
}
```

Define a function to check if the battery level is **less than 15%**.

```dart
/// Whether the device has a battery level smaller than or equal to 15 percent.
@override
Future<bool> hasLowBatteryLevel() async {
  return await _getBatteryLevel() <= 15;
}
```

**Check** all Android devices battery level and **warn** about those with low battery level.

```dart
final AndroidDevice device = allDevices[math.Random().nextInt(allDevices.length)];
final bool hasLowBatteryLevel = await device.hasLowBatteryLevel();
if (!hasLowBatteryLevel) {
  _workingDevice = device;
}

for (final AndroidDevice device in allDevices) {
  final String deviceId = device.deviceId;
  if (await device.hasLowBatteryLevel()) {
    print('Device with ID $deviceId has low battery level');
  }
}
```

Add tests to check that our new functions `hasLowBatteryLevel` and `_getBatteryLevel` are working as expected.

```dart
group('batteryLevel', () {
  test('has enough battery', () async {
    FakeDevice.pretendHasEnoughBattery();
    expect(await device.hasLowBatteryLevel(), isFalse);
  });

  test('has not enough battery', () async {
    FakeDevice.pretendHasNotEnoughBattery();
    expect(await device.hasLowBatteryLevel(), isTrue);
  });
});

static void pretendHasNotEnoughBattery() {
  output = '''
    level: 15
  ''';
}

static void pretendHasEnoughBattery() {
  output = '''
    level: 20
  ''';
}
```

## Final result

This contribution added a way to warn about Android devices with **low battery level** in DeviceLab.

---

## Flutter/Cocoon - Config keyHelper reference

:::info Contribution link
https://github.com/flutter/cocoon/pull/1233
:::

:::tip Contribution Types
This contribution is about **refactoring**.
:::

### Context

_**Cocoon** is a Dart App Engine custom runtime (backend) with a frontend of Flutter apps (build and repository dashboard). Cocoon coordinates and aggregates the results of flutter/flutter builds._

### Current behavior

A keyHelper reference has been added in cocoon config.

```dart
KeyHelper get keyHelper =>
    KeyHelper(applicationContext: context.applicationContext);
```

Existing APIs have separate keyHelper definitions in their own scope.
To make it consistent, we should update all APIs to use the keyHelper defined in the cocoon config.

:::note Issue links
https://github.com/flutter/flutter/issues/48987
:::

### Implement the solution

***Before***

```dart title="app_dart/lib/src/request_handlers/reset_prod_task.dart"
final ClientContext clientContext = authContext.clientContext;
final KeyHelper keyHelper = KeyHelper(applicationContext: clientContext.applicationContext);
```

***After***

```dart title="app_dart/lib/src/request_handlers/reset_prod_task.dart"
final KeyHelper keyHelper = config.keyHelper;
```

Add some tests and mock the key helper.

```dart
setUp(() {
  /// Other
  keyHelper = FakeKeyHelper(applicationContext: clientContext.applicationContext);
  config = FakeConfig(dbValue: datastoreDB, keyHelperValue: keyHelper);
});
```

## Final result

Made the codebase more sustainable and maintainable by refactoring a part of the codebase that was not relevant anymore.

---

## Dart-lang - printOnFailure check current invoker

:::info Contribution link
https://github.com/dart-lang/test/pull/1533
:::

:::warning Contribution Types
This contribution is a **bug-fix**.
:::

### Context

_**Dart-lang tests** provides a standard way of writing and running tests in Dart._

### Current behavior

The `printOnFailure` function is used to print errors in the console when an error occurs.   
If you call it outside the test zone, the error is pretty confusing.

```
The method 'printOnFailure' was called on null.
 Receiver: null
 Tried calling: printOnFailure(<your-message>)
```

We should explicitly check and throw if there is no current invoker.

:::note Issue links
https://github.com/dart-lang/test/issues/1340
:::

### Implement the solution

This contribution adds a check within `printOnFailure` and throw an exception if there is no current invoker.

***Before***

```dart
void printOnFailure(String message) => Invoker.current!.printOnFailure(message);
```

***After***

```dart
void printOnFailure(String message) {
  var invoker = Invoker.current;
  if (invoker == null) {
    throw StateError(
        'There is no current invoker. Please make sure that you are making the '
        'call inside a test zone.');
  }
  return invoker.printOnFailure(message);
}
```

## Final result

Made the codebase more consistent by avoiding some issues and improving the developer experience.

---

## Codemirror.dart - Add SearchCursor wrapper

:::info Contribution link
https://github.com/google/codemirror.dart/pull/138
:::

:::tip Contribution Types
This contribution is a new **feature**.
:::

### Context

A Dart wrapper around the CodeMirror text editor. 

From codemirror.net:

_**CodeMirror** is a versatile text editor implemented in JavaScript for the browser. It is specialized for editing code, and comes with a number of language modes and add-ons that implement more advanced editing functionality._

### Current behavior

The wrapper didn't have a way to use the **search cursor add-on** which can be used to implement search/replace functionality.     
This wrapper will be used for <a href="https://github.com/dart-lang/dart-pad/issues/1866"><Highlight color="#203666">dart-lang/dart-pad#1866</Highlight></a>.
### Implement the solution

Add the add-on wrapper with all its methods.

The main method is **`getSearchCursor(query, start, options) → cursor`** which returns a search cursor with the following methods:

- **findNext() - findPrevious()** → boolean   
  *Search forward or backward from the current position.*
- **from() - to()** → {line, ch}   
  *Return {line, ch} objects pointing at the start and end of the match.*
- **replace(text: string, ?origin: string)**   
  *Replaces the currently found match with the given text and adjusts the cursor position to reflect the replacement.*

```dart
// Copyright (c) 2021, Google Inc. Please see the AUTHORS file for details.
// All rights reserved. Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

/// A wrapper around the `add-on/search/searchcursor.js` add-on.
library codemirror.searchcursor;

import 'dart:js';

import 'src/js_utils.dart';
import 'codemirror.dart';

class SearchCursor {
  /// Retrieve the search cursor from the editor instance.
  static SearchCursorContainer getSearchCursor(CodeMirror editor, String value,
      {Position? start, Map? options}) {
    if (options == null) {
      return SearchCursorContainer._(
          editor.callArgs('getSearchCursor', [value, start]));
    } else {
      return SearchCursorContainer._(
          editor.callArgs('getSearchCursor', [value, start, jsify(options)]));
    }
  }
}

class SearchCursorContainer extends ProxyHolder {
  SearchCursorContainer._(JsObject? jsProxy) : super(jsProxy);

  bool get atOccurrence => jsProxy!['atOccurrence'];
  Doc get doc => Doc.fromProxy(jsProxy!['doc']);
  Position get pos => Position.fromProxy(jsProxy!['pos']);

  /// Search forward from the current position
  bool findNext() => call('findNext');

  /// Search backward from the current position
  bool findPrevious() => call('findPrevious');
  Position from() => Position.fromProxy(call('from'));
  Position to() => Position.fromProxy(call('to'));
  String replace(String text, {dynamic origin}) {
    if (origin == null) {
      return callArg('replace', text);
    } else {
      return callArgs('replace', [text, origin]);
    }
  }
}
```

Add tests to check that every method of the add-on is working properly.   
We are using an html file to attach the Codemirror instance to.

```dart
// Copyright (c) 2014, Google Inc. Please see the AUTHORS file for details.
// All rights reserved. Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

@TestOn('browser')
library codemirror.tests;

import 'dart:html';

import 'package:codemirror/codemirror.dart';
import 'package:test/test.dart';
import 'package:codemirror/searchcursor.dart';

void main() {
  group('searchCursor', createSearchCursorTests);
}

void createSearchCursorTests() {
  late CodeMirror editor;

  setUp(() {
    editor = CodeMirror.fromTextArea(
        querySelector('#textContainer') as TextAreaElement?);
  });

  tearDown(() {
    editor.dispose();
  });

  test('getSearchCursor', () {
    var cursor = SearchCursor.getSearchCursor(editor, 'Lorem');
    print(cursor.pos);
    expect(cursor, isNotNull);
    expect(cursor, isA<SearchCursorContainer>());
  });

  test('findPrevious / findNext', () {
    var cursor = SearchCursor.getSearchCursor(editor, 'ipsum');
    var hasNext = cursor.findNext();
    expect(hasNext, isTrue);

    cursor.findNext();

    var hasPrev = cursor.findPrevious();
    expect(hasPrev, isTrue);
  });

  test('from / to', () {
    var cursor = SearchCursor.getSearchCursor(editor, 'Pellentesque');
    cursor.findNext();

    var from = cursor.from();
    var to = cursor.to();
    expect(from, isNotNull);
    expect(to, isNotNull);
  });

  test('atOccurrence', () {
    var cursor = SearchCursor.getSearchCursor(editor, 'dolor');
    cursor.findNext();
    expect(cursor.atOccurrence, isTrue);
  });

  test('doc', () {
    var cursor = SearchCursor.getSearchCursor(editor, 'sapien');
    expect(cursor.doc, isA<Doc>());
  });

  test('pos', () {
    var cursor = SearchCursor.getSearchCursor(editor, 'ipsum');
    expect(cursor.pos, isA<Position>());
  });
}
```

## Final result

The search cursor add-on lets users customize their Codemirror instance to add search-replace functionalities.

---

## Flutter/Gallery - Refactor [web benchmarks] Move to appropriate folder

:::info Contribution link
https://github.com/flutter/gallery/pull/520
:::

:::tip Contribution Types
This contribution is about **refactoring**.
:::

### Context

_**Flutter Gallery** is a resource to help developers evaluate and use Flutter. It is a collection of Material Design & Cupertino widgets, behaviors, and vignettes implemented with Flutter._

### Current behavior

Moves `benchmarks_test.dart` and the benchmarks sub-folder from the `test` folder to `test_benchmarks` as it is more appropriate.

### Implement the solution

This contribution is mainly about moving files to another directory, nothing special here. 

```dart
final taskResult = await serveWebBenchmark(
  benchmarkAppDirectory: projectRootDirectory(),
  entryPoint: 'test_benchmarks/benchmarks/client.dart',
  useCanvasKit: false,
);
```

## Final result

Made the codebase more easily maintainable by moving the benchmark tests inside a more appropriate directory. 

---

## Flutter/Gallery - Back button overlapping

:::info Contribution link
https://github.com/flutter/gallery/pull/522
:::

:::warning Contribution Types
This contribution is a **bug-fix**.
:::

### Current behavior

Fixes the overlapping "Back" button with the bottom navigation bar problem.

### Implement the solution

Add a new `hasBottomNavBar` property which define if we should add some bottom padding to the back button.

```dart title="lib/routes.dart"
(context, match) =>
    const StudyWrapper(study: reply.ReplyApp(), hasBottomNavBar: true)),
```

Add a vertical bottom padding if the bottom nav bar is present.

```dart title="lib/pages/home.dart"
/// ...
padding: EdgeInsets.symmetric(
    horizontal: 16.0,
    vertical: widget.hasBottomNavBar
        ? kBottomNavigationBarHeight + 16.0
        : 16.0),
/// ...
```

## Final result

Improved the User Experience as the back button is no longer overlapping with the bottom nav bar and is more easily accessible.

<div className="image-wrapper">
  <ImageWrapper src={useBaseUrl('img/flutter/gallery-nav-bar.jpeg')} width="80%" alt="Gallery back button overlapping" />
<em>Gallery back button overlapping</em>
</div>

---

## Flutter - CPU/GPU/memory metrics for iOS gallery transition tests

:::info Contribution link
https://github.com/flutter/flutter/pull/83375
:::

:::tip Contribution Types
This contribution is a new **feature**.
:::

### Context

_**DeviceLab** is a physical lab that tests Flutter on real devices._

### Current behavior

This contribution adds missing CPU/GPU/memory metrics for iOS gallery transition tests.

:::note Issue links
https://github.com/flutter/flutter/issues/70438
:::

### Implement the solution

Report the CPU/GPU/memory metrics if the `measureCpuGpu` and `measureMemory` properties are `true` and if the device OS is iOS.

```dart title="dev/devicelab/lib/tasks/gallery.dart"
final bool measureCpuGpu;
final bool measureMemory;

final bool isAndroid = deviceOperatingSystem == DeviceOperatingSystem.android;
if (measureCpuGpu && !isAndroid) ...<String>[
  // See https://github.com/flutter/flutter/issues/68888
  if (summary['average_cpu_usage'] != null) 'average_cpu_usage',
  if (summary['average_gpu_usage'] != null) 'average_gpu_usage',
],
if (measureMemory && !isAndroid) ...<String>[
  // See https://github.com/flutter/flutter/issues/68888
  if (summary['average_memory_usage'] != null) 'average_memory_usage',
  if (summary['90th_percentile_memory_usage'] != null) '90th_percentile_memory_usage',
  if (summary['99th_percentile_memory_usage'] != null) '99th_percentile_memory_usage',
],
```

## Final result

Added some missing metrics for `GalleryTransition` tests to improve maintainers experience. 

---

## Takeaway

### Problems encountered

The code exploration was the part that took me the most time as some projects are pretty big.  
I was also busy with work, school and other things which is why I didn't make as many contributions as I would have liked.

### What did I learn ?

This were my first contributions in Dart that taught me a lot!   
It was also a good experience contributing to the Flutter ecosystem💙
