import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, CircularProgress, Typography, Box } from '@mui/material';
import { useCreateTeacherMutation } from './teacherSlice';

const TeacherCreate = () => {
  const navigate = useNavigate();
  const [createTeacher, { isLoading, error }] = useCreateTeacherMutation();

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
      first_name: formData.first_name,
      last_name: formData.last_name,
      subject_specialization: formData.subject_specialization.split(','),
      date_of_birth: new Date(formData.date_of_birth),
      street: formData.street,
      number: parseInt(formData.house_number),
      city: formData.city,
      phone_number: formData.phone_number
    }
    await createTeacher(data);
    navigate('/teachers');
  };

  return (
    <Box className="input-container" display="flex" flexDirection="column" alignItems="center" p={2}>
      <Typography variant="h4">Create a new teacher</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          name="first_name"
          value={formData.first_name}
          InputLabelProps={{ shrink: true, style: { color: '#fff' } }} 
          InputProps={{ style: { color: '#fff' } }} 
          sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#fff' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          InputLabelProps={{ shrink: true, style: { color: '#fff' } }} 
          InputProps={{ style: { color: '#fff' } }} 
          sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#fff' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Subjects"
          name="subject_specialization"
          value={formData.subject_specialization}
          InputLabelProps={{ shrink: true, style: { color: '#fff' } }} 
          InputProps={{ style: { color: '#fff' } }} 
          sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#fff' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date Of Birth"
          name="date_of_birth"
          type="date"
          value={formData.date_of_birth}
          InputLabelProps={{ shrink: true, style: { color: '#fff' } }} 
          InputProps={{ style: { color: '#fff' } }} 
          sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#fff' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Street"
          name="street"
          value={formData.street}
          InputLabelProps={{ shrink: true, style: { color: '#fff' } }} 
          InputProps={{ style: { color: '#fff' } }} 
          sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#fff' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Number"
          name="house_number"
          value={formData.house_number}
          InputLabelProps={{ shrink: true, style: { color: '#fff' } }} 
          InputProps={{ style: { color: '#fff' } }} 
          sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#fff' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="City"
          name="city"
          value={formData.city}
          InputLabelProps={{ shrink: true, style: { color: '#fff' } }} 
          InputProps={{ style: { color: '#fff' } }} 
          sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#fff' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          name="phone_number"
          value={formData.phone_number}
          InputLabelProps={{ shrink: true, style: { color: '#fff' } }} 
          InputProps={{ style: { color: '#fff' } }} 
          sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#fff' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Create'}
        </Button>
      </form>
    </Box>
  );
};

export default TeacherCreate;
