# Date & Time


## Dart
```dart

//dependencies:
//  intl: ^0.16.1

import 'package:intl/intl.dart';

main() async {
  var today = DateTime.now();

  // from date to string
  var today_str = DateFormat('yyyy-MM-dd**kk:mm:ss').format(today);
  var date_str = DateFormat('dd-MM-yyyy').format(today);
  var time_str = DateFormat('kk:mm').format(today);

  // from string to date
  var today2 = DateFormat('yyyy-MM-dd**kk:mm:ss').parse(today_str);

  var hour = today.hour;
  var minute = today.minute;
  var day = today.day;
  var month = today.month;
  var year = today.year;

  // weekday
  var days_of_week = ["sun", "mon", "tue", "wed", "thu", "fry", "sat"];
  var weekday = days_of_week[today.weekday];
  
  var tomorrow = today.add(Duration(days: 1));

  // difference between dates
  var next_week = today.add(Duration(days: 7));
  var delta_w = next_week.difference(today).inDays;
  var next_year = today.add(Duration(days: 366));
  var n_year = next_year.year;
  var delta_y = n_year - year;
    
  print(today);
  print(today_str);
  print ('$day-$month-$year  $hour:$minute');
  print(date_str);
  print(time_str);
  print(today2);
  print(weekday);
  print(tomorrow);
  print(delta_w);
  print(delta_y);
}
```

## Go
```go

package main

import (
	"fmt"
	"time"
)

func main() {
	today := time.Now()
	year := today.Year()
	month := today.Month()
	day := today.Day()
	hour := today.Hour()
	minute := today.Minute()
	second := today.Second()

	// from date to string
	todayStr := fmt.Sprintf("%d-%02d-%02d**%02d:%02d:%02d",
		year, month, day, hour, minute, second)
	dateStr := today.Format("2006-01-02")
	timeStr := today.Format("15:04:05")

	// from string to date
	today2, _ := time.Parse("2006-01-02**15:04:05", todayStr)

	// weekday
	weekday := today.Weekday()

	tomorrow := today.AddDate(0, 0, 1)

	// difference between dates
	nextWeek := today.AddDate(0, 0, 7)
	deltaW := nextWeek.Sub(today).Hours() / 24
	nextYear := today.AddDate(1, 0, 0)
	nYear := nextYear.Year()
	deltaY := nYear - year

	fmt.Printf("%v\n", today)
	fmt.Printf("%v\n", todayStr)
	fmt.Printf("%v\n", dateStr)
	fmt.Printf("%v\n", timeStr)
	fmt.Printf("%v\n", today2)
	fmt.Printf("%v\n", weekday)
	fmt.Printf("%v\n", tomorrow)
	fmt.Printf("%v\n", deltaW)
	fmt.Printf("%v\n", deltaY)
}
```

## Python
```python

import datetime as dt
from dateutil import relativedelta

today = dt.datetime.today()

# from date to string
today_str = dt.datetime.strftime(today, '%Y-%m-%d**%H:%M:%S')
date_str = dt.datetime.strftime(today, '%d-%m-%Y')
time_str = dt.datetime.strftime(today, '%H:%M')

# from string to date
today2 = dt.datetime.strptime(today_str, '%Y-%m-%d**%H:%M:%S')
hour = today.hour
minute = today.minute
day = today.day
month = today.month
year = today.year

# weekday
days_of_week = ["mon", "tue", "wed", "thu", "fry", "sat", "sun"]
weekday = days_of_week[today.weekday()]

tomorrow = today + dt.timedelta(days=1)
tomorrow_str = dt.datetime.strftime(tomorrow, '%d-%m-%Y')

# difference between dates
next_week = today + dt.timedelta(days=7)
delta_w = (next_week -today).days
next_year = today + dt.timedelta(days=366)
delta_y = (relativedelta.relativedelta(next_year, today)).years

print(today)
print(today_str)
print (f'{day}-{month}-{year}  {hour}:{minute}')
print(date_str)
print(time_str)
print(today2)
print(weekday)
print(tomorrow_str)
print(delta_w)
print(delta_y)
```

## Rust
```rust

// chrono = "*"
use chrono::{Datelike, Duration, NaiveDateTime, Timelike, Utc};

fn main() {
    let today = Utc::now();

    //from date to string
    let today_str = format!("{}", today.format("%Y-%m-%d**%H:%M:%S"));
    let date_str = format!("{}", today.format("%d-%m-%Y"));
    let time_str = format!("{}", today.format("%H:%M"));

    // from string to date
    let today2 =
        NaiveDateTime::parse_from_str(&today_str, "%Y-%m-%d**%H:%M:%S").expect("Error parse");
    let hour = today.hour();
    let minute = today.minute();
    let day = today.day();
    let month = today.month();
    let year = today.year();

    // weekday
    let weekday = today.weekday();

    let tomorrow = today + Duration::days(1);
    let tomorrow_str = format!("{}", tomorrow.format("%d-%m-%Y"));

    // difference between dates
    let next_week = today + Duration::days(7);
    let delta_w = next_week.signed_duration_since(today).num_days();
    let next_year = today + Duration::days(366);
    let nyear = next_year.year();
    let delta_y = nyear - year;
    println!("{:?}", today);
    println!("{}", today_str);
    println!("{}-{}-{} {}:{}", day, month, year, hour, minute);
    println!("{}", date_str);
    println!("{}", time_str);
    println!("{}", today2);
    println!("{}", weekday);
    println!("{}", tomorrow_str);
    println!("{}", delta_w);
    println!("{}", delta_y);
}
```