// src/features/students/StudentUpdate.tsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetOneStudentQuery, useUpdateStudentMutation } from './studentSlice';
import { Box, Button, TextField, CircularProgress, Avatar, Typography } from '@mui/material';

const StudentUpdate = () => {
  const id = useParams().id as string;
  const { data: student, isLoading, error } = useGetOneStudentQuery({ id });
  const [updateStudent] = useUpdateStudentMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    date_of_birth: '',
    street: '',
    house_number: '',
    city: ''
  });

  React.useEffect(() => {
    if (student) {
      setFormData({
        first_name: student.first_name,
        last_name: student.last_name,
        phone_number: student.phone_number,
        date_of_birth: new Date(student.date_of_birth).toISOString().substring(0, 10),
        street: student.street,
        house_number: student.number.toString(),
        city: student.city
      });
    }
  }, [student]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!student) {
    let typeError = error as any
    return <Typography>{typeError?.data.message}</Typography>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let data = { 
        id: student.id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        date_of_birth: new Date(formData.date_of_birth),
        phone_number: formData.phone_number,
        address:{
          street: formData.street,
          number: parseInt(formData.house_number),
          city: formData.city
        }
    }
    await updateStudent(data);
    navigate(-1);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      <Avatar alt="Student Photo" sx={{ width: 120, height: 120, mb: 2 }}>Photo</Avatar>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <Box display="flex" gap={2}>
          <TextField name="first_name" label="First Name" value={formData.first_name} onChange={handleChange} />
          <TextField name="last_name" label="Last Name" value={formData.last_name} onChange={handleChange} />
        </Box>
        <TextField name="phone_number" label="Phone Number" value={formData.phone_number} onChange={handleChange} />
        <TextField name="date_of_birth" label="Date of Birth" type="date" value={formData.date_of_birth} onChange={handleChange} InputLabelProps={{ shrink: true }} />
        <Box display="flex" gap={2}>
          <TextField name="city" label="City" value={formData.city} onChange={handleChange} />
          <TextField name="street" label="Street" value={formData.street} onChange={handleChange} />
          <TextField name="house_number" label="House Number" value={formData.house_number} onChange={handleChange} />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
          <Button type="submit" variant="contained" color="primary">Submit</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default StudentUpdate;
