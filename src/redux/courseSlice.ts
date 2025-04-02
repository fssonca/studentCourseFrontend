import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Course } from "../types/Course";
import * as courseService from "../api/courseService";

interface CourseState {
  courses: Course[];
  selectedCourse?: Course;
  loading: boolean;
  error?: string;
}

const initialState: CourseState = {
  courses: [],
  selectedCourse: undefined,
  loading: false,
  error: undefined,
};

export const fetchCourses = createAsyncThunk("courses/fetchAll", async () => {
  const res = await courseService.getAll();
  return res.data;
});

export const fetchCourseById = createAsyncThunk(
  "courses/fetchById",
  async (id: number) => {
    const res = await courseService.getById(id);
    return res.data;
  }
);

export const createCourse = createAsyncThunk(
  "courses/create",
  async (course: Omit<Course, "id" | "students">) => {
    const res = await courseService.create(course);
    return res.data;
  }
);

export const updateCourse = createAsyncThunk(
  "courses/update",
  async (course: Course) => {
    const res = await courseService.update(course.id, course);
    return res.data;
  }
);

export const deleteCourse = createAsyncThunk(
  "courses/delete",
  async (id: number) => {
    await courseService.remove(id);
    return id;
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    clearSelectedCourse(state) {
      state.selectedCourse = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.loading = false;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.selectedCourse = action.payload;
        state.loading = false;
      })

      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload);
        state.loading = false;
      })

      .addCase(updateCourse.fulfilled, (state, action) => {
        const index = state.courses.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
        state.loading = false;
      })

      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter((c) => c.id !== action.payload);
        state.loading = false;
      });
  },
});

export const { clearSelectedCourse } = courseSlice.actions;
export default courseSlice.reducer;
