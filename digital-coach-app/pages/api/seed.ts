// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import AuthService from "@App/lib/auth/AuthService";
import UserBuilder from "@App/lib/user/UserBuilder";
import UserService from "@App/lib/user/UserService";
import { IBaseInterviewQuestionAttributes } from "@App/lib/interview/models";
import { IBaseQuestionAttributes, TSubject } from "@App/lib/question/models";
import QuestionService from "@App/lib/question/QuestionService";

const questions: { subject: TSubject; questions: string[] } = {
  subject: "Business Accounting and Analytics",
  questions: [
    "Are you interested in public accounting, private, or government?",
    "Do you consider yourself to be detail-oriented? If so, give me an example of a time when your attention to detail was critical.",
    "Tell me about a time when you had to work as part of a team.",
    "What characteristics make accounting a good career fit for you?",
    "Analyze a personal budget and find areas where you can cut expenses in order to pay a tax debt.",
    "Are you willing to travel for work?",
    "Aside from mathematical efficiency, what do you think is the most important skill set of a successful accountant?",
    "Describe a time that you had to present financial data to individuals without a financial background.",
    "Describe a time when you have worked under intense pressure.",
    "Describe how your past experience will assist you during the busy tax season? ||",
    "Describe your computer skills, including any accounting software programs. Please rank your ability as Advanced, Intermediate or Basic.",
    "Discuss examples of accounting reports you have prepared.",
    "Do you plan to pursue an accounting designation after graduation? If not, why not? If so, which one and why?",
    "Do you plan to sit for the CPA exam? If so, are you eligible and when will you sit for the exam?",
    "Identify tax forms such as T5, T3 and T1.",
    "Identify tax forms such as T5, T3 and T1.",
    "If I buy a piece of equipment, walk me through the impact on the three financial statements.",
    "If you are interested in public accounting, are you more interested in tax or audit?",
    "If you were working on an audit for a major client and noticed several errors in the company's reports, how would you communicate this to a project leader who is known to have a short temper and little tolerance for disagreement?",
    "Provide me with an example of your problem-solving ability.",
    "Tell me about your experience in reconciliation.",
    "Tell me of a situation where you handled a large volume of data.",
    "What accounting skills do you have and how can you apply them to this position?",
    "What are some of your strengths that will allow you to endure the frantic demands of tax season or a difficult audit?",
    "What areas of accounting are you most interested in and why?",
    "What aspect of accounting do you dislike most?",
    "What characteristics do you think a good account should have?",
    "What do you do for fun?",
    "What do you do outside of work?",
    "What do you know about CASB?",
    "What do you know about the process and requirements of becoming a CA, CGA and CMA ?",
    "What do you know about the three professional accounting designations in Canada ( CA.CGA.CMA ) ?",
    "What do you think is the biggest challenge facing the accounting profession at this time and how are you prepared to handle it?",
    "What is the difference between accounts and finance?",
    "What is the difference between cost accounting and financial accounting?",
    "What is your experience managing accounts receivable? Accounts payable?",
    "What is your favorite extracurricular activity?",
    "What is your favorite hobby?",
    "What kind of work environment and job activities do junior accountants have?",
    "What steps will you have to take to become a certified public accountant?",
    "What type of an accounting position would you would like to be working in five years after university graduation ?",
    "What type of an accounting position would you would like to be working in five years after university graduation?",
    "What was the most challenging accounting task you had to accomplish in your career?",
    "Who else are you interviewing with?",
    "Whom do you most admire?",
    "Why are you interested in our firm?",
    "Why are you interested in pursuing a career in accounting?",
    "Why did you choose to study accounting?	",
    "Why do you want to be a CA?",
  ],
};

export default async function seed(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  try {
    const userCredentials = await Promise.all([
      AuthService.signup("ming@test.com", "password"),
      AuthService.signup("appu@test.com", "password"),
      AuthService.signup("suzy@test.com", "password"),
      AuthService.signup("mike@test.com", "password"),
      AuthService.signup("max@test.com", "password"),
      AuthService.signup("hamzah@test.com", "password"),
    ]);

    console.log("Successfully signed up users");

    await Promise.all(
      userCredentials.map(({ user }) =>
        UserService.add(
          new UserBuilder()
            .withId(user.uid)
            .with({
              email: user.email!,
              name: user.email?.split("@")[0],
            })
            .build()
        )
      )
    );

    console.log("Successfully seeded users collection");

    await Promise.all(
      questions.questions.map((question) =>
        QuestionService.addQuestion({ subject: questions.subject, question })
      )
    );

    console.log("Successfully seeded questions collection");

    res.status(200).json({ message: "Finished seeding firestore & auth" });
  } catch (error) {
    res.status(500).json({ error });
  }
}
