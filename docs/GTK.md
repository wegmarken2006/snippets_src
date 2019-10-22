# GTK

## Nim
```nim

# nimble install gintro
import gintro/[gtk, gobject, gio]
import strformat

var count = 0

proc hello(b: Button; lbl: Label) =
  count += 1
  lbl.text = &" {count} "

proc quitApp(b: Button; app: Application) =
  echo "Bye"
  quit(app)

proc appActivate(app: Application) =
  let builder = newBuilder()
  discard builder.addFromFile("builder.ui")
  let window = builder.getApplicationWindow("window")
  window.setApplication(app)
  var button = builder.getButton("button1")
  let label = builder.getLabel("label1")
  button.connect("clicked", hello, label)
  button = builder.getButton("quit")
  button.connect("clicked", quitApp, app)

proc main =
  let app = newApplication("org.gtk.example")
  connect(app, "activate", appActivate)
  discard run(app)

main()
```

## Python
```python

# Tested in Ubuntu 18.04
import gi
gi.require_version('Gtk', '3.0')
from gi.repository import Gtk

count = 0

def on_button_clicked(widget):
    global count
    label: Gtk.Label = builder.get_object("label1")
    count += 1
    label.set_text(f" {count}")

def on_b_quit_clicked(widget):
    print("Bye")
    quit()


builder = Gtk.Builder()
builder.add_from_file("builder.ui")
window = builder.get_object("window")
button = builder.get_object("button1")
label = builder.get_object("label1")
b_quit = builder.get_object("quit")

button.connect("clicked", on_button_clicked)
b_quit.connect("clicked", on_b_quit_clicked)
window.show_all()
Gtk.main()
```

## Rust
```rust

//[dependencies]
//gio = "0.7.0"
//gtk = "0.7.0"

//rustup default stable-x86_64-pc-windows-gnu

use gio::prelude::*;
use gtk::prelude::*;
use gtk::*;

use std::cell::RefCell;
use std::env::args;
use std::rc::Rc;

//utility functions

//get generic object from builder
fn get_gen_obj<T: IsA<Object>>(id: &str, builder: &Builder) -> T {
    let gen_obj: T = builder
        .get_object(id)
        .expect(&format!("Couldn't get {}", id));
    gen_obj
}

fn get_num_label_val(id: &str, builder: &Builder) -> i32 {
    let lbl1: Label = get_gen_obj(id, builder);
    let l1val = lbl1
        .get_text()
        .and_then(|s| s.trim().parse::<i32>().ok())
        .unwrap_or(0);
    l1val
}

fn set_num_label_val(id: &str, builder: &Builder, val: i32) {
    let lbl1: Label = get_gen_obj(id, builder);
    lbl1.set_text(&format!(" {}", val));
}
// utility end

fn app_activate(application: &Application) {
    // First we get the file content.
    let glade_src = include_str!("builder.ui");
    // Then we call the Builder call.
    let builder = Builder::new_from_string(glade_src);
    let window: ApplicationWindow = get_gen_obj("window", &builder);
    window.set_application(Some(application));
    let button: Button = get_gen_obj("button1", &builder);
    let label: Label = get_gen_obj("label1", &builder);
    label.set_text(&format!(" {} ", 0));
    //to avoid moving builder so that it can be accessed later
    let builder_rc_1 = Rc::new(RefCell::new(builder.clone()));

    button.connect_clicked(move |_| {
        let builder_ptr = &(*builder_rc_1.borrow());
        //increment counter in label1 text
        let mut count = get_num_label_val("label1", builder_ptr);
        count += 1;
        set_num_label_val("label1", builder_ptr, count);
    });

    let q_button: Button = get_gen_obj("quit", &builder);

    //avoid ownership check to use "window" inside the closure
    let window_weak = window.downgrade();
    q_button.connect_clicked(move |_| {
        println!("Bye");
        let window = window_weak.upgrade().unwrap();
        window.destroy();
    });
    window.show_all();
}

fn main() {
    let application = Application::new(Some("org.gtk.example"), Default::default())
        .expect("Initialization failed...");

    application.connect_activate(move |app| {
        app_activate(app);
    });
    application.run(&args().collect::<Vec<_>>());
}
```

## builder.ui
```xml

<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated with glade 3.22.1 -->
<interface>
  <requires lib="gtk+" version="3.0"/>
  <object class="GtkApplicationWindow" id="window">
    <property name="visible">True</property>
    <property name="can_focus">False</property>
    <property name="border_width">10</property>
    <property name="title">Grid</property>
    <child>
      <placeholder/>
    </child>
    <child>
      <object class="GtkGrid" id="grid">
        <property name="visible">True</property>
        <property name="can_focus">False</property>
        <child>
          <object class="GtkButton" id="button1">
            <property name="label">Button 1</property>
            <property name="visible">True</property>
            <property name="can_focus">False</property>
            <property name="receives_default">False</property>
          </object>
          <packing>
            <property name="left_attach">0</property>
            <property name="top_attach">0</property>
          </packing>
        </child>
        <child>
          <object class="GtkButton" id="quit">
            <property name="label">Quit</property>
            <property name="visible">True</property>
            <property name="can_focus">False</property>
            <property name="receives_default">False</property>
          </object>
          <packing>
            <property name="left_attach">0</property>
            <property name="top_attach">1</property>
            <property name="width">2</property>
          </packing>
        </child>
        <child>
          <object class="GtkLabel" id="label1">
            <property name="visible">True</property>
            <property name="can_focus">False</property>
            <property name="label" translatable="yes">label</property>
          </object>
          <packing>
            <property name="left_attach">1</property>
            <property name="top_attach">0</property>
          </packing>
        </child>
      </object>
    </child>
  </object>
</interface>
```