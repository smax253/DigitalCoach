import { forwardRef, SelectHTMLAttributes } from "react";

type Props = SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, Props>(
  ({ className, children, ...props }, ref) => (
    <div className={className || ""}>
      <select ref={ref} {...props}>
        {children}
      </select>
    </div>
  )
);
Select.displayName = "Select";
