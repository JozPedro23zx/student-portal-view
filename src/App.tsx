import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import StudentList from './features/student/ListStudent';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/students" element={<StudentList />} />
      </Routes>
    </div>
  );
}

export default App;
