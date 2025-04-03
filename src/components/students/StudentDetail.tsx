import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchStudentById, enrollInCourse } from "../../redux/studentSlice";
import { fetchCourses } from "../../redux/courseSlice";

const StudentForm: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { selectedStudent, loading } = useAppSelector((state) => state.student);
  const { courses } = useAppSelector((state) => state.course);

  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [enrollmentError, setEnrollmentError] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(fetchStudentById(Number(id)));
      dispatch(fetchCourses());
    }
  }, [id, dispatch]);

  const handleEnrollInCourse = async () => {
    if (selectedCourseId) {
      const result = await dispatch(
        enrollInCourse({
          studentId: Number(id),
          courseId: Number(selectedCourseId),
        })
      );

      // Check if the thunk was rejected
      if (enrollInCourse.rejected.match(result)) {
        console.error("Enrollment error:", result.payload);
        setEnrollmentError(result.payload as string);
        return;
      }

      setEnrollmentError("");
      // Refresh student data on success
      dispatch(fetchStudentById(Number(id)));
    }
  };

  if (loading || !selectedStudent) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-lg mx-auto p-6 text-left space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          {selectedStudent.firstName} {selectedStudent.lastName}
        </h1>
        <p className="text-sm text-gray-400">
          Student ID: {selectedStudent.id}
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Assigned Courses</h2>
        {selectedStudent.courses?.length ? (
          <ul className="list-disc list-inside">
            {selectedStudent.courses.map((course) => (
              <li key={course.code}>
                <span className="font-bold">{course.code}</span> -{" "}
                {course.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400">No courses assigned.</p>
        )}
      </div>

      <div className="pt-4 border-t">
        <label htmlFor="courseSelect" className="block mb-2 font-medium">
          Assign a new course:
        </label>
        <div className="flex gap-4">
          <select
            id="courseSelect"
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 flex-1"
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
          <button
            onClick={handleEnrollInCourse}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Enroll
          </button>
        </div>
        {enrollmentError && <div className="mt-2 text-red-500">{enrollmentError}</div>}
      </div>
    </div>
  );
};

export default StudentForm;
