import { Course } from "./Course";

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  courses?: Course[];
}
