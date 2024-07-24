import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import StudentList from './features/student/ListStudent';
import StudentDetails from './features/student/DetailStudent';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/students" element={<StudentList />} />
          <Route path="/students/:id" element={<StudentDetails />} />
      </Routes>
    </div>
  );
}

export default App;
