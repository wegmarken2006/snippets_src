# JSON

## Dart
```dart
import 'dart:io';
import 'dart:convert';

class Config {
  String descr;
  List<int> iList;
  List<String> sList;
  Config(this.descr, this.iList, this.sList);
  dynamic fromJson(Map<String, dynamic> json) {
    return Config(
      json['description'],
      List<int>.from(json['i_list']),
      List<String>.from(json['s_list']),
    );
  }

  static Map<String, dynamic> toJson(Config value) => {
    'description': value.descr,
    'i_list': value.iList,
    's_list': value.sList,
  };
}

void main() {
  var conf = Config("Description", [1, 2, 3, 4], ["AAA", "BBB", "CCC"]);
  var fileName = "tmp01.json";
  var f = File(fileName);
  var encodeMap = jsonEncode(
    conf,
    toEncodable: (Object? value) => value is Config
        ? Config.toJson(value)
        : throw UnsupportedError('Cannot convert to JSON: $value'),
  );
  f.writeAsString(encodeMap);

  Map<String, dynamic> data;
  f.readAsString().then((str1) {
    data = jsonDecode(str1);
    print('$data');
  });
}
```