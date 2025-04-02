import axios from "./axiosConfig";
import { Course } from "../types/Course";

export const getAll = () => axios.get<Course[]>("/courses");

export const getById = (id: number) => axios.get<Course>(`/courses/${id}`);

export const create = (course: Omit<Course, "id" | "students">) =>
  axios.post<Course>("/courses", course);

export const update = (id: number, course: Partial<Course>) =>
  axios.put<Course>(`/courses/${id}`, course);

export const remove = (id: number) => axios.delete(`/courses/${id}`);
