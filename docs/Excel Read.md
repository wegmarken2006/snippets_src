# Excel Read

## Python
```python

# pip install pandas
# pip install numpy
# pip install xlrd

import pandas as pd
import numpy as np

"""
col0    col1    col2    col3
xx      xx      xx      xx
item1      1       2       3
item2      4       5       6
"""

df = pd.read_excel("tmp.xlsx", "Sheet1")

# get cols, discard firt row
col1 = df["col1"][1:]
col2 = df["col2"][1:]
col3 = df["col3"][1:]
for num in col1:
    print(f"{num}")

# get item2 row, numeric values only
num_cols = df.columns[1:]
row2 = df[df["col0"] == "item2"][num_cols]
row2 = row2.to_numpy(dtype=float)[0]
for num in row2:
    print(f"{num}")
```