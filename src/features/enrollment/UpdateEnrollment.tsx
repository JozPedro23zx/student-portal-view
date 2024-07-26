import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateEnrollmentMutation, useGetOneEnrollmentQuery, useDeleteEnrollmetMutation } from './enrollmentSlice';
import { useGetClassRoomsQuery } from '../classroom/classroomSlice';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Typography, CircularProgress } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

export const UpdateEnrollment = () => {
    const { id } = useParams<{ id: string }>();
    const { data: enrollment, isLoading: isEnrollmentLoading, error } = useGetOneEnrollmentQuery({ id });
    const { data: classrooms, isLoading: isClassLoading } = useGetClassRoomsQuery({});
    const [updateEnrollment] = useUpdateEnrollmentMutation();
    const [deleteEnrollmet] = useDeleteEnrollmetMutation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        class_id: '',
        status: ''
    });

    useEffect(() => {
        if (enrollment) {
            setFormData({
                class_id: enrollment.class_id,
                status: enrollment.status
            });
        }
    }, [enrollment]);

    if (isEnrollmentLoading || isClassLoading) {
        return <CircularProgress />;
    }

    if (!enrollment) {
        let typeError = error as any;
        return <Typography>{typeError?.data.message}</Typography>;
    }

    const handleChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name!]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateEnrollment({
            id: enrollment.id,
            class_id: formData.class_id,
            status: formData.status
        });
        navigate(-1);
    };

    const handleDelete = async () => {
        await deleteEnrollmet({ id: enrollment.id });
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
                    Update Enrollment
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <FormControl variant="outlined" fullWidth margin="normal">
                        <InputLabel htmlFor="class_id" style={{ color: '#fff' }}>Class</InputLabel>
                        <Select
                            value={formData.class_id}
                            onChange={handleChange}
                            label="Class"
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
                        <Button variant="contained" color="secondary" onClick={handleDelete} style={{ backgroundColor: '#FF0000', color: '#fff' }}>
                            Delete
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};
