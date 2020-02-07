# Date & Time

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

# differenxe between dates
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