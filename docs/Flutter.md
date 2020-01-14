# Flutter

## List dynamic
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

## Input Field
```dart
```