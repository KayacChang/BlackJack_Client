import { PropsWithChildren, HTMLProps } from "react";
declare type Props = PropsWithChildren<HTMLProps<HTMLCanvasElement>>;
export default function Canvas({ children, ...props }: Props): JSX.Element;
export {};
