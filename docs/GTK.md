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