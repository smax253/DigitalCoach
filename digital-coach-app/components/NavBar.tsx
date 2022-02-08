import Link from "next/link";
import useAuthContext from "../lib/auth/AuthContext";
import Button from "./Button";
import style from "./navbar.module.scss";
import logoutIcon from "@App/res/sidebar/logout.svg";
import Image from "next/image";
export default function NavBar() {
  const { logout } = useAuthContext();

  return (
    <div className={style.main}>
      <Link href="/">
        <a className={style.logo_text}>Digital Coach</a>
      </Link>
      <div className={style.links}>
        <Link href="/">
          <a>Dashboard</a>
        </Link>
        <Link href="/">
          <a>Start an Interview</a>
        </Link>
        <Link href="/">
          <a>Review Past Interviews</a>
        </Link>
        <Link href="/">
          <a>Resources</a>
        </Link>
        <Link href="/">
          <a>Settings</a>
        </Link>
      </div>

      <Button onClick={logout} className={style.logout}>
        <Image src={logoutIcon} alt="logout" height={20} width={20}/>
        <div>Log out</div>
      </Button>
    </div>
  );
}
