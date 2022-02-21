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
  const { title, multiline } = props;

  return (
    <section className={multiline ? styles.CardMulti : styles.Card}>
      {title && <p className={styles.Cardtitle}>{title}</p>}
      {props.children}
    </section>
  );
}
