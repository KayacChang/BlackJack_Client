# Transform

The Transform component determines the Position, Rotation, and Scale of each object in the scene.
The position, rotation and scale values of a Transform are measured relative to the Transform’s parent.
If the Transform has no parent, the properties are measured in world space.

```json
{
  "transform": {
    "position": {
      "x": 0,
      "y": 0
    },
    "rotation": {
      "x": 0,
      "y": 0
    },
    "scale": {
      "x": 0,
      "y": 0
    }
  }
}
```

### Properties

| Property | Function                                                               |
| -------- | ---------------------------------------------------------------------- |
| Position | Position of the Transform in X, Y coordinates                          |
| Rotation | Rotation of the Transform around the X, Y axes, measured in degrees    |
| Scale    | Scale of the Transform along X, Y axes. Value “1” is the original size |
