import React from 'react';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import StudentList from './features/student/ListStudent';
import StudentDetails from './features/student/DetailStudent';
import StudentUpdate from './features/student/UpdateStudent';
import StudentCreate from './features/student/CreateStudent';
import { CreateEnrollment } from './features/enrollment/CreateEnrollment';
import { UpdateEnrollment } from './features/enrollment/UpdateEnrollment';
import { ListClassRoom } from './features/classroom/ListClassRoom';
import { CreateClassRoom } from './features/classroom/CreateClassRoom';
import { UpdateClassRoom } from './features/classroom/UpdateClassRoom';
import TeacherCreate from './features/teacher/CreateTeacher';
import TeacherDetails from './features/teacher/DetailTeacher';
import TeacherList from './features/teacher/ListTeacher';
import TeacherUpdate from './features/teacher/UpdateTeacher';
import AdminRoute from './components/AdminRouter';
import Unauthorized from './components/Unauthorized';
import { NavBar } from './components/NavBar';

function App() {
  return (
    <div>
      <NavBar />
      <div className="App" style={{ display: "flex", justifyContent: "center" }}>
        <Routes>
          <Route path="/students" element={<AdminRoute><StudentList /></AdminRoute>} />
          <Route path="/students/:id" element={<StudentDetails />} />
          <Route path="/students/create" element={<AdminRoute><StudentCreate /> </AdminRoute>} />
          <Route path="/students/edit/:id" element={<AdminRoute><StudentUpdate /></AdminRoute>} />

          <Route path="/classrooms" element={<AdminRoute><ListClassRoom /></AdminRoute>} />
          <Route path="/classrooms/create" element={<AdminRoute><CreateClassRoom /></AdminRoute>} />
          <Route path="/classrooms/edit/:id" element={<AdminRoute><UpdateClassRoom /></AdminRoute>} />

          <Route path="/enrollments/create/:id" element={<AdminRoute><CreateEnrollment /></AdminRoute>} />
          <Route path="/enrollments/edit/:id" element={<AdminRoute><UpdateEnrollment /></AdminRoute>} />

          <Route path="/teachers" element={<AdminRoute><TeacherList /></AdminRoute>} />
          <Route path="/teachers/:id" element={<AdminRoute><TeacherDetails /></AdminRoute>} />
          <Route path="/teachers/create" element={<AdminRoute><TeacherCreate /></AdminRoute>} />
          <Route path="/teachers/edit/:id" element={<AdminRoute><TeacherUpdate /></AdminRoute>} />

          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
