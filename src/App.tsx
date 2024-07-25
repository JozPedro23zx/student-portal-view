import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import StudentList from './features/student/ListStudent';
import StudentDetails from './features/student/DetailStudent';
import StudentUpdate from './features/student/UpdateStudent';
import StudentCreate from './features/student/CreateStudent';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/students" element={<StudentList />} />
          <Route path="/students/:id" element={<StudentDetails />} />
          <Route path="/students/create" element={<StudentCreate />} />
          <Route path="/students/edit/:id" element={<StudentUpdate />} />
      </Routes>
    </div>
  );
}

export default App;
