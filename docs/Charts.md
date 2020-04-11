# Charts

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
