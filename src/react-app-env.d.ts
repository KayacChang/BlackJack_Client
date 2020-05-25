/// <reference types="react-scripts" />

type ButtonProps<T> = React.PropsWithChildren<React.HTMLAttributes<HTMLButtonElement> & T>;

type DivProps<T> = React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement> & T>;

interface RenderComponent {
  type: string;
}

interface SpriteComponent extends RenderComponent {
  texture: string;
}
