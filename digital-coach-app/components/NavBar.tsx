import Link from "next/link";
import useAuthContext from "../lib/auth/AuthContext";
import Button from "./Button";
import style from "./navbar.module.css";

export default function NavBar() {
  const { logout } = useAuthContext();

  return (
    <div className={style.main}>
      <Link href="/">
        <a>Digital Coach</a>
      </Link>

      <Button onClick={logout}>Log out</Button>
    </div>
  );
}
