import { forwardRef, InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const TextField = forwardRef<HTMLInputElement, Props>(
  ({ ...props }, ref) => <input ref={ref} {...props} />
);
TextField.displayName = "TextField";
