# LiDAR Simultaneous Location and Mapping (SLAM)

Import an external JSON file as an array of objects.

## Parameters

Numerical values correlate with pixels on the screen. X and Y axes indicate initial points from distance. `Length` is how long (in px) the distance between a start and end point will be. `Angle` accounts for any incline between an initial point and the end point of distance set. Note: angle measurements are in *radians*.


Example:

```json
[
    {
        "x-axis": 80,
        "y-axis": 220,
        "length": 75,
        "angle": 1.57079632679
    }
]
```
The initial point will start at `(80, 220)`, and the last point will end 75 pixels directly above the initial point because the angle is ~1.5708 (~pi/2) and it is pointing upwards.


