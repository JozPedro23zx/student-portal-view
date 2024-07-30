// TeacherUpdate.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, CircularProgress, Typography, Box } from '@mui/material';
import { useGetOneTeacherQuery, useUpdateTeacherMutation } from './teacherSlice';

const TeacherUpdate = () => {
  const id = useParams().id as string;
  const navigate = useNavigate();
  
  const { data: teacher, isLoading: isTeacherLoading, error: teacherError } = useGetOneTeacherQuery({ id });
  const [updateTeacher, { isLoading: isUpdating, error: updateError }] = useUpdateTeacherMutation();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    subject_specialization: '',
    date_of_birth: '',
    street: '',
    house_number: '',
    city: '',
    phone_number: ''
  });

  useEffect(() => {
    if (teacher) {
      setFormData({
        first_name: teacher.first_name,
        last_name: teacher.last_name,
        subject_specialization: teacher.subject_specialization.join(','),
        date_of_birth: new Date(teacher.date_of_birth).toISOString().substring(0, 10),
        street: teacher.street,
        house_number: teacher.number.toString(),
        city: teacher.city,
        phone_number: teacher.phone_number
      });
    }
  }, [teacher]);

  if (isTeacherLoading) {
    return <CircularProgress />;
  }

  if (!teacher) {
        let typeError = teacherError as any
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
      id: teacher.id,
      first_name: formData.first_name,
      last_name: formData.last_name,
      subject_specialization: formData.subject_specialization.split(','),
      date_of_birth: new Date(formData.date_of_birth),
      address: {
        street: formData.street,
        number: parseInt(formData.house_number),
        city: formData.city
      },
      phone_number: formData.phone_number
    };
    await updateTeacher(data);
    navigate(`/teachers/${teacher.id}`);
  };

  return (
    <Box className="input-container" display="flex" flexDirection="column" alignItems="center" p={2}>
      <Typography variant="h4">Update teacher</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          name="first_name"
          InputLabelProps={{ shrink: true, style: { color: '#fff' } }} 
          InputProps={{ style: { color: '#fff' } }} 
          sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#fff' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
          value={formData.first_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="last_name"
          InputLabelProps={{ shrink: true, style: { color: '#fff' } }} 
          InputProps={{ style: { color: '#fff' } }} 
          sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#fff' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
          value={formData.last_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Subject"
          name="subject_specialization"
          InputLabelProps={{ shrink: true, style: { color: '#fff' } }} 
          InputProps={{ style: { color: '#fff' } }} 
          sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#fff' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
          value={formData.subject_specialization}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date Of Birth"
          name="date_of_birth"
          type="date"
          InputLabelProps={{ shrink: true, style: { color: '#fff' } }} 
          InputProps={{ style: { color: '#fff' } }} 
          sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#fff' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
          value={formData.date_of_birth}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Street"
          name="street"
          InputLabelProps={{ shrink: true, style: { color: '#fff' } }} 
          InputProps={{ style: { color: '#fff' } }} 
          sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#fff' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
          value={formData.street}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Number"
          name="house_number"
          InputLabelProps={{ shrink: true, style: { color: '#fff' } }} 
          InputProps={{ style: { color: '#fff' } }} 
          sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#fff' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
          value={formData.house_number}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="City"
          name="city"
          InputLabelProps={{ shrink: true, style: { color: '#fff' } }} 
          InputProps={{ style: { color: '#fff' } }} 
          sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#fff' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
          value={formData.city}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          name="phone_number"
          InputLabelProps={{ shrink: true, style: { color: '#fff' } }} 
          InputProps={{ style: { color: '#fff' } }} 
          sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#fff' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
          value={formData.phone_number}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isUpdating}
        >
          {isUpdating ? <CircularProgress size={24} /> : 'Update'}
        </Button>
      </form>
    </Box>
  );
};

export default TeacherUpdate;
