import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  createCourse,
  updateCourse,
  fetchCourseById,
} from "../../redux/courseSlice";

const CourseForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedCourse, loading } = useAppSelector((state) => state.course);

  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (id) {
      console.log("Fetching course with ID:", id);
      dispatch(fetchCourseById(Number(id)));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedCourse && id) {
      setCode(selectedCourse.code);
      setTitle(selectedCourse.title);
      setDescription(selectedCourse.description || "");
    }
  }, [selectedCourse, id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const courseData = { code, title, description };

    if (id) {
      dispatch(updateCourse({ id: Number(id), ...courseData })).then(() =>
        navigate("/courses")
      );
    } else {
      dispatch(createCourse(courseData)).then(() => navigate("/courses"));
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto p-6 text-left">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium">Code</label>
          <input
            type="text"
            className="border w-full p-2 rounded"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            className="border w-full p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="border w-full p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {id ? "Update" : "Create"} Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
