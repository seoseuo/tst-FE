import { Question } from "./question";

export interface Choice {
  choiceId: number;
  questionDTO: Question;
  choiceContent: string;
  styleId: number;
  isDelete: number;
}
