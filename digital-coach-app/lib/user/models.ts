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

export interface IBaseUserAttributes {
  avatarUrl: string;
  name: string;
  concentration: EUserConcentrations | null;
  proficiency: EUserProficiencies | null;
}

export interface IBaseUser extends IBaseUserAttributes {
  email: string;
  registrationCompletedAt: Timestamp | null;
  createdAt: Timestamp;
}

export interface IUser extends IBaseUser {
  id: string;
}
