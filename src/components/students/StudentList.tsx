import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchStudents, deleteStudent } from "../../redux/studentSlice";
import { Link } from "react-router-dom";
import SearchBar from "../common/SearchBar";
import axios from "../../api/axiosConfig";

const StudentList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { students, loading } = useAppSelector((state) => state.student);
  const [localStudents, setLocalStudents] = useState<typeof students>([]);
  const [searching, setSearching] = useState(false);
  const [networkError, setNetworkError] = useState(false);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    if (!searching) setLocalStudents(students);
  }, [students, searching]);

  const handleSearch = async (params: Record<string, string>) => {
    const query = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v.trim() !== "")
    ).toString();

    if (query === "") {
      setSearching(false);
      dispatch(fetchStudents());
      return;
    }

    try {
      const response = await axios.get(`/students/search?${query}`);
      setLocalStudents(response.data);
      setSearching(true);
    } catch (err) {
      console.error("Search error:", err);
      setLocalStudents([]);
      setNetworkError(true);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (networkError) return <div>Network issue. Please reload the page.</div>;

  return (
    <div className="space-y-4">
      <SearchBar
        onSearch={handleSearch}
        fields={[
          { name: "name", placeholder: "Search by name" },
          { name: "course", placeholder: "Search by course" },
        ]}
      />

      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Students</h1>
        <Link
          to="/students/create"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
        >
          Create Student
        </Link>
      </div>
      {localStudents.length === 0 ? (
        <p className="px-4">0 results found on the page.</p>
      ) : (
        <table className="table-auto w-full border">
          <thead>
            <tr className="border-b">
              <th className="p-2">ID</th>
              <th className="p-2">First Name</th>
              <th className="p-2">Last Name</th>
              <th className="p-2">Courses</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {localStudents.map((st) => (
              <tr key={st.id} className="border-b">
                <td className="p-2">{st.id}</td>
                <td className="p-2">{st.firstName}</td>
                <td className="p-2">{st.lastName}</td>
                <td className="p-2 text-sm text-gray-200">
                  {st.courses && st.courses.length > 0 ? (
                    st.courses.map((c) => c.title).join(", ")
                  ) : (
                    <span className="italic text-gray-500">No courses</span>
                  )}
                </td>
                <td className="p-2 align-middle">
                  <div className="flex items-center justify-center gap-x-3">
                    <Link
                      to={`/students/${st.id}`}
                      className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                      View
                    </Link>
                    <Link
                      to={`/students/edit/${st.id}`}
                      className="px-3 py-1 text-sm font-medium text-white bg-yellow-500 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => dispatch(deleteStudent(st.id))}
                      className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
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

export default StudentList;
