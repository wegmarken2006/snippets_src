# Flutter

## List, clickable
```dart

import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  var lst = ["aaa", "bbb"];
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
        body: listBuild(lst),
      ),
    );
  }
}

ListView listBuild(List lst) {
  return ListView.builder(
    itemCount: lst.length,
    itemBuilder: (BuildContext context, int position) {
      return ListTile(
        leading: CircleAvatar(
          backgroundColor: Colors.lightGreenAccent,
          child: Text('${position + 1}'),
        ),
        title: Text('${lst[position]}'),
        subtitle: Text('${lst[position]}'),
        onTap: () {
          return showDialog(
            context: context,
            builder: (context) {
              return AlertDialog(
                content: Text('Clicked ${lst[position]}'),
              );
            },
          );
        },
      );
    },
  );
}
```

## Input Field
```dart
```