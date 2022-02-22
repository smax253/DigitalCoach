import classNames from "classnames";
import React from "react";

export interface CheckBoxProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export default function Checkbox(props: CheckBoxProps) {
  return (
    <input {...props} type="checkbox" className={classNames(props.className)} />
  );
}
