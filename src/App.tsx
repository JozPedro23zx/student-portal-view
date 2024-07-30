import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <div className="App" style={{display: "flex", justifyContent: "center" }}>
      <Routes>
          <Route path="/students" element={<StudentList />} />
          <Route path="/students/:id" element={<StudentDetails />} />
          <Route path="/students/create" element={<StudentCreate />} />
          <Route path="/students/edit/:id" element={<StudentUpdate />} />

          <Route path="/classrooms" element={<ListClassRoom />} />
          <Route path="/classrooms/create" element={<CreateClassRoom />} />
          <Route path="/classrooms/edit/:id" element={<UpdateClassRoom />} />

          <Route path="/enrollments/create/:id" element={<CreateEnrollment />} />
          <Route path="/enrollments/edit/:id" element={<UpdateEnrollment />} />

          <Route path="/teachers" element={<TeacherList />} />
          <Route path="/teachers/:id" element={<TeacherDetails />} />
          <Route path="/teachers/create" element={<TeacherCreate />} />
          <Route path="/teachers/edit/:id" element={<TeacherUpdate />} />
      </Routes>
    </div>
  );
}

export default App;
