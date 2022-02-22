import classNames from "classnames";
import { PropsWithChildren } from "react";
import styles from "./Card.module.scss";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  title?: string;
}

export default function Card(props: PropsWithChildren<Props>) {
  const { title, className, ...rest } = props;

  return (
    <section className={classNames(styles.Card, className)} {...rest}>
      {title && <p className={styles.Cardtitle}>{title}</p>}
      {props.children}
    </section>
  );
}
