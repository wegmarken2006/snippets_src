# Charts

## Go
```go

//go.mode
//require github.com/go-echarts/go-echarts/v2 v2.2.4
package main

import (
	"fmt"
	"math"
	"os"

	"github.com/go-echarts/go-echarts/v2/charts"
	"github.com/go-echarts/go-echarts/v2/opts"
)

func main() {
	var yLineVals []opts.LineData
	var yBarVals []opts.BarData
	var xVals []string

	//prepare data
	for ind := -314; ind <= 314; ind += 10 {
		xVals = append(xVals, fmt.Sprintf("%d", ind))
		yLineVals = append(yLineVals, opts.LineData{Value: math.Sin(float64(ind) / 100.)})
		yBarVals = append(yBarVals, opts.BarData{Value: math.Sin(float64(ind) / 100.)})
	}

	line := charts.NewLine()
	line.SetGlobalOptions(
		charts.WithXAxisOpts(opts.XAxis{Name: "X"}),
		charts.WithYAxisOpts(opts.YAxis{Name: "Sin(x)"}),

		charts.WithTitleOpts(opts.Title{
			Title:    "Sin(x)",
			Subtitle: "",
		}))
	line.SetXAxis(xVals).AddSeries("Sin(x)", yLineVals)
	f, _ := os.Create("line.html")
	line.Render(f)

	bar := charts.NewBar()
	bar.SetGlobalOptions(
		charts.WithTitleOpts(opts.Title{
			Title:    "Sin(x)",
			Subtitle: "",
		}))
	bar.SetXAxis(xVals).AddSeries("Sin(x)", yBarVals)
	g, _ := os.Create("bar.html")
	bar.Render(g)
}
```

## Rust
```rust

//[dependencies]
//plotters = "0.2.12"
use plotters::prelude::*;

fn main() {
    let root =
        BitMapBackend::new("tmp0.png", (640, 480)).into_drawing_area();
    root.fill(&WHITE).unwrap();
    let mut chart = ChartBuilder::on(&root)
        .caption("y=sin2(x)", ("sans-serif", 50).into_font())
        .margin(5)
        .x_label_area_size(30)
        .y_label_area_size(30)
        .build_ranged(-4f32..4f32, -1f32..1f32)
        .unwrap();

    chart.configure_mesh().draw().unwrap();

    let x_list = (-314..314).step_by(10);
    let x_list_f = x_list.map(|x| x as f32/100.0).map(|x| (x, x.sin()));
    //let xx = (-50..=50).map(|x| x as f32 / 50.0).map(|x| (x, x * x));

    chart
        .draw_series(LineSeries::new(x_list_f, &RED))
        .unwrap()
        .label("y = sin(x)")
        .legend(|(x, y)| PathElement::new(vec![(x, y), (x + 20, y)], &RED));

    chart
        .configure_series_labels()
        .background_style(&WHITE.mix(0.8))
        .border_style(&BLACK)
        .draw()
        .unwrap();
}

```

## Typescript
```typescript

//npm install --save plotly.js-dist
//npm install --save @types/plotly.js
//browserify hello.js -o hello2.js
import * as Plotly from 'plotly.js-dist';

function range(start, end, step) {
    var ans = [];
    for (let i = start; i <= end; i = i + step) {
        ans.push(i);
    }
    return ans;
}
let x = range(-314, 314, 10);
let y = x.map((x) => Math.sin(x / 100.));
var trace1: Partial<Plotly.PlotData> = {
    x: x,
    y: y,
    name: 'Sine',
    type: ''
};

var data: Partial<Plotly.PlotData>[] = [trace1];
var layout: Partial<Plotly.Layout> = { yaxis: { 'title': 'sin(x)' } };

Plotly.newPlot('myDiv', data, layout);
```
```html
<!-- hello2.html -->
<head>
    <meta charset="utf-8">
 </head>

<body>
    <div id="myDiv"></div>
</body>
<script src="hello2.js"></script>
```