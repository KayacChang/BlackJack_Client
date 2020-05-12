/// <reference types="react-scripts" />

type ButtonProps<T> = React.PropsWithChildren<
  React.HTMLAttributes<HTMLButtonElement> & T
>;

type DivProps<T> = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement> & T
>;
