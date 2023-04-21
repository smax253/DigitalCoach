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
import fs from "fs/promises";
import StorageService from "@App/lib/storage/StorageService";
import { TExperienceLevel, TQuestionType } from "@App/lib/question/models";

export default async function seed(req: NextApiRequest, res: NextApiResponse<{}>) {
  const start = Date.now();

  try {
    const userCredentials = await Promise.all([
      AuthService.signup("ming@test.com", "password"),
      AuthService.signup("appu@test.com", "password"),
      AuthService.signup("suzy@test.com", "password"),
      AuthService.signup("mike@test.com", "password"),
      AuthService.signup("max@test.com", "password"),
      AuthService.signup("hamzah@test.com", "password"),
      AuthService.signup("steven@expo.com", "password"),
    ]);
    const addQuestionCollection = questionsData.map(async (qList) =>
        qList.questions.map(
          async (question: string) =>
            await QuestionService.addQuestion({
              subject: qList.subject,
              question,
              companies: [],
              popularity: Math.floor(Math.random() * 100),
              experienceLevel: ["Entry", "Mid", "Senior", "Any"][Math.floor(Math.random() * 4)] as TExperienceLevel,
              type: ["Behavioral", "Technical", "Any"][Math.floor(Math.random() * 3)] as TQuestionType,
              keywords: question
                .toLowerCase()
                .replace(/\!|\.|\,|\'|\"|\?|\;|\:|\`|\~/g, "")
                .split(" "),
            })
        )
      ),
      addUserCollection = userCredentials.map(async ({ user }) => UserService.add(user.uid, new UserBuilder().with({ email: user.email!, name: user.email?.split("@")[0] }).build())),
      addInterviewCollection = userCredentials
        .map(({ user }, idx) =>
          new Array(getRandomInt(10)).fill(0).map((_, i) =>
            InterviewService.create(user.uid, {
              title: `Interview ${idx}-${i}`,
            })
          )
        )
        .flat();
    const interviewsCollectionRef = (await Promise.all([...addInterviewCollection, ...addUserCollection, ...addQuestionCollection])).slice(
      0,
      addInterviewCollection.length
    ) as DocumentReference<IInterviewAttributes>[];

    const users = await UserService.getAllUsers();
    const userData = users.docs.map((user) => {
      return user.id;
    });

    const questions = await QuestionService.getAllQuestions();

    const addFeaturedQuestionSets = new Array(5).fill(0).map((_, idx) => {
      const questionSet = {
        title: "Featured Question Set " + idx,
        description: "Description " + idx,
        questions: [
          questions.docs[getRandomInt(questions.docs.length)].id,
          questions.docs[getRandomInt(questions.docs.length)].id,
          questions.docs[getRandomInt(questions.docs.length)].id,
          questions.docs[getRandomInt(questions.docs.length)].id,
          questions.docs[getRandomInt(questions.docs.length)].id,
        ],
        isFeatured: true,
        createdBy: null,
      };
      return QuestionSetsService.createQuestionSet(questionSet);
    });

    const addQuestionSets = userData.map((user, idx) => {
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
        isFeatured: false,
        createdBy: user,
      };
      return QuestionSetsService.createQuestionSet(questionSet);
    });

    // const addQuestionSets = new Array(8).fill(0).map((_, idx) => {
    //   const questionSet = {
    //     title: 'Question Set ' + idx,
    //     description: 'Description ' + idx,
    //     questions: [
    //       questions.docs[getRandomInt(questions.docs.length)].id,
    //       questions.docs[getRandomInt(questions.docs.length)].id,
    //       questions.docs[getRandomInt(questions.docs.length)].id,
    //       questions.docs[getRandomInt(questions.docs.length)].id,
    //       questions.docs[getRandomInt(questions.docs.length)].id,
    //     ],
    //     isFeatured: false,
    //     createdBy: userData[getRandomInt(userData.length)],
    //   };

    //   return QuestionSetsService.createQuestionSet(questionSet);
    // });

    const addInterviewQuestions = interviewsCollectionRef
      .map((interviewDocRef) =>
        new Array(5).fill(null).map(async () => {
          const question = questions.docs[getRandomInt(questions.docs.length)],
            questionAttributes = {
              timeLimit: 30 * getRandomInt(20),
              retries: getRandomInt(3, 1),
            };

          return InterviewQuestionService.addQuestion({ gid: question.id, ...question.data() }, questionAttributes, interviewDocRef);
        })
      )
      .flat();

    await Promise.all([...addFeaturedQuestionSets, ...addQuestionSets, ...addInterviewQuestions]);

    const questionsRef = await InterviewQuestionService.getAllInterviewQuestions();

    const demoVideoFiles = ["assets/answer-1.mp4", "assets/answer-2.mp4"];

    const video = await Promise.all(demoVideoFiles.map((filePath) => fs.readFile(filePath)));

    const storageRef = await Promise.all(video.map((ref, idx) => StorageService.uploadAnswerVideo(ref, `answer-${idx}`)));

    await Promise.all(
      questionsRef.docs
        .map(async (questionRef) => {
          const question = questionRef.data();
          const uid = questionRef.ref.path.split("/")[1];

          return new Array(question.retries).fill(null).map((_, i) =>
            AnswerService.addAnswer(questionRef.ref, {
              videoUrl: storageRef[getRandomInt(storageRef.length)].ref.toString(),
              isSubmission: i === 0 ? true : false,
              userId: uid,
            })
          );
        })
        .flat()
    );

    await Promise.all(
      questionsRef.docs.map((questionSnapshot) => {
        return InterviewQuestionService.scoreQuestion(questionSnapshot.ref, Math.random());
      })
    );

    res.status(200).json({
      message: `Finished seeding in ${Date.now() - start}ms`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Error: error,
      Stack: error instanceof Error ? error.stack : undefined,
    });
  }
}
