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

This article is composed of eight contributions:

- <Merged /> Flutter - Cupertino / Date order parameter <a href="#flutter--cupertino---date-order-parameter"><Highlight color="#203666">link</Highlight></a>
- <Merged /> Flutter - Cocoon / Config keyHelper reference <a href="#flutter--cocoon---config-keyhelper-reference"><Highlight color="#203666">link</Highlight></a>
- <Merged /> Dart-lang / `printOnFailure` check current invoker <a href="#dart-lang--printonfailure-check-current-invoker"><Highlight color="#203666">link</Highlight></a>
- <Merged /> Codemirror.dart / Add SearchCursor wrapper <a href="#codemirrordart--add-searchcursor-wrapper"><Highlight color="#203666">link</Highlight></a>
- <Merged /> Flutter - Gallery / Refactor [web benchmarks] Move to appropriate folder <a href="#flutter---gallery--refactor-web-benchmarks-move-to-appropriate-folder"><Highlight color="#203666">link</Highlight></a>
- <Merged /> Flutter - Gallery / Back button overlapping <a href="#flutter---gallery--back-button-overlapping"><Highlight color="#203666">link</Highlight></a>
- <Open /> Flutter / CPU/GPU/memory metrics for iOS gallery transition tests <a href="#flutter---gallery--back-button-overlapping"><Highlight color="#203666">link</Highlight></a>
- <Open /> Flutter / Check for Android device battery level <a href="#flutter---gallery--back-button-overlapping"><Highlight color="#203666">link</Highlight></a>

### Project

You can find the **Flutter project presentation** <a href="/docs/projects/flutter"><Highlight color="#203666">here</Highlight></a>.

## Flutter / Cupertino - Date order parameter

:::info Contribution link
https://github.com/flutter/flutter/pull/84599  
:::

:::tip Contribution Types
This contribution is a new **feature**.
:::

### Context

Cupertino (iOS-style) widgets are _Beautiful and high-fidelity widgets for current iOS design language._

<div className="image-wrapper">
  <ImageWrapper src={useBaseUrl('img/flutter/cupertino.png')} width="100%" alt="Flutter Cupertino" />
<em>Flutter Cupertino</em>
</div>

### Current behavior

This PR adds a new dateOrder parameter to CupertinoDatePicker to define the order of the columns in date mode which overrides the default order value defined by `localizations.datePickerDateOrder`.

<div className="image-wrapper">
  <ImageWrapper src={useBaseUrl('img/flutter/cupertino-date-order-before.png')} width="300px" alt="CupertinoDatePicker date order (before)" />
<em>CupertinoDatePicker date order (before)</em>
</div>

:::note Issue links
https://github.com/flutter/flutter/issues/84550
:::

### Implement the solution

```dart
/// Determines the order of the columns inside [CupertinoDatePicker] in date mode.
/// Defaults to the locale's default date format/order.
final DatePickerDateOrder? dateOrder;
```

```dart
final DatePickerDateOrder datePickerDateOrder =
    dateOrder ?? localizations.datePickerDateOrder;

switch (datePickerDateOrder) {
```

Tests

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

<div className="image-wrapper">
  <ImageWrapper src={useBaseUrl('img/flutter/cupertino-date-order-final.png')} width="300px" alt="CupertinoDatePicker date order" />
<em>CupertinoDatePicker date order</em>
</div>

---

## Flutter / Cocoon - Config keyHelper reference

:::info Contribution link
https://github.com/flutter/cocoon/pull/1233
:::

:::tip Contribution Types
This contribution is about **refactoring**.
:::

### Context

### Current behavior

This PR adds a new dateOrder parameter to CupertinoDatePicker to define the order of the columns in date mode which overrides the default order value defined by `localizations.datePickerDateOrder`.

:::note Issue links
https://github.com/flutter/flutter/issues/48987
:::

### Implement the solution

Before

```dart
final ClientContext clientContext = authContext.clientContext;
final KeyHelper keyHelper = KeyHelper(applicationContext: clientContext.applicationContext);
```

After

```dart
final KeyHelper keyHelper = config.keyHelper;
```

Tests

```dart
setUp(() {
  /// Other
  keyHelper = FakeKeyHelper(applicationContext: clientContext.applicationContext);
  config = FakeConfig(dbValue: datastoreDB, keyHelperValue: keyHelper);
});
```

## Final result

---

## Dart-lang / printOnFailure check current invoker

:::info Contribution link
https://github.com/dart-lang/test/pull/1533
:::

:::warning Contribution Types
This contribution is a **bug-fix**.
:::

### Context

### Current behavior

`printOnFailure` should explicitly check and throw if there is no current invoker.

```
 The method 'printOnFailure' was called on null.
  Receiver: null
  Tried calling: printOnFailure(<your-message>)
```

:::note Issue links
https://github.com/dart-lang/test/issues/1340
:::

### Implement the solution

This PR adds a check within `printOnFailure` and throw an exception if there is no current invoker.

Before

```dart
void printOnFailure(String message) => Invoker.current!.printOnFailure(message);
```

After

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

---

## Codemirror.dart / Add SearchCursor wrapper

:::info Contribution link
https://github.com/google/codemirror.dart/pull/138
:::

:::tip Contribution Types
This contribution is a new **feature**.
:::

### Context

### Current behavior

This PR adds a new dateOrder parameter to CupertinoDatePicker to define the order of the columns in date mode which overrides the default order value defined by `localizations.datePickerDateOrder`.

### Implement the solution

Add the wrapper.

```dart
// Copyright (c) 2021, Google Inc. Please see the AUTHORS file for details.
// All rights reserved. Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

/// A wrapper around the `addon/search/searchcursor.js` addon.
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

Add some tests

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

---

## Flutter - Gallery / Refactor [web benchmarks] Move to appropriate folder

:::info Contribution link
https://github.com/flutter/gallery/pull/520
:::

:::tip Contribution Types
This contribution is about **refactoring**.
:::

### Context

### Current behavior

This PR adds a new dateOrder parameter to CupertinoDatePicker to define the order of the columns in date mode which overrides the default order value defined by `localizations.datePickerDateOrder`.

### Implement the solution

## Final result

---

## Flutter - Gallery / Back button overlapping

:::info Contribution link
https://github.com/flutter/gallery/pull/522
:::

:::warning Contribution Types
This contribution is a **bug-fix**.
:::

### Context

### Current behavior

This PR adds a new dateOrder parameter to CupertinoDatePicker to define the order of the columns in date mode which overrides the default order value defined by `localizations.datePickerDateOrder`.

:::note Issue links
https://github.com/flutter/flutter/issues/48987
:::

### Implement the solution

```dart title="lib/pages/home.dart"
/// ...
padding: EdgeInsets.symmetric(
    horizontal: 16.0,
    vertical: widget.hasBottomNavBar
        ? kBottomNavigationBarHeight + 16.0
        : 16.0),
/// ...
```

```dart title="lib/routes.dart"
(context, match) =>
    const StudyWrapper(study: reply.ReplyApp(), hasBottomNavBar: true)),
```

## Final result

<div className="image-wrapper">
  <ImageWrapper src={useBaseUrl('img/flutter/gallery-nav-bar.jpg')} width="100%" alt="Gallery back button overlapping" />
<em>Gallery back button overlapping</em>
</div>

---

## Flutter / CPU/GPU/memory metrics for iOS gallery transition tests

:::info Contribution link
https://github.com/flutter/flutter/pull/83375
:::

:::tip Contribution Types
This contribution is a new **feature**.
:::

### Context

### Current behavior

This PR adds a new dateOrder parameter to CupertinoDatePicker to define the order of the columns in date mode which overrides the default order value defined by `localizations.datePickerDateOrder`.

:::note Issue links
https://github.com/flutter/flutter/issues/70438
:::

### Implement the solution

```dart
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

---

## Flutter / Check for Android device battery level

:::info Contribution link
https://github.com/flutter/flutter/pull/84534
:::

:::tip Contribution Types
This contribution is a new **feature**.
:::

### Context

### Current behavior

This PR adds a new dateOrder parameter to CupertinoDatePicker to define the order of the columns in date mode which overrides the default order value defined by `localizations.datePickerDateOrder`.

### Implement the solution

```dart
Future<int> _getBatteryLevel() async {
  final String batteryInfo = await shellEval('dumpsys', <String>['battery']);
  final String batteryLevel = grep('level:', from: batteryInfo).single.split(':')[1].trim();
  return int.parse(batteryLevel);
}
```

```dart
/// Whether the device has a battery level smaller than or equal to 15 percent.
@override
Future<bool> hasLowBatteryLevel() async {
  return await _getBatteryLevel() <= 15;
}
```

Check all devices battery level

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

Tests

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

---

## Takeaway

### Problems encountered

The code exploration was the part that took me the most time.  
In addition, I'm not accustomed to using XCode in my everyday developer life so I had to adapt to a different IDE than the one I usually use.

### What did I learn ?

This was my first contribution in Swift to an iOS app so it taught me a lot !  
Not being an iOS user, I also learned about 3D Touch in its use case in a real app.
