import { Children, PropsWithChildren } from "react";
import Checkbox, { CheckBoxProps } from "../atoms/Checkbox";

import styles from "./CheckboxInput.module.scss";

interface Props extends CheckBoxProps {}

export default function CheckboxInput(props: PropsWithChildren<Props>) {

  const { children, ...checkboxProps } = props;
  return (
    <div className={styles.CheckoutInput}>
      <Checkbox {...checkboxProps} />

      <span>{props.children}</span>
    </div>
  );
}
