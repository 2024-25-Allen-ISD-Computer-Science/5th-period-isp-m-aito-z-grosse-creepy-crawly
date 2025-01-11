# LiDAR Simultaneous Location and Mapping (SLAM)

Import an external JSON file as an array of objects.

## Parameters

Numerical values correlate with pixels on the screen.

For points:

```json
[
  {
    "type": "point",
    "x-axis": 32,
    "y-axis": 90
  }
]
```

For distances:

```json
[
  {
    "type": "distance",
    "x-axis": 30,
    "y-axis": 40,
    "length": 30,
    "angle": 30
  }
]
```

