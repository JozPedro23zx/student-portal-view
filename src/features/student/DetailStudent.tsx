import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteStudentMutation, useGetClassRoomQuery, useGetEnrollmentQuery, useGetOneStudentQuery } from './studentSlice';
import { Avatar, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import { useGetGradesQuery } from '../grade/gradeSlice';

const StudentDetails = () => {
  const navigate = useNavigate();

  const id = useParams().id as string;
  const { data: student, isLoading, error } = useGetOneStudentQuery({ id });

  const studentId = student?.id;
  const { data: enrollment, isLoading: enrollmentLoading } = useGetEnrollmentQuery({ id: studentId || undefined });

  const classId = enrollment?.class_id;
  const { data: classRoom, isLoading: classRoomLoading } = useGetClassRoomQuery({ id: classId || undefined });

  const [deleteStudent] = useDeleteStudentMutation();

  const { data: grades, isLoading: gradeLoading, error: gradeError } = useGetGradesQuery({ id });

  const [open, setOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');

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

  function gradeData(subject: string) {
    if (!grades) {
      console.log(gradeError);
      return <Typography>Error loading grades</Typography>
    }
    else if (gradeLoading) {
      return <CircularProgress />
    } else {
      const grade = grades.find((g) => g.subject == subject.toLowerCase())

      if(!grade){
        return <Typography>Subject not found</Typography>
      }

      return (
        <Box>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Avatar style={{ backgroundColor: '#dcdcdc', color: '#000', width: 60, height: 60 }}>{grade.exam ? grade.exam : "-"}</Avatar>
            </Grid>
            <Grid item>
              <Avatar style={{ backgroundColor: '#dcdcdc', color: '#000', width: 60, height: 60 }}>{grade.assignment ? grade.assignment : "-"}</Avatar>
            </Grid>
            <Grid item>
              <Avatar style={{ backgroundColor: '#dcdcdc', color: '#000', width: 60, height: 60 }}>{grade.others ? grade.others : "-"}</Avatar>
            </Grid>
          </Grid>
        </Box>
      )
    }
  }

  const handleClickOpen = (subject: string) => {
    setSelectedSubject(subject);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (id: string) => {
    await deleteStudent({ id });
    navigate('/students');
  };

  return (
    <Box className="student-details">
      <Box className="photo-section">
        <Avatar alt="Student Photo" sx={{ width: 120, height: 120, mb: 2 }}>Photo</Avatar>
        <Button className='button' variant="contained" onClick={() => navigate(`/students/edit/${id}`)}>Edit Data</Button>
        <Button className='button' variant="contained" onClick={() => {
          enrollment ?
            navigate(`/enrollments/edit/${enrollment.id}`) :
            navigate(`/enrollments/create/${student.id}`)
        }}>Edit Enrollment</Button>
        <Button className='button' variant="contained" color="error" onClick={() => handleDelete(student.id)}>Delete</Button>
      </Box>
      <Box className="info-section">
        <Box className="student-info">
          <Box className="info" mb={2}>
            <Typography sx={{ lineHeight: 2 }} variant="h6">Full Name:  {student.first_name} {student.last_name}</Typography>
            <Typography sx={{ lineHeight: 2 }}>Phone Number:  {student.phone_number}</Typography>
            <Typography sx={{ lineHeight: 2 }}>Date of Birth:  {formatDate(student.date_of_birth)}</Typography>
            <Typography sx={{ lineHeight: 2 }}>Address:  {student.number} {student.city} {student.street} </Typography>
            <Typography sx={{ lineHeight: 2 }}>Register date:  {formatDate(student.createdAt)}</Typography>
          </Box>
          <Box className="class-info" mb={2}>
            <Typography sx={{ lineHeight: 2 }} variant="h6">Class:  {classRoom ? classRoom.grade_level : "---"}</Typography>
            <Typography sx={{ lineHeight: 2 }}>Enrollment Date:  {enrollment ? formatDate(enrollment.enrollment_date) : "---"}</Typography>
            <Typography sx={{ lineHeight: 2 }}>Status:  {enrollment ? enrollment.status : "---"}</Typography>
          </Box>
        </Box>
        <Box className="subjects" mb={2}>
          <Typography className='subject' onClick={() => handleClickOpen("English")}>English</Typography>
          <Typography className='subject' onClick={() => handleClickOpen("History")}>History</Typography>
          <Typography className='subject' onClick={() => handleClickOpen("Science")}>Science</Typography>
          <Typography className='subject' onClick={() => handleClickOpen("Math")}>Math</Typography>
          <Typography className='subject' onClick={() => handleClickOpen("Geography")}>Geography</Typography>
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedSubject}</DialogTitle>
        <DialogContent>
          {gradeData(selectedSubject)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentDetails;