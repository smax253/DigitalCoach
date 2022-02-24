import InterviewService from "@App/lib/interview/InterviewService";
import { IBaseInterview } from "@App/lib/interview/models";
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import fs from "fs";

describe("InterviewService", () => {
  let testEnv: RulesTestEnvironment;

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      firestore: {
        rules: fs.readFileSync("firestore.rules", "utf8"),
      },
    });
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  describe("create", () => {
    it("adds a new interview to the collections", async () => {
      const bobby = testEnv.authenticatedContext("bobby");

      const interview: IBaseInterview = { title: "Kanopy Labs Interview" };
      await assertSucceeds(InterviewService.create("bobby", interview));
    });
  });
  describe("fetchUserInterviews", () => {});
  describe("fetchInterview", () => {});
  describe("getAllInterviews", () => {});
});
