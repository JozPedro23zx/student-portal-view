import React from 'react';
import { CircularProgress, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { useDeleteTeacherMutation, useGetTeachersQuery } from './teacherSlice';

const TeacherList = () => {
  const [deleteTeacher] = useDeleteTeacherMutation();
  const { data: teachers, error, isLoading } = useGetTeachersQuery({});

  if (isLoading) return <CircularProgress />;

  if (error) {
    return <Typography>Error loading teachers</Typography>;
  }

  function formatDate(date: Date){
    return new Date(date).toISOString().split('T')[0].replace(/-/g, ' ')
  }

  const handleDelete = async (id: string) => {
    await deleteTeacher({ id });
  };

  return (
    <div style={{ backgroundColor: '#333', padding: '20px', borderRadius: '8px' }}>
      <h2 style={{ color: '#fff' }}>Teachers</h2>
      <IconButton color="primary">
        <Link to={`/teachers/create`}>
          <AddIcon />
        </Link>
      </IconButton>
      <List>
        {teachers && teachers.map(teacher => (
          <ListItem key={teacher.id} style={{ backgroundColor: '#fff', marginBottom: '10px', borderRadius: '4px' }}>
            <Link to={`/teachers/${teacher.id}`}>
              <Typography>{teacher.first_name} {teacher.last_name}</Typography>
            </Link>
            <Typography>{formatDate(teacher.createdAt)}</Typography>
            <IconButton edge="end" aria-label="delete" style={{ color: 'red' }} onClick={() => handleDelete(teacher.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TeacherList;
