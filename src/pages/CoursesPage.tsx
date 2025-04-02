import React from "react";
import { Routes, Route } from "react-router-dom";
import CourseList from "../components/courses/CourseList";
import CourseDetail from "../components/courses/CourseDetail";
import CourseForm from "../components/courses/CourseForm";

const CoursesPage: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CourseList />} />
      <Route path=":id" element={<CourseDetail />} />
      <Route path="create" element={<CourseForm />} />
      <Route path="edit/:id" element={<CourseForm />} />
    </Routes>
  );
};

export default CoursesPage;
