import { SecurityQuestions } from "./security";

export class UserProfile {
  id:number;
  firstName: string;
  lastName: string;
  email: string;
  contact: number;
  dob: any;
  learnerRole:boolean;
  adminRole:boolean;
  trainerRole:boolean;
  bio: string;
  skill: string;
  security = new SecurityQuestions();
}
