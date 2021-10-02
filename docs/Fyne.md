# Fyne


## Go
```go
//go.mod
//require fyne.io/fyne/v2 v2.1.0
package main

import (
	. "fmt"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/app"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"
)

const WIN_WIDTH = 800
const WIN_HEIGHT = 600

func main() {
	app := app.New()
	wind := app.NewWindow("Fyne test")
	wind.Resize(fyne.Size{Height: WIN_HEIGHT, Width: WIN_WIDTH})

	count := 0
	lb1 := widget.NewLabel("Result below")
	lb2 := widget.NewLabel("")
	var bt1 *widget.Button
	bt1 = widget.NewButton("Press", func() {
		count = count + 1
		lb2.SetText(Sprintf("Count: %d", count))
		bt1.SetText("Again")
	})
	wind.SetContent(
		container.NewVBox(
			container.NewCenter(
				container.NewVBox(
					lb1,
					lb2,
				),
			),
			container.NewCenter(bt1),
		),
	)
	wind.ShowAndRun()
}
```