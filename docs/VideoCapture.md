# Video Capture

## Python
```python

#pip install opencv-python
import cv2

WINDOW_NAME = 'image'

def on_click(event, x, y, flags, param):
    global click_exit
    if event == cv2.EVENT_LBUTTONDOWN:
        click_exit = True

cap = cv2.VideoCapture(0)
cv2.namedWindow(WINDOW_NAME,cv2.WINDOW_NORMAL)
cv2.resizeWindow(WINDOW_NAME, 200,200)
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