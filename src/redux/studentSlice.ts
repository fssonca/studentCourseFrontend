import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Student } from "../types/Student";
import * as studentService from "../api/studentService";

interface StudentState {
  students: Student[];
  selectedStudent?: Student;
  loading: boolean;
  error?: string;
}

const initialState: StudentState = {
  students: [],
  selectedStudent: undefined,
  loading: false,
  error: undefined,
};

// Thunks
export const fetchStudents = createAsyncThunk("students/fetchAll", async () => {
  const res = await studentService.getAll();
  return res.data;
});

export const fetchStudentById = createAsyncThunk(
  "students/fetchById",
  async (id: number) => {
    const res = await studentService.getById(id);
    return res.data;
  }
);

export const createStudent = createAsyncThunk(
  "students/create",
  async (student: Omit<Student, "id" | "courses">) => {
    const res = await studentService.create(student);
    return res.data;
  }
);

export const updateStudent = createAsyncThunk(
  "students/update",
  async (student: Student) => {
    const res = await studentService.update(student.id, student);
    return res.data;
  }
);

export const deleteStudent = createAsyncThunk(
  "students/delete",
  async (id: number) => {
    await studentService.remove(id);
    return id;
  }
);

export const enrollInCourse = createAsyncThunk(
  "students/enrollInCourse",
  async ({
    studentId,
    courseId,
  }: {
    studentId: number;
    courseId: number;
    status?: string;
  }) => {
    const res = await studentService.enrollInCourse({
      studentId,
      courseId,
    });
    return res.data;
  }
);

// Slice
const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    clearSelectedStudent(state) {
      state.selectedStudent = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.students = action.payload;
        state.loading = false;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.selectedStudent = action.payload;
        state.loading = false;
      })

      .addCase(createStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
        state.loading = false;
      })

      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex(
          (s) => s.id === action.payload.id
        );
        if (index !== -1) {
          state.students[index] = action.payload;
        }
        state.loading = false;
      })

      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter((s) => s.id !== action.payload);
        state.loading = false;
      })

      .addCase(enrollInCourse.fulfilled, (state, action) => {
        if (
          state.selectedStudent &&
          state.selectedStudent.id === action.payload.id
        ) {
          state.selectedStudent.courses = action.payload.courses;
        }
      });
  },
});

export const { clearSelectedStudent } = studentSlice.actions;
export default studentSlice.reducer;
