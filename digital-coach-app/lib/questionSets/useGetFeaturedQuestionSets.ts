import { useQuery } from "react-query";
import QuestionService from "../question/QuestionService";
import QuestionSetsService from "./QuestionSetsService";

export default function useGetFeaturedQuestionSets() {
  return useQuery(["featuredQuestionSets"], () =>
    QuestionSetsService.getFeaturedQuestionSets()
  );
}
