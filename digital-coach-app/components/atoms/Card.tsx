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
  const { title } = props;

  return (
    <section className={styles.Card}>
      {title && <p className={styles.Cardtitle}>{title}</p>}
      {props.children}
    </section>
  );
}
