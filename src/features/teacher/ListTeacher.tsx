import React from 'react';
import { Box, CircularProgress, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { useDeleteTeacherMutation, useGetTeachersQuery } from './teacherSlice';

const TeacherList = () => {
  const [deleteTeacher] = useDeleteTeacherMutation();
  const { data: teachers, error, isLoading } = useGetTeachersQuery({});

  if (isLoading) return <CircularProgress />;


  function formatDate(date: Date) {
    return new Date(date).toISOString().split('T')[0].replace(/-/g, ' ')
  }

  const handleDelete = async (id: string) => {
    await deleteTeacher({ id });
  };

  if (error) {
    return (
      <Box>
        <Typography style={{color: '#fff'}} >Error loading teachers</Typography>
        <IconButton color="primary">
          <Link to={`/teachers/create`}>
            <AddIcon style={{color: '#fff'}} />
          </Link>
        </IconButton>
      </Box>
    )
  }

  return (
    <div style={{ marginTop: "10rem", backgroundColor: '#333', padding: '20px', borderRadius: '12px', width: "70%" }}>
      <h2 style={{ color: '#fff' }}>Teachers</h2>
      <IconButton color="primary">
        <Link to={`/teachers/create`}>
          <AddIcon style={{color: '#fff'}} />
        </Link>
      </IconButton>
      <Box style={{ width: "100%", maxHeight: "20rem", overflowY: "auto" }}>
        <Box style={{ display: "flex", justifyContent: "center"}}>
          <List>
            {teachers && teachers.map(teacher => (
              <ListItem key={teacher.id} style={{ backgroundColor: '#fff', marginBottom: '10px', borderRadius: '28px', justifyContent: 'space-between', width: "50rem" }}>
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
          </Box>
      </Box>
    </div>
  );
};

export default TeacherList;
