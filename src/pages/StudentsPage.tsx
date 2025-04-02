import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentList from "../components/students/StudentList";
import StudentDetail from "../components/students/StudentDetail";
import StudentForm from "../components/students/StudentForm";

const StudentsPage: React.FC = () => {
  return (
    <Routes>
      <Route index element={<StudentList />} />
      <Route path=":id" element={<StudentDetail />} />
      <Route path="create" element={<StudentForm />} />
      <Route path="edit/:id" element={<StudentForm />} />
    </Routes>
  );
};

export default StudentsPage;
