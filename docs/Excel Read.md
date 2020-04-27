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

## Rust
```rust

//[dependencies]
//calamine = "0.16.1"
use calamine::{open_workbook, Reader, Xlsx};
use std::collections::HashMap;

fn main() {
    /*
    col0    col1    col2    col3
    xx      xx      xx      xx
    item1      1       2       3
    item2      4       5       6
    */
    let mut excel: Xlsx<_> = open_workbook("tmp.xlsx").unwrap();

    let content = excel.worksheet_range("Sheet1").unwrap().unwrap();
    let mut col_names: Vec<&str> = vec![];
    let mut rows: Vec<Vec<f64>> = vec![];
    let mut named_rows: HashMap<&str, Vec<f64>> = HashMap::new();

    let mut ind = 0;
    for item in content.rows() {
        if ind == 0 {
            for elem in item {
                let col_name = match elem {
                    calamine::DataType::String(strt) => strt,
                    _ => "",
                };
                col_names.push(col_name);
            }
        } else if ind > 1 {
            let mut row: Vec<f64> = vec![];
            let mut name: &str = "";
            for elem in item {
                match elem {
                    calamine::DataType::Float(num) => {
                        row.push(*num);
                        ()
                    }
                    calamine::DataType::String(strt) => {
                        name = &strt;
                        ()
                    }
                    _ => (),
                };
            }
            rows.push(row.clone());
            named_rows.entry(name).or_insert(row);
        }
        ind = ind + 1;
    }

    // get named column
    let col = get_column(rows, "col1", col_names).unwrap();
    println!("{:?}", col);

    // get named row
    println!("{:?}", named_rows.get("item1").unwrap());
}

fn get_column(
    rows: Vec<Vec<f64>>,
    col_name: &str,
    col_names: Vec<&str>,
) -> Result<Vec<f64>, &'static str> {
    // get col index
    let mut col_index: i32 = -1;
    for (ind, item) in col_names.iter().enumerate() {
        if *item == col_name {
            col_index = ind as i32;
            break;
        }
    }
    if col_index == -1 {
        Err("Column not found")
    } else {
        let mut col: Vec<f64> = vec![];
        for row in rows {
            col.push(row[col_index as usize]);
        }
        Ok(col)
    }
}
```
