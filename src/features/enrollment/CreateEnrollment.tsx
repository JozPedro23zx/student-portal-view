import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateEnrollmetMutation } from './enrollmentSlice';
import { useGetClassRoomsQuery } from '../classroom/classroomSlice';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';

export const CreateEnrollment = () => {
    const [createEnrollmet] = useCreateEnrollmetMutation();
    const { data: classrooms, isLoading: isClassLoading } = useGetClassRoomsQuery({});
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        student_id: '',
        class_id: '',
        enrollment_date: '',
        status: ''
    });

    const handleChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name!]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createEnrollmet({
            student_id: formData.student_id,
            class_id: formData.class_id,
            enrollment_date: new Date(formData.enrollment_date),
            status: formData.status
        });
        navigate(-1);
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#333',
                    padding: '20px',
                    borderRadius: '8px',
                    color: '#fff'
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Create Enrollment
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <FormControl variant="outlined" fullWidth margin="normal">
                        <InputLabel htmlFor="class_id" style={{ color: '#fff' }}>Classroom</InputLabel>
                        <Select
                            value={formData.class_id}
                            onChange={handleChange}
                            label="Classroom"
                            inputProps={{
                                name: 'class_id',
                                id: 'class_id'
                            }}
                            style={{ color: '#fff' }}
                        >
                            {!isClassLoading && classrooms && classrooms.map((classroom) => (
                                <MenuItem key={classroom.id} value={classroom.id}>
                                    {classroom.grade_level}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" fullWidth margin="normal">
                        <InputLabel htmlFor="status" style={{ color: '#fff' }}>Status</InputLabel>
                        <Select
                            value={formData.status}
                            onChange={handleChange}
                            label="Status"
                            inputProps={{
                                name: 'status',
                                id: 'status'
                            }}
                            style={{ color: '#fff' }}
                        >
                            <MenuItem value="enrolled">Enrolled</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                            <MenuItem value="dropped">Dropped</MenuItem>
                        </Select>
                    </FormControl>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                        <Button variant="contained" onClick={() => navigate(-1)} style={{ backgroundColor: '#fff', color: '#000' }}>
                            Back
                        </Button>
                        <Button type="submit" variant="contained" style={{ backgroundColor: '#00FF00', color: '#000' }}>
                            Submit
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};
