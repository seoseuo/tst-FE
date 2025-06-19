import { Test } from "./test";

export interface Question {
  questionId: number;
  testDTO: Test;
  questionContent: string;
  isDelete: number;
}
