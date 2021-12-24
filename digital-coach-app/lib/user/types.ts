import { Timestamp } from "firebase/firestore";

export enum UserConcentrations {
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

export enum UserProficiencies {
  Student = "Student",
  NewGrad = "New Grad",
  Entry = "Entry Level",
  Mid = "Mid Level",
  Late = "Late Career",
}

export interface UserDetails {
  avatarUrl: string;
  name: string;
  concentration: UserConcentrations;
  proficiency: UserProficiencies;
}

export interface User extends UserDetails {
  id: string;
  email: string;
  registrationCompletedAt: Timestamp;
  createdAt: Timestamp;
}
