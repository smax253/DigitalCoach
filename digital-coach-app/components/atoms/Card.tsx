import classNames from "classnames";
import { PropsWithChildren } from "react";
import styles from "./Card.module.scss";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  title?: string;
  multiline?: boolean;
}

export default function Card(props: PropsWithChildren<Props>) {

  const { title, className, multiline, ...rest } = props;

  return (
    <section className={classNames(multiline ? styles.CardMulti : styles.Card, className)} {...rest}>
      {title && <p className={styles.Cardtitle}>{title}</p>}
      {props.children}
    </section>
  );
}
