import { Answer } from "./asnwer";

export class Question{
    question: string;
    answers: Array<Answer>;
    note?: string;
    type: number;
}
