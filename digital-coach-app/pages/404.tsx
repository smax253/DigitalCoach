import { useRouter } from "next/router";
import Button from "@App/components/atoms/Button";

export default function Page404() {
  const router = useRouter();

  const onClickHome = () => router.push("/");

  return (
    <div>
      <h1>404</h1>
      <span>Page not found, you done fucked up</span>
      <Button onClick={onClickHome}>Return to home</Button>
    </div>
  );
}
