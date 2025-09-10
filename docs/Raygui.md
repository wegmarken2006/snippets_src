# Raygui


## Odin
```go

package main

import "core:fmt"
import "core:math"
import "core:strings"
import rl "vendor:raylib"

main :: proc() {
	rl.InitWindow(800, 400, "raygui - controls test suite")
	rl.SetTargetFPS(60)

	monitor := rl.GetCurrentMonitor()
	width := rl.GetMonitorWidth(monitor)
	height := rl.GetMonitorHeight(monitor)
	
	scale := rl.Vector2{f32(width)/1280, f32(height)/720}
	cur_text_size := rl.GuiGetStyle(.DEFAULT, i32(rl.GuiDefaultProperty.TEXT_SIZE))
	new_text_size := cur_text_size*i32(math.ceil(scale.y))
	
	rl.GuiSetStyle(.DEFAULT, i32(rl.GuiDefaultProperty.TEXT_SIZE), new_text_size)

	counter := 0
	bt_msg := strings.clone_to_cstring("Press")
	for !rl.WindowShouldClose() {
		// Draw
		//----------------------------------------------------------------------------------
		rl.BeginDrawing()
		rl.ClearBackground(
			rl.GetColor(
				u32(rl.GuiGetStyle(.DEFAULT, i32(rl.GuiDefaultProperty.BACKGROUND_COLOR))),
			),
		)

		if rl.GuiButton(rl.Rectangle{24, 24, 240, 60}, bt_msg) {
			counter += 1
		}
		if counter > 0 {
			bt_msg = strings.clone_to_cstring("Again")
		}
		c_str := strings.clone_to_cstring(fmt.tprintf("Count: %d", counter))
		label_len: f32 = 100
		label_x := (f32(rl.GetScreenWidth() - i32(len(c_str))) - label_len)/2

		fmt.println(rl.GetScreenWidth(), len(c_str), label_x)
		rl.GuiLabel(rl.Rectangle{label_x, 200, label_len, 60}, c_str)

		rl.EndDrawing()
	}
	//fmt.println(scale, width, height, cur_text_size, new_text_size)
}
```