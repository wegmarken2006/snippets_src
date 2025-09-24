# Video Capture

## Flutter
```dart

//dependencies:
//  camera: ^0.5.7+3
import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'dart:async';

List<CameraDescription> cameras;
double sbHeight = 0; //status bar heigth

Future<void> main() async {
  // Ensure that plugin services are initialized so that `availableCameras()`
  // can be called before `runApp()`
  WidgetsFlutterBinding.ensureInitialized();

  cameras = await availableCameras();
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  _CameraAppState createState() => _CameraAppState();
}

class _CameraAppState extends State<MyApp> {
  CameraController _controller;
  Future<void> _initializeControllerFuture;
  //var _imageBytes;
  static const double WIDTH = 224;
  static const double HEIGHT = 224;
  static const double SB_HEIGHT = 10; //? MediaQuery seems to return 0
    
  @override
  void initState() {
    super.initState();
    // To display the current output from the camera,
    // create a CameraController.
    _controller = CameraController(
      // Get a specific camera from the list of available cameras.
      cameras[0],
      // Define the resolution to use.
      ResolutionPreset.medium,
    );

    // Next, initialize the controller. This returns a Future.
    _initializeControllerFuture = _controller.initialize();
    
  }

  @override
  void dispose() {
    _controller?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    var appBar = AppBar(title: Text('Cam - draw') );
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: appBar,
        body: FutureBuilder<void>(
          future: _initializeControllerFuture,
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.done) {
              // If the Future is complete, display the preview.

              _controller.startImageStream((CameraImage img) {
                //_imageBytes = img.planes[0].bytes;
              });
              var _abHeight = appBar.preferredSize.height;
              var _height = MediaQuery.of(context).size.height;
              var _width = MediaQuery.of(context).size.width;
              return Container(
                  margin: EdgeInsets.only(top: 10),
                  child: Stack(
                    alignment: Alignment.centerRight,
                    children: <Widget>[
                      OverflowBox(
                        maxHeight: WIDTH,
                        maxWidth: HEIGHT,
                        child: CameraPreview(_controller),
                      ),
                      //Draw a box at 0, 0 relative to the image
                      Positioned(
                        left: (_width - WIDTH) / 2 + 0,
                        top: (_height - HEIGHT) / 2  - (_abHeight - SB_HEIGHT) + 0,
                        width: 20,
                        height: 30,
                        child: Container(
                          padding: EdgeInsets.only(top: 5.0, left: 5.0),
                          decoration: BoxDecoration(
                            border: Border.all(
                              color: Color.fromRGBO(255, 0, 0, 1.0),
                              width: 3.0,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ));
            } else {
              // Otherwise, display a loading indicator.
              return Center(child: CircularProgressIndicator());
            }
          },
        ),
      ),
    );
  }
}
```

## Odin
```go

package main
// get c bindings from https://github.com/friolator/OpenCV-C
// may need to change opencv version
// Linux: install opencv, put libOpenCVC.so where the .odin file is
// Windows: put OpenCVC.lib, OpenCVC.dll and the opencv dll (like opencv_world452.dll)
// where the .odin file is

import "core:dynlib"
import "core:fmt"
import "core:c/libc"
import "core:c"

when ODIN_OS == .Linux {
	foreign import cv "libOpenCVC.so"
} else when ODIN_OS == .Windows {
	foreign import cv "OpenCVC.lib"
}

ColorConversionCodes :: enum {
	CVC_COLOR_RGB2GRAY = 7,
}

@(default_calling_convention = "c", link_prefix = "CVC")
foreign cv {
	imshow :: proc (windowName: cstring, image: rawptr) ---
	waitKey :: proc (delay: i32) -> i32 ---
	destroyAllWindows :: proc () ---
	MatFree :: proc (mat: rawptr) ---
	imread :: proc (filename: cstring, flags: i32) -> rawptr ---
	VideoCaptureCreateWithIndex :: proc "c" (index: i32) -> rawptr ---
	MatCreate :: proc () -> rawptr ---
	VideoCaptureRead :: proc (video_capture: rawptr, image: rawptr) -> bool ---
	cvtColor :: proc (src: rawptr, dst: rawptr, code: i32, dstCn: i32) ---
}

main :: proc() {
	library_path: string
	if ODIN_OS == .Linux {
		library_path = "libs/libOpenCVC.so"
	
		library, ok := dynlib.load_library(library_path)
		if !ok {
			fmt.eprintln(dynlib.last_error())
			return
		}
	}
	video_stream := VideoCaptureCreateWithIndex(0)

	for {
		frame := MatCreate()
		if VideoCaptureRead(video_stream, frame) {
			gray := MatCreate()
			cvtColor(frame, gray, i32(ColorConversionCodes.CVC_COLOR_RGB2GRAY), 0)
			imshow("Camera", frame)
			ch := waitKey(10)
			MatFree(gray)
			if ch != -1 {
				break
			}
		}
		MatFree(frame)
	}
	destroyAllWindows()
}
```

## Python
```python

#pip install opencv-python
import cv2

WINDOW_NAME = 'image'
WIDTH = 200
HEIGHT = 200


def on_click(event, x, y, flags, param):
    global click_exit
    if event == cv2.EVENT_LBUTTONDOWN:
        click_exit = True

cap = cv2.VideoCapture(0)
cv2.namedWindow(WINDOW_NAME,cv2.WINDOW_NORMAL)
cv2.resizeWindow(WINDOW_NAME, WIDTH, HEIGHT)
cv2.setMouseCallback(WINDOW_NAME, on_click)

while True:
    global click_exit
    click_exit = False

    ret, frame = cap.read()
    cv2.imshow(WINDOW_NAME, frame)
    ch = cv2.waitKey(10) 
    if ch != -1 or click_exit:
        break;

cap.release()
cv2.destroyAllWindows()
```

## Rust
```rust

//compile in release for good performance
//stream video with simple shapes overlay 

//[dependencies]
//camera_capture = "0.5.0"
//minifb = "0.15.3"
//image = "0.22.4"
//imageproc = "0.19.2"

use image::{imageops, DynamicImage, ImageBuffer, Rgb, RgbImage};
use minifb::{Key, Window, WindowOptions};
use imageproc::drawing::{draw_line_segment_mut, draw_hollow_rect_mut};
use imageproc::rect::{Rect};

const WIDTH: usize = 200;
const HEIGHT: usize = 200;

fn main() {
    let cam = camera_capture::create(0).expect("Camera create error");
    //let mut cam_iter = cam.fps(0.5).unwrap().start().unwrap();
    let mut cam_iter = cam.start().unwrap();
    let mut window = Window::new(
        "image, click or press ESC to exit",
        WIDTH,
        HEIGHT,
        WindowOptions {
            ..WindowOptions::default()
        },
    )
    .expect("Error opening window");
    while window.is_open() && !window.is_key_down(Key::Escape) {
        let img = cam_iter.next().unwrap();
        let (width, height) = img.dimensions();
        //Resize to WIDTH, HEIGHT -> a DynamicImage is needed
        let img_r = RgbImage::from_vec(width, height, img.to_vec()).unwrap();
        let img_d = DynamicImage::ImageRgb8(img_r);
        let img_d_resized = img_d.resize_exact(WIDTH as u32, HEIGHT as u32, imageops::Nearest);

        //To draw pixels, an ImageBuffer is needed back
        let mut img_g_resized =
            ImageBuffer::from_raw(WIDTH as u32, HEIGHT as u32, img_d_resized.raw_pixels()).unwrap();
        draw_line_segment_mut(&mut img_g_resized, (10.0, 10.0), (50.0, 50.0), Rgb([0, 255, 0]));
        draw_hollow_rect_mut(&mut img_g_resized, Rect::at(100, 100).of_size(20, 30), Rgb([255, 0, 0]));
        //

        let u32_buffer: Vec<u32> = img_g_resized
            .chunks(3)
            .map(|v| ((v[0] as u32) << 16) | ((v[1] as u32) << 8) | v[2] as u32)
            .collect();

        window
            .update_with_buffer(&u32_buffer, WIDTH, HEIGHT)
            .expect("Error on update");
    }
}
```