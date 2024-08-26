import React from 'react';
import { useDeleteStudentMutation, useGetStudentsQuery } from './studentSlice';
import { Box, CircularProgress, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const StudentList = () => {
  const [deleteStudent] = useDeleteStudentMutation();
  const { data: students, error, isLoading } = useGetStudentsQuery({});

  if (isLoading) return <CircularProgress />;

  function formatDate(date: Date){
    return new Date(date).toISOString().split('T')[0].replace(/-/g, ' ')
  }

  const handleDelete = async (id: string) => {
    await deleteStudent({ id });
  };

  if (error) {
    return (
      <Box>
        <Typography style={{color: '#fff'}} >Error loading students</Typography>
        <IconButton color="primary">
          <Link to={`/students/create`}>
            <AddIcon style={{color: '#fff'}} />
          </Link>
        </IconButton>
      </Box>
    )
  }

  return (
    <div style={{ marginTop: "10rem", backgroundColor: '#333', padding: '20px', borderRadius: '12px', width: "70%"}}>
      <h2 style={{ color: '#fff' }}>Students</h2>
      <IconButton color="primary">
        <Link to={`/students/create`}>
          <AddIcon style={{color: '#fff'}} />
        </Link>
      </IconButton>
      <Box style={{ width: "100%", maxHeight: "20rem", overflowY: "auto" }}>
        <Box style={{ display: "flex", justifyContent: "center"}}>
          <List>
            {students && students.map(student => (
              <ListItem key={student.id} style={{ backgroundColor: '#fff', marginBottom: '10px', borderRadius: '28px', justifyContent: 'space-between', width: "50rem"}}>
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
        </Box>
      </Box>
    </div>
  );
};

export default StudentList;
