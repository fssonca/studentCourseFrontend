import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchCourseById } from "../../redux/courseSlice";

const CourseDetail: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { selectedCourse, loading } = useAppSelector((state) => state.course);

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseById(Number(id)));
    }
  }, [id, dispatch]);

  if (loading || !selectedCourse)
    return <div className="text-left text-lg font-medium">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 shadow rounded text-left">
      <h1 className="text-2xl font-bold mb-2">{selectedCourse.title}</h1>
      <p className="mb-1">
        Course Code:{" "}
        <span className="font-semibold">{selectedCourse.code}</span>
      </p>
      <p className="mb-6">
        Description: {selectedCourse.description || "No description"}
      </p>

      <div className="border-t pt-4">
        <h2 className="text-lg font-semibold mb-2">Enrolled Students</h2>
        {selectedCourse.students?.length ? (
          <ul className="list-disc list-inside">
            {selectedCourse.students.map((student) => (
              <li key={student.id}>
                <span className="font-bold">{student.firstName}</span>{" "}
                {student.lastName}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400">No students enrolled.</p>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
