# Fltk


## Rust
```rust

//[dependencies]
//fltk = "0.16.5"
use fltk::{app::*, button::*, frame::*, window::*};

const WIN_X: i32 = 50;
const WIN_Y: i32 = 50;
const WIN_WIDTH: i32 = 800;
const WIN_HEIGHT: i32 = 600;
const B_W: i32 = 80;
const B_H: i32 = 40;

fn main() {
    let app = App::default().with_scheme(Scheme::Gtk);

    let mut wind = Window::new(WIN_X, WIN_Y, WIN_WIDTH, WIN_HEIGHT, "Fltk Test");
    let bt1_x = WIN_X + 10;

    let mut bt1 = Button::new(bt1_x, WIN_Y + 10, B_W, B_H, "Press");
    bt1.set_tooltip("Press to increment counter");

    let ct1_y = WIN_Y + B_H + 10;
    let mut ct1 = Frame::new(bt1_x, ct1_y + 10, B_W, B_H, "0");

    bt1.set_callback2(move |bt| {
        bt.set_label("Pressed");
        let count = (ct1.label().parse::<i32>().unwrap() + 1).to_string();
        ct1.set_label(&count);
    });

    wind.make_resizable(true);
    wind.end();
    wind.show();

    app.run().unwrap();
}


```