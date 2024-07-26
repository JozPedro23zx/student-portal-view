import { useState } from "react";
import { useGetOneClassRoomQuery, useUpdateClassroomMutation } from "./classroomSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
import React from "react";

export const UpdateClassRoom = () => {
    const id = useParams().id as string;
    const [updateClassRoom] = useUpdateClassroomMutation();
    const { data: classroom, isLoading, error } = useGetOneClassRoomQuery({ id });

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        grade_level: '',
        start_date: '',
        end_date: ''
    });

    React.useEffect(() => {
        if (classroom) {
            setFormData({
                grade_level: classroom.grade_level,
                start_date: new Date(classroom.start_date).toISOString().substring(0, 10),
                end_date: new Date(classroom.end_date).toISOString().substring(0, 10)
            });
        }
    }, [classroom]);

    if (isLoading) {
        return <CircularProgress />;
    }

    if (!classroom) {
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
        await updateClassRoom({
            id: classroom.id,
            grade_level: formData.grade_level,
            start_date: new Date(formData.start_date),
            end_date: new Date(formData.end_date)
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
                    Create Classroom
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="grade_level"
                        label="Grade Level"
                        name="grade_level"
                        value={formData.grade_level}
                        onChange={handleChange}
                        InputLabelProps={{ style: { color: '#fff' } }}
                        InputProps={{ style: { color: '#fff' } }}
                        sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#fff' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="start_date"
                        label="Start Date"
                        name="start_date"
                        type="date"
                        value={formData.start_date}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true, style: { color: '#fff' } }}
                        InputProps={{ style: { color: '#fff' } }}
                        sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#fff' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="end_date"
                        label="End Date"
                        name="end_date"
                        type="date"
                        value={formData.end_date}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true, style: { color: '#fff' } }}
                        InputProps={{ style: { color: '#fff' } }}
                        sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#fff' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Create
                    </Button>
                </form>
            </Box>
        </Container>
    )
}