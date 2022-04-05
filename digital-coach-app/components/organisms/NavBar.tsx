import Link from "next/link";
import Button from "../atoms/Button";
import style from "./navbar.module.scss";
import LogoutIcon from "@mui/icons-material/Logout";
import useAuthContext from "@App/lib/auth/AuthContext";

export default function NavBar() {
  const { logout } = useAuthContext();

  return (
    <div className={style.main}>
      <Link href="/">
        <a className={style.logo_text}>Digital Coach</a>
      </Link>
      <div className={style.links}>
        <Link href="/">
          <a className={style.linksText}>Dashboard</a>
        </Link>
        <Link href="/start">
          <a className={style.linksText}>Start an Interview</a>
        </Link>
        <Link href="/past">
          <a className={style.linksText}>Review Past Interviews</a>
        </Link>
        <Link href="/resources">
          <a className={style.linksText}>Resources</a>
        </Link>
        <Link href="/profile">
          <a className={style.linksText}>Profile</a>
        </Link>
      </div>

      <Button onClick={logout} className={style.logout}>
        <LogoutIcon />
        <div>Log out</div>
      </Button>
    </div>
  );
}
