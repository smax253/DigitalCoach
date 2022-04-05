import useAuthContext from "@App/lib/auth/AuthContext";
import useGetInterviewDetails from "@App/lib/interview/useFetchInterviewDetails";
import { useRouter } from "next/router";

export default function StartInterviewPage() {
  const router = useRouter();
  const { interviewId } = router.query;

  const { data, isLoading } = useGetInterviewDetails(interviewId as string);

  if (isLoading) return <div>Loading..</div>;

  return <div>StartInterviewPage - {interviewId}</div>;
}
