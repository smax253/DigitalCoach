import { useQuery } from "react-query";
import AnswerService from "./AnswerService";

export default function useGetAnswersByUserId(userId: string | undefined) {
  return useQuery(
    ["getAnswersByUserId"],
    () => {
      if (userId) return AnswerService.getAnswersByUserId(userId);
      else return null;
    },
    {
      enabled: !!userId,
    }
  );
}
