import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchCourses, deleteCourse } from "../../redux/courseSlice";
import { Link } from "react-router-dom";
import SearchBar from "../common/SearchBar";
import axios from "../../api/axiosConfig";

const CourseList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { courses, loading } = useAppSelector((state) => state.course);
  const [localCourses, setLocalCourses] = useState<typeof courses>([]);
  const [searching, setSearching] = useState(false);
  const [networkError, setNetworkError] = useState(false);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    if (!searching) setLocalCourses(courses);
  }, [courses, searching]);

  const handleSearch = async (params: Record<string, string>) => {
    const query = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v.trim() !== "")
    ).toString();

    if (query === "") {
      setSearching(false);
      dispatch(fetchCourses());
      return;
    }

    try {
      const response = await axios.get(`/courses/search?${query}`);
      setLocalCourses(response.data);
      setSearching(true);
    } catch (err) {
      console.error("Search error:", err);
      setLocalCourses([]);
      setNetworkError(true);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  if (networkError) return <div>Network issue. Please reload the page.</div>;

  return (
    <div className="space-y-4">
      <SearchBar
        onSearch={handleSearch}
        fields={[
          { name: "title", placeholder: "Search by title/code" },
          { name: "student", placeholder: "Search by student name" },
        ]}
      />

      <div className="flex justify-between items-center px-4">
        <h1 className="text-xl font-bold">Courses</h1>
        <Link
          to="/courses/create"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
        >
          Create Course
        </Link>
      </div>

      {localCourses.length === 0 ? (
        <p className="px-4">0 results found on the page.</p>
      ) : (
        <table className="table-auto w-full border">
          <thead>
            <tr className="border-b">
              <th className="p-2">ID</th>
              <th className="p-2">Code</th>
              <th className="p-2">Title</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {localCourses.map((course) => (
              <tr key={course.id} className="border-b">
                <td className="p-2">{course.id}</td>
                <td className="p-2">{course.code}</td>
                <td className="p-2">{course.title}</td>
                <td className="p-2 align-middle">
                  <div className="flex items-center justify-center gap-x-3">
                    <Link
                      to={`/courses/${course.id}`}
                      className="inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                      View
                    </Link>
                    <Link
                      to={`/courses/edit/${course.id}`}
                      className="inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium text-white bg-yellow-500 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => dispatch(deleteCourse(course.id))}
                      className="inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CourseList;
