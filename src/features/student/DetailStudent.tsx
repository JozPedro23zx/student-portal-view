import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteStudentMutation, useGetClassRoomQuery, useGetEnrollmentQuery, useGetOneStudentQuery } from './studentSlice';
import { Avatar, Box, Button, CircularProgress, Typography } from '@mui/material';

const StudentDetails = () => {
  const navigate = useNavigate();
  
  const id = useParams().id as string;
  const { data: student, isLoading, error } = useGetOneStudentQuery({ id });

  const studentId = student?.id;
  const { data: enrollment, isLoading: enrollmentLoading } = useGetEnrollmentQuery({ id: studentId || undefined });

  const classId = enrollment?.class_id;
  const { data: classRoom, isLoading: classRoomLoading } = useGetClassRoomQuery({ id: classId || undefined });

  const [deleteStudent] = useDeleteStudentMutation();

  if (isLoading || enrollmentLoading || classRoomLoading) {
    return <CircularProgress />;
  }

  if (!student) {
    let typeError = error as any
    return <Typography>{typeError?.data.message}</Typography>;
  }

  function formatDate(date: Date) {
    return new Date(date).toISOString().split('T')[0].replace(/-/g, ' ')
  }

  const handleDelete = async (id: string) => {
    await deleteStudent({ id });
    navigate('/students');
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2} className="student-details">
      <Avatar alt="Student Photo" sx={{ width: 120, height: 120, mb: 2 }}>Photo</Avatar>
      <Box className="student-info" mb={2}>
        <Typography variant="h6">Full Name: {student.first_name} {student.last_name}</Typography>
        <Typography>Phone Number: {student.phone_number}</Typography>
        <Typography>Date of Birth: {formatDate(student.date_of_birth)}</Typography>
        <Typography>Address: {student.number} {student.city} {student.street} </Typography>
        <Typography>Register date: {formatDate(student.createdAt)}</Typography>
      </Box>
      <Box className="student-class-info" mb={2}>
        <Typography variant="h6">Class: {classRoom ? classRoom.grade_level : "---"}</Typography>
        <Typography>Enrollment Date: {enrollment ? formatDate(enrollment.enrollment_date) : "---"}</Typography>
        <Typography>Status: {enrollment ? enrollment.status : "---"}</Typography>
      </Box>
      <Box className="student-subjects" mb={2}>
        <Typography>English</Typography>
        <Typography>History</Typography>
        <Typography>Science</Typography>
        <Typography>Math</Typography>
        <Typography>Geography</Typography>
      </Box>
      <Box className="student-actions" display="flex" flexDirection="column" gap={2}>
        <Button variant="contained" onClick={() => navigate(`/students/edit/${id}`)}>Edit Data</Button>
        <Button variant="contained" onClick={() => {
          enrollment ?
          navigate(`/enrollments/edit/${enrollment.id}`) :
          navigate(`/enrollments/create/${student.id}`)
          }}>Edit Enrollment</Button>
        <Button variant="contained" color="error" onClick={() => handleDelete(student.id)}>Delete</Button>
      </Box>
    </Box>
  );
};

export default StudentDetails;