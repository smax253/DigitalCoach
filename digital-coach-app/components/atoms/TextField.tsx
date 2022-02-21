import classNames from "classnames";
import { forwardRef, InputHTMLAttributes } from "react";

import styles from "./TextField.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
}

export const TextField = forwardRef<HTMLInputElement, Props>(
  ({ ...props }, ref) => {
    return (
      <div className={classNames(styles.TextField, props.className)}>
        {props.title && (
          <span className={styles.TextField_title}>{props.title}</span>
        )}
        <input className={styles.TextField_input} ref={ref} {...props} />
      </div>
    );
  }
);
TextField.displayName = "TextField";
