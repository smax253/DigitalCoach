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
import { DocumentReference } from "firebase/firestore";
import { IInterviewAttributes } from "@App/lib/interview/models";
import AnswerService from "@App/lib/answer/AnswerService";
import QuestionSetsService from "@App/lib/questionSets/QuestionSetsService";

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

    const interviewsCollectionRef = (
      await Promise.all([
        ...addInterviewCollection,
        ...addUserCollection,
        ...addQuestionCollection,
      ])
    ).slice(
      0,
      addInterviewCollection.length
    ) as DocumentReference<IInterviewAttributes>[];

    const questions = await QuestionService.getAllQuestions();

    const addQuestionSets = new Array(8).fill(0).map((_, idx) => {
      const questionSet = {
        title: "Question Set " + idx,
        description: "Description " + idx,
        questions: [
          questions.docs[getRandomInt(questions.docs.length)].id,
          questions.docs[getRandomInt(questions.docs.length)].id,
          questions.docs[getRandomInt(questions.docs.length)].id,
          questions.docs[getRandomInt(questions.docs.length)].id,
          questions.docs[getRandomInt(questions.docs.length)].id,
        ],
        isFeatured: idx < 5,
      };

      return QuestionSetsService.createQuestionSet(questionSet);
    });

    const addInterviewQuestions = interviewsCollectionRef
      .map((interviewDocRef) =>
        new Array(5).fill(null).map(async () => {
          const question = questions.docs[getRandomInt(questions.docs.length)],
            questionAttributes = {
              timeLimit: 30 * getRandomInt(20),
              retries: getRandomInt(3, 1),
            };

          return InterviewQuestionService.addQuestion(
            { gid: question.id, ...question.data() },
            questionAttributes,
            interviewDocRef
          );
        })
      )
      .flat();

    await Promise.all([...addQuestionSets, ...addInterviewQuestions]);

    const questionsRef =
      await InterviewQuestionService.getAllInterviewQuestions();

    await Promise.all(
      questionsRef.docs
        .map((questionRef) => {
          const question = questionRef.data();
          
          return new Array(question.retries).fill(null).map((_, i) =>
            AnswerService.addAnswer(questionRef.ref, {
              videoUrl: "Number 1 bullshit man",
              isSubmission: i === 0 ? true : false,
            })
          )
        })
        .flat()
    );
    await Promise.all(questionsRef.docs.map((questionSnapshot) => {
      return InterviewQuestionService.scoreQuestion(questionSnapshot.ref, Math.random());
    }))

    res.status(200).json({
      message: `Finished seeding in ${Date.now() - start}ms`,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
}
