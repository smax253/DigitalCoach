import { Timestamp } from "firebase/firestore";

export enum EUserConcentrations {
  Technology = "Technology",
  Marketing = "Marketing",
  Finance = "Finance",
  Sales = "Sales",
  HR = "HR",
  Legal = "Legal",
  Operations = "Operations",
  Engineering = "Engineering",
  Product = "Product",
  Design = "Design",
}

export enum EUserProficiencies {
  Student = "Student",
  NewGrad = "New Grad",
  Entry = "Entry Level",
  Mid = "Mid Level",
  Late = "Late Career",
}

export interface IUserDetails {
  avatarUrl: string;
  name: string;
  concentration: EUserConcentrations;
  proficiency: EUserProficiencies;
}

export interface IUser extends IUserDetails {
  id: string;
  email: string;
  registrationCompletedAt: Timestamp;
  createdAt: Timestamp;
}
