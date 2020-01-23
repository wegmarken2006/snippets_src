# Video Capture

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

//currently visibily slower than Python

//[dependencies]
//camera_capture = "0.5.0"
//minifb = "0.15.3"
//image = "0.22.4"

use image::{imageops, DynamicImage, RgbImage};
use minifb::{Key, MouseButton, MouseMode, Scale, Window, WindowOptions};

const WIDTH: usize = 200;
const HEIGHT: usize = 200;

fn main() {
    let cam = camera_capture::create(0).expect("Camera create error");
    let mut cam_iter = cam.fps(5.0).unwrap().start().unwrap();
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
        //Resize to WIDTH, HEIGHT
        let img_r = RgbImage::from_vec(width, height, img.to_vec()).unwrap();
        let img_d = DynamicImage::ImageRgb8(img_r);
        let img_d_resized = img_d.resize_exact(WIDTH as u32, HEIGHT as u32, imageops::Nearest);

        let u32_buffer: Vec<u32> = img_d_resized
            .raw_pixels()
            .chunks(3)
            .map(|v| ((v[0] as u32) << 16) | ((v[1] as u32) << 8) | v[2] as u32)
            .collect();

        window
            .update_with_buffer(&u32_buffer, WIDTH, HEIGHT)
            .expect("Error on update");
    }
}
```