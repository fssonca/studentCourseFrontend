import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="my-10 flex flex-col justify-center items-center text-left px-6">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-extrabold text-blue-500 mb-4">
          Student-Course Management
        </h1>

        <p className="text-lg text-gray-300 mb-6 leading-relaxed">
          This application allows administrators to manage students and courses through an intuitive interface.
          Assign students to courses, view relationships, and maintain clean data all in one place.
          Built using <strong>React + TypeScript</strong> on the frontend, and <strong>Spring Boot</strong> on the backend.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/students"
            className="flex-1 text-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            Manage Students
          </Link>
          <Link
            to="/courses"
            className="flex-1 text-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
          >
            Manage Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
