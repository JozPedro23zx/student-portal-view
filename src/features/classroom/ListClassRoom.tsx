import { Box, CircularProgress, IconButton, List, ListItem, Typography } from "@mui/material";
import { useDeleteClassroomMutation, useGetClassRoomsQuery } from "./classroomSlice";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export const ListClassRoom = () => {
    const { data: classrooms, error, isLoading } = useGetClassRoomsQuery({});
    const [deleteStudent] = useDeleteClassroomMutation();
  
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
          <Typography style={{color: '#fff'}} >Error loading classrooms</Typography>
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
        <h2 style={{ color: '#fff' }}>Classrooms</h2>
        <IconButton color="primary">
          <Link to={`/classrooms/create`}>
            <AddIcon style={{color: '#fff'}} />
          </Link>
        </IconButton>
        <Box style={{ width: "100%", maxHeight: "20rem", overflowY: "auto" }}>
          <Box style={{ display: "flex", justifyContent: "center"}}>
            <List>
              {classrooms && classrooms.map(classroom => (
                <ListItem key={classroom.id} style={{ backgroundColor: '#fff', marginBottom: '10px', borderRadius: '4px', justifyContent: 'space-between', width: "50rem"}}>
                  <Link to={`/classrooms/edit/${classroom.id}`}>
                    <Typography>{classroom.grade_level}</Typography>
                  </Link>
                  <Typography>{formatDate(classroom.start_date)} - {formatDate(classroom.end_date)}</Typography>
                  <IconButton edge="end" aria-label="delete" style={{ color: 'red' }} onClick={() => handleDelete(classroom.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </div>
    );
}