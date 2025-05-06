import { Question } from "./question";
import { Choice } from "./choice";

export interface ShowQuestion {
  showQuestion: Question;
  questions: Question[];
  choices: Choice[];
}
