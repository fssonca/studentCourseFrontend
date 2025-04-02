import axios from "./axiosConfig";
import { Student } from "../types/Student";

export const getAll = () => axios.get<Student[]>("/students");

export const getById = (id: number) => axios.get<Student>(`/students/${id}`);

export const create = (payload: Omit<Student, "id" | "courses">) =>
  axios.post<Student>("/students", payload);

export const update = (id: number, payload: Partial<Student>) =>
  axios.put<Student>(`/students/${id}`, payload);

export const remove = (id: number) => axios.delete(`/students/${id}`);

export const enrollInCourse = (enrollment: {
  studentId: number;
  courseId: number;
}) =>
  axios.post("/enrollments", null, {
    params: enrollment,
  });
