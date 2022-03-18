import { useQuery } from "react-query";
import AnswerService from "./AnswerService";

export default function useGetAnswersByUserId(userId: string | undefined) {
  return useQuery(
    ["getAnswersByUserId"],
    () => AnswerService.getAnswersByUserId(userId!),
    {
      enabled: !!userId,
    }
  );
}
