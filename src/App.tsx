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

function App() {
  return (
    <div className="App">
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
      </Routes>
    </div>
  );
}

export default App;
