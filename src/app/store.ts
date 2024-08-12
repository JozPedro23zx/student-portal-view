import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { studentsApiSlice } from '../features/student/studentSlice';
import { apiSlice } from '../features/api/apiSlice';
import { teacherApiSlice } from '../features/teacher/teacherSlice';
import { classroomApiSlice } from '../features/classroom/classroomSlice';
import { enrollmentApiSlice } from '../features/enrollment/enrollmentSlice';
import { gradeApiSlice } from '../features/grade/gradeSlice';
import { authSlice } from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    [studentsApiSlice.reducerPath]: studentsApiSlice.reducer,
    [teacherApiSlice.reducerPath]: teacherApiSlice.reducer,
    [classroomApiSlice.reducerPath]: classroomApiSlice.reducer,
    [enrollmentApiSlice.reducerPath]: enrollmentApiSlice.reducer,
    [gradeApiSlice.reducerPath]: gradeApiSlice.reducer,
    auth: authSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
