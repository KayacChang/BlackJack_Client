/// <reference types="react-scripts" />

type ButtonProps<T> = React.PropsWithChildren<React.HTMLAttributes<HTMLButtonElement> & T>;

type DivProps<T> = React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement> & T>;

interface Vec2 {
  x: number;
  y: number;
}

interface RenderComponent {
  type: string;
}

interface SpriteComponent extends RenderComponent {
  texture: string;
}

interface TransformComponent {
  position: Vec2;
  rotation: Vec2;
  scale: Vec2;
}
