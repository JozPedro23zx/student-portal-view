import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetClassRoomQuery, useGetEnrollmentQuery, useGetOneStudentQuery } from './studentSlice';
import { CircularProgress } from '@mui/material';
//import './StudentDetails.css'; // Certifique-se de criar este arquivo para estilizar o componente

const StudentDetails = () => {
  const id = useParams().id as string;
  const { data: student, isLoading, isError, error } = useGetOneStudentQuery({ id });
  const { data: enrollment, isLoading: enrollmentLoading} = useGetEnrollmentQuery({ id });
  const classId = enrollment?.class_id;
  const { data: classRoom, isLoading: classRoomLoading} = useGetClassRoomQuery({ id: classId || undefined });

  if (isLoading || enrollmentLoading || classRoomLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <div>{error.toString()}</div>;
  }

  if (!student) {
    return <div>Student not found</div>;
  }

  return (
    <div className="student-details">
      <div className="student-photo">Photo</div>
      <div className="student-info">
        <p>Full Name: {student.first_name} {student.last_name}</p>
        <p>Phone Number: {student.phone_number}</p>
        <p>Date of Birth: {new Date(student.date_of_birth).toLocaleDateString()}</p>
        <p>Address: {student.address}</p>
        <p>Register date: {new Date(student.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="student-class-info">
        <p>Class: {classRoom ? classRoom.grade_level : "---"}</p>
        <p>Enrollment Date: {
            enrollment ?
            new Date(enrollment.enrollment_date).toLocaleDateString() :
            "---"}</p>
        <p>Status: {enrollment ? enrollment.status : "---"}</p>
      </div>
      <div className="student-subjects">
        <p>English</p>
        <p>History</p>
        <p>Science</p>
        <p>Math</p>
        <p>Geography</p>
      </div>
      <div className="student-actions">
        <button>Edit Data</button>
        <button>Edit Enrollment</button>
        <button className="delete">Delete</button>
      </div>
    </div>
  );
};

export default StudentDetails;
