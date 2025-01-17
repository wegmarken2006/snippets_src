# Face Detection

## Python
```python


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
//rustface = "0.1.2"

use image::GrayImage;
use image::{imageops, DynamicImage, ImageBuffer, Rgb, RgbImage};
use imageproc::drawing::{draw_hollow_rect_mut};
use imageproc::rect::Rect;
use minifb::{Key, Window, WindowOptions};
use rustface::{Detector, FaceInfo, ImageData};

const WIDTH: usize = 200;
const HEIGHT: usize = 200;

fn main() {
    let mut detector = rustface::create_detector("seeta_fd_frontal_v1.0.bin").unwrap();
    detector.set_min_face_size(20);
    detector.set_score_thresh(2.0);
    detector.set_pyramid_scale_factor(0.8);
    detector.set_slide_window_step(4, 4);

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

        let faces = detect_faces(&mut *detector, &img_d_resized.to_luma());

        for face in faces {
            let bbox = face.bbox();
            let rect = Rect::at(bbox.x(), bbox.y()).of_size(bbox.width(), bbox.height());

            draw_hollow_rect_mut(&mut img_g_resized, rect, Rgb([255, 0, 0]));
        }

        let u32_buffer: Vec<u32> = img_g_resized
            .chunks(3)
            .map(|v| ((v[0] as u32) << 16) | ((v[1] as u32) << 8) | v[2] as u32)
            .collect();

        window
            .update_with_buffer(&u32_buffer, WIDTH, HEIGHT)
            .expect("Error on update");
    }
}

fn detect_faces(detector: &mut dyn Detector, gray: &GrayImage) -> Vec<FaceInfo> {
    let (width, height) = gray.dimensions();
    let mut image = ImageData::new(gray.as_ptr(), width, height);
    let faces = detector.detect(&mut image);
    faces
}
```