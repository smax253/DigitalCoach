// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import AuthService from "@App/lib/auth/AuthService";
import UserBuilder from "@App/lib/user/UserBuilder";
import UserService from "@App/lib/user/UserService";
import QuestionService from "@App/lib/question/QuestionService";
import InterviewService from "@App/lib/interview/InterviewService";
import questionsData from "@App/data/questions";
import getRandomInt from "@App/util/getRandomInt";
import InterviewQuestionService from "@App/lib/interviewQuestion/InterviewQuestionService";

export default async function seed(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  const start = Date.now();

  try {
    const userCredentials = await Promise.all([
      AuthService.signup("ming@test.com", "password"),
      AuthService.signup("appu@test.com", "password"),
      AuthService.signup("suzy@test.com", "password"),
      AuthService.signup("mike@test.com", "password"),
      AuthService.signup("max@test.com", "password"),
      AuthService.signup("hamzah@test.com", "password"),
    ]);

    const addQuestionCollection = questionsData.questions.map((question) =>
        QuestionService.addQuestion({
          subject: questionsData.subject,
          question,
        })
      ),
      addUserCollection = userCredentials.map(async ({ user }) =>
        UserService.add(
          user.uid,
          new UserBuilder()
            .withId(user.uid)
            .with({ email: user.email!, name: user.email?.split("@")[0] })
            .build()
        )
      ),
      addInterviewCollection = userCredentials.map(async ({ user }, idx) =>
        InterviewService.create(user.uid, { title: `Interview ${idx}` })
      );

    await Promise.all([
      ...addUserCollection,
      ...addQuestionCollection,
      ...addInterviewCollection,
    ]);

    const [questions, interviews] = await Promise.all([
      QuestionService.getAllQuestions(),
      InterviewService.getAllInterviews(),
    ]);

    const addInterviewQuestions = interviews.docs
      .map((interview) =>
        new Array(5).fill(null).map(async () => {
          const question = questions.docs[getRandomInt(questions.docs.length)],
            questionAttributes = {
              timeLimit: 30 * getRandomInt(20),
              retries: getRandomInt(3),
            };

          return InterviewQuestionService.addQuestion(
            { gid: question.id, ...question.data() },
            questionAttributes,
            interview.ref
          );
        })
      )
      .flat();

    await Promise.all(addInterviewQuestions);

    res.status(200).json({
      message: `Finished seeding in ${Date.now() - start}ms`,
      addInterviewQuestions,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
}
