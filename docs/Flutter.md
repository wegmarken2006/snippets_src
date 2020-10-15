# Flutter

## Dynamic List
```dart

import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'MyApp',
      theme: new ThemeData(
        primarySwatch: Colors.green,
      ),
      home: Scaffold(
        appBar: new AppBar(
          title: new Text('MyApp'),
        ),
        body: BodyLayout(),
      ),
    );
  }
}

class BodyLayout extends StatefulWidget {
  @override
  BodyLayoutState createState() {
    return new BodyLayoutState();
  }
}

class BodyLayoutState extends State<BodyLayout> {
  var lst = ["aaa - tap to copy", "bbb - tap to copy"];

  @override
  Widget build(BuildContext context) {
    return _listBuild(lst);
  }

  ListView _listBuild(List lst) {
    return ListView.builder(
      itemCount: lst.length,
      itemBuilder: (BuildContext context, int index) {
        return ListTile(
          leading: CircleAvatar(
            backgroundColor: Colors.lightGreenAccent,
            child: Text('${index + 1}'),
          ),
          title: Text('${lst[index]}'),
          subtitle: Text('${lst[index]}'),
          onTap: () {
            setState(() {
              lst.add(lst[index]);
            });
          },
        );
      },
    );
  }
}
```

## Page Navigation
```dart

import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'MyApp',
      theme: new ThemeData(
        primarySwatch: Colors.green,
      ),
      home: Scaffold(
        appBar: new AppBar(
          title: new Text('MyApp'),
        ),
        body: bodyLayout(),
      ),
    );
  }
}

Widget bodyLayout() {
  var lst = ["aaa", "bbb"];
  var pages = [ClassPageAAA(), ClassPageBBB()];

  return ListView.builder(
      itemCount: lst.length,
      itemBuilder: (BuildContext context, int index) {
        return ListTile(
          leading: CircleAvatar(
            backgroundColor: Colors.lightGreenAccent,
            child: Text('${index + 1}'),
          ),
          title: Text('${lst[index]}'),
          subtitle: Text('${lst[index]}'),
          trailing: IconButton(
              icon: Icon(Icons.keyboard_arrow_right),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => pages[index]),
                );
              }),
        );
      });
}

MaterialApp _page(BuildContext context, String text) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: text,
      theme: new ThemeData(
        primarySwatch: Colors.green,
      ),
      home: Scaffold(
        appBar: new AppBar(
            title: new Text(text),
            leading: IconButton(
              icon: Icon(Icons.arrow_back),
              onPressed: () => Navigator.pop(context, false),
            )),
        body: Text('Page $text'),
      ),
    );
}

class ClassPageAAA extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return _page(context, 'AAA');
  }
}

class ClassPageBBB extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return _page(context, 'BBB');
  }
}
```

## Input Fields
```dart

import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'MyApp',
      theme: new ThemeData(
        primarySwatch: Colors.green,
      ),
      home: Scaffold(
        appBar: new AppBar(
          title: new Text('MyApp'),
        ),
        body: BodyLayout(),
      ),
    );
  }
}

class BodyLayout extends StatefulWidget {
  @override
  BodyLayoutState createState() {
    return new BodyLayoutState();
  }
}

class DataToElab {
  String f1, f2;
  DataToElab([this.f1 = '0', this.f2 = '0']);
}

class BodyLayoutState extends State<BodyLayout> {
  final contr1 = TextEditingController(text: '0');
  final contr2 = TextEditingController(text: '0');
  final contr3 = TextEditingController(text: '0');
  DataToElab _dElab = DataToElab();

  String _elabFields(DataToElab dElab) {
    var add1 = double.parse(dElab.f1);
    var add2 = double.parse(dElab.f2);
    var res = add1 + add2;
    return '$res';
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      child: ListView(
        children: <Widget>[
          TextFormField(
            controller: contr1,
            decoration: const InputDecoration(
              icon: const Icon(Icons.euro_symbol),
              hintText: 'Enter number',
              labelText: 'First',
            ),
            onFieldSubmitted: (text) {
              setState(() {
                _dElab.f1 = text;
                var res = _elabFields(_dElab);
                contr3.text = res;
              });
            },
          ),
          TextFormField(
            controller: contr2,
            decoration: const InputDecoration(
              icon: const Icon(Icons.euro_symbol),
              hintText: 'Enter number',
              labelText: 'Second',
            ),
            onFieldSubmitted: (text) {
              setState(() {
                _dElab.f2 = text;
                var res = _elabFields(_dElab);
                contr3.text = res;
              });
            },
          ),
          TextFormField(
            controller: contr3,
            decoration: const InputDecoration(
              icon: const Icon(Icons.add_circle),
              labelText: 'Result',
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 64.0),
            child: RaisedButton(
              onPressed: () {
                _dElab.f1 = contr1.text;
                _dElab.f2 = contr2.text;
                var res = _elabFields(_dElab);
                contr3.text = res;
              },
              child: Text('Calculate'),
            ),
          ),
        ],
      ),
    );
  }
}
```

## Multiple Columns form
```dart

import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'MyApp',
      theme: new ThemeData(
        primarySwatch: Colors.green,
      ),
      home: Scaffold(
        appBar: new AppBar(
          title: new Text('MyApp'),
        ),
        body: BodyLayout(),
      ),
    );
  }
}

class BodyLayout extends StatefulWidget {
  @override
  BodyLayoutState createState() {
    return new BodyLayoutState();
  }
}

class DataToElab {
  String f1, f2;
  DataToElab([this.f1 = '0', this.f2 = '0']);
}

class BodyLayoutState extends State<BodyLayout> {
  final contr1 = TextEditingController(text: '0');
  final contr2 = TextEditingController(text: '0');

  Column _form1() {
    return Column(
      children: <Widget>[
        Flexible(
          child: TextFormField(
            controller: contr1,
            decoration: const InputDecoration(
              icon: const Icon(Icons.euro_symbol),
              hintText: 'Enter number',
              labelText: 'First',
            ),
          ),
        ),
        Flexible(
          child: TextFormField(
            controller: contr2,
            decoration: const InputDecoration(
              icon: const Icon(Icons.euro_symbol),
              hintText: 'Enter number',
              labelText: 'Second',
            ),
          ),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Flexible(
          child: Row(
            children: [
              Flexible(
                child: _form1(),
              ),
              Flexible(
                child: _form1(),
              ),
            ],
          ),
        ),
        Flexible(
          child: TextFormField(
            //controller: contr3,
            decoration: const InputDecoration(
              icon: const Icon(Icons.add_circle),
              labelText: 'Result',
            ),
          ),
        ),
        Flexible(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 64.0),
            child: RaisedButton(
              onPressed: () {},
              child: Text('Calculate'),
            ),
          ),
        ),
      ],
    );
  }
}
```

## Persistence, Key/Value
```dart

//dependencies:
//  shared_preferences: ^0.5.6

import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'MyApp',
      theme: new ThemeData(
        primarySwatch: Colors.green,
      ),
      home: Scaffold(
        appBar: new AppBar(
          title: new Text('MyApp'),
        ),
        body: BodyLayout(),
      ),
    );
  }
}

Future<SharedPreferences> _getPrefs() async {
  final prefs = await SharedPreferences.getInstance();
  return prefs;
}

void _setVal(SharedPreferences prefs, String key, int value) {
  prefs.setInt(key, value);
}

int _getVal(SharedPreferences prefs, String key) {
  final value = prefs.getInt(key) ?? 0;
  return value;
}

class BodyLayout extends StatefulWidget {
  @override
  BodyLayoutState createState() {
    return new BodyLayoutState();
  }
}

class BodyLayoutState extends State<BodyLayout> {
  final contr3 = TextEditingController();
  SharedPreferences _prefs;

  @override
  void initState() {
    _getPrefs().then((onValue) {
      _prefs = onValue;
      //Init Output field with current key value
      var tmp = _getVal(_prefs, 'key1');
      contr3.text = '$tmp';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      child: ListView(
        children: <Widget>[
          TextFormField(
            controller: contr3,
            decoration: const InputDecoration(
              icon: const Icon(Icons.add_circle),
              labelText: 'Key Value',
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 64.0),
            child: RaisedButton(
              onPressed: () {
                var tmp = _getVal(_prefs, 'key1');
                tmp = tmp + 1;
                _setVal(_prefs, 'key1', tmp);
                contr3.text = '$tmp';
              },
              child: Text('Inc Key'),
            ),
          ),
        ],
      ),
    );
  }
}
```

## Notification
```dart

//        <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"/>
//dependencies:
//  rxdart: ^0.24.0
//  flutter_local_notifications: ^2.0.1
import 'dart:async';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:rxdart/subjects.dart';

final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
    FlutterLocalNotificationsPlugin();

/// Streams are created so that app can respond to notification-related events
/// since the plugin is initialised in the `main` function
final BehaviorSubject<ReceivedNotification> didReceiveLocalNotificationSubject =
    BehaviorSubject<ReceivedNotification>();

final BehaviorSubject<String> selectNotificationSubject =
    BehaviorSubject<String>();

class ReceivedNotification {
  ReceivedNotification({
    @required this.id,
    @required this.title,
    @required this.body,
    @required this.payload,
  });

  final int id;
  final String title;
  final String body;
  final String payload;
}

Future<void> main() async {
  // needed if you intend to initialize in the `main` function
  WidgetsFlutterBinding.ensureInitialized();

  const AndroidInitializationSettings initializationSettingsAndroid =
      AndroidInitializationSettings('app_icon');

  /// Note: permissions aren't requested here just to demonstrate that can be
  /// done later
  final InitializationSettings initializationSettings =
      InitializationSettings(android: initializationSettingsAndroid);
  await flutterLocalNotificationsPlugin.initialize(initializationSettings,
      onSelectNotification: (String payload) async {
    selectNotificationSubject.add(payload);
  });
  runApp(
    MaterialApp(
      home: HomePage(),
    ),
  );
}

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _counter = 0;
  @override
  void initState() {
    super.initState();
    _configureSelectNotificationSubject();
  }

  void _configureSelectNotificationSubject() {
    selectNotificationSubject.stream.listen((String payload) async {
      setState(() {
        _counter = _counter + 1;
      });
    });
  }

  @override
  void dispose() {
    didReceiveLocalNotificationSubject.close();
    selectNotificationSubject.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => MaterialApp(
        home: Scaffold(
          appBar: AppBar(
            title: const Text('Plugin example app'),
          ),
          body: Center(
            child: RaisedButton(
              child: Text('Notify $_counter'),
              onPressed: () async {
                await _showNotification();
              },
            ),
          ),
        ),
      );

  Future<void> _showNotification() async {
    const AndroidNotificationDetails androidPlatformChannelSpecifics =
        AndroidNotificationDetails(
            'your channel id', 'your channel name', 'your channel description',
            importance: Importance.max,
            priority: Priority.high,
            ticker: 'ticker');
    const NotificationDetails platformChannelSpecifics =
        NotificationDetails(android: androidPlatformChannelSpecifics);
    await flutterLocalNotificationsPlugin.show(
        0, 'plain title', 'plain body', platformChannelSpecifics,
        payload: 'item x');
  }
}
```