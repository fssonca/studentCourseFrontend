import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  createStudent,
  updateStudent,
  fetchStudentById,
} from "../../redux/studentSlice";

const StudentForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedStudent, loading } = useAppSelector((state) => state.student);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(fetchStudentById(Number(id)));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedStudent && id) {
      setFirstName(selectedStudent.firstName);
      setLastName(selectedStudent.lastName);
    }
  }, [selectedStudent, id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const studentData = { firstName, lastName };

    if (id) {
      dispatch(updateStudent({ id: Number(id), ...studentData })).then(() =>
        navigate("/students")
      );
    } else {
      dispatch(createStudent(studentData)).then(() => navigate("/students"));
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto p-6 shadow rounded text-left">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium">First Name</label>
          <input
            type="text"
            className="border w-full p-2 rounded"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Last Name</label>
          <input
            type="text"
            className="border w-full p-2 rounded"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {id ? "Update" : "Create"} Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
