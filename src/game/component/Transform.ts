//
type Vec2Props = {
  x?: number;
  y?: number;
};

function Vec2(pos?: Vec2Props, defaultVal = 0) {
  //
  if (!pos) {
    return { x: defaultVal, y: defaultVal };
  }

  return {
    x: pos.x || defaultVal,
    y: pos.y || defaultVal,
  };
}

type TransformProps = {
  position?: Vec2Props;
  rotation?: Vec2Props;
  scale?: Vec2Props;
};

export default function Transform(comp: TransformProps) {
  //
  return {
    position: Vec2(comp.position),
    rotation: Vec2(comp.rotation),
    scale: Vec2(comp.scale, 1),
  };
}
