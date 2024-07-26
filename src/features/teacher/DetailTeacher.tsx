import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress, Typography, Button, Box } from '@mui/material';
import { useGetOneTeacherQuery, useDeleteTeacherMutation } from './teacherSlice';

const TeacherDetails = () => {
  const navigate = useNavigate();
  const id = useParams().id as string;
  
  const { data: teacher, isLoading, error } = useGetOneTeacherQuery({ id });
  const [deleteTeacher] = useDeleteTeacherMutation();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!teacher) {
    let typeError = error as any;
    return <Typography>{typeError?.data.message}</Typography>;
  }

  const handleDelete = async (id: string) => {
    await deleteTeacher({ id });
    navigate('/teachers');
  };

  function formatDate(date: Date) {
    return new Date(date).toISOString().split('T')[0].replace(/-/g, '/');
  }

  return (
    <Box>
      <Typography variant="h6">Name: {teacher.first_name} {teacher.last_name}</Typography>
      <Typography variant="body1">Subjects: {teacher.subject_specialization.join(', ')}</Typography>
      <Typography variant="body1">Date of birth: {formatDate(teacher.date_of_birth)}</Typography>
      <Typography variant="body1">Address: {teacher.street}, {teacher.number} - {teacher.city}</Typography>
      <Typography variant="body1">Phone: {teacher.phone_number}</Typography>
      <Button variant="contained" color="secondary" onClick={() => handleDelete(teacher.id)}>Deletar</Button>
      <Button variant="contained" color="primary" onClick={() => navigate(`/teachers/edit/${teacher.id}`)}>Editar</Button>
    </Box>
  );
};

export default TeacherDetails;
