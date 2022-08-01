# Dataframe

## Go
```go
package main

import (
	. "fmt"
	"io/ioutil"
	"log"
	"strings"

	"github.com/go-gota/gota/dataframe"
	"github.com/go-gota/gota/series"
)

const DATANAME = "iris.data"
const URL = "http://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data"

func main() {
	_, err := grab.Get(DATANAME, URL)
	if err != nil {
		log.Fatal(err)
	}

	content, err2 := ioutil.ReadFile(DATANAME)
	if err2 != nil {
		log.Fatal(err)
	}
	ioContent := strings.NewReader(string(content))
	df := dataframe.ReadCSV(ioContent,
		dataframe.Names("Sepal_Length", "Sepal_Width", "Petal_Length", "Petal_Width", "Class"),
		dataframe.WithDelimiter(','),
		dataframe.HasHeader(false))

	// filter rows
	df1 := df.Filter(
		dataframe.F{1, "Sepal_Length", series.Greater, 5.4},
	)
	df2 := df1.Filter(
		dataframe.F{1, "Petal_Width", series.LessEq, 0.2},
	)
	Println(df2)

	//select columns
	df3 := df2.Select([]string{"Sepal_Length", "Petal_Width", "Class"})
	Println(df3)
}
```

## Julia
```julia
using Downloads, DataFrames, CSV
dataname = "iris.data"

url = "http://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data"
touch(dataname)
Downloads.download(url, dataname)

df = DataFrame(CSV.File(dataname; header = 0))
df = rename(df, "Column1" => "Sepal_Length", "Column2" => "Sepal_Width", "Column3" =>"Petal_Length", "Column4" => "Petal_Width", "Column5" => "Class")

# filter rows
df1 = df[(df.Sepal_Length .> 5.4) .& (0.1 .<= df.Petal_Width .<= 0.2), :]
println(df1)

# select columns
df3 = df1[:, [1, 4, 5]]
println(df3)
```

## Python 
```python
```
