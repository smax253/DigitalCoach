import classNames from "classnames";
import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export default function Checkbox(props: Props) {
  return (
    <input {...props} type="checkbox" className={classNames(props.className)} />
  );
}
