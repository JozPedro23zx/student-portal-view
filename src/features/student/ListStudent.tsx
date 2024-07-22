import React from 'react';
import { useGetStudentsQuery } from './studentSlice';
import { CircularProgress, IconButton, List, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const StudentList = () => {
  const { data: students, error, isLoading } = useGetStudentsQuery({});

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error loading students.</div>;

  return (
    <div style={{ backgroundColor: '#333', padding: '20px', borderRadius: '8px' }}>
      <h2 style={{ color: '#fff' }}>Students</h2>
      <IconButton color="primary">
        <AddIcon />
      </IconButton>
      <List>
        {students && students.map(student => (
          <ListItem key={student.id} style={{ backgroundColor: '#fff', marginBottom: '10px', borderRadius: '4px' }}>
            <ListItemText 
            primary={`${student.first_name} ${student.last_name}`} 
            secondary={student.createdAt.toISOString().split('T')[0].replace(/-/g, ' ')} />
            <IconButton edge="end" aria-label="delete" style={{ color: 'red' }}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default StudentList;
