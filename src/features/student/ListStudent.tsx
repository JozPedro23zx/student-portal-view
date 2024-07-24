import React from 'react';
import { useDeleteStudentMutation, useGetStudentsQuery } from './studentSlice';
import { CircularProgress, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const StudentList = () => {
  const [deleteStudent] = useDeleteStudentMutation();
  const { data: students, error, isLoading } = useGetStudentsQuery({});

  if (isLoading) return <CircularProgress />;

  if (error) {
    return <Typography>Error loading students</Typography>;
  }

  function formatDate(date: Date){
    return new Date(date).toISOString().split('T')[0].replace(/-/g, ' ')
  }

  const handleDelete = async (id: string) => {
    await deleteStudent({ id });
  };

  return (
    <div style={{ backgroundColor: '#333', padding: '20px', borderRadius: '8px' }}>
      <h2 style={{ color: '#fff' }}>Students</h2>
      <IconButton color="primary">
        <AddIcon />
      </IconButton>
      <List>
        {students && students.map(student => (
          <ListItem key={student.id} style={{ backgroundColor: '#fff', marginBottom: '10px', borderRadius: '4px' }}>
            <Link to={`/students/${student.id}`}>
              <Typography>{student.first_name} {student.last_name}</Typography>
            </Link>
            <Typography>{formatDate(student.createdAt)}</Typography>
            <IconButton edge="end" aria-label="delete" style={{ color: 'red' }} onClick={() => handleDelete(student.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default StudentList;
