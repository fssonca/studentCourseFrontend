import { Student } from "./Student";

export interface Course {
  id: number;
  code: string;
  title: string;
  description?: string;
  students?: Student[];
}
