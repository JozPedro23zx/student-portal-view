import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center', color: '#fff' }}>
      <h1>Unauthorized</h1>
      <p>You do not have permission to view this page.</p>
      <Button variant="contained" color="primary" onClick={goBack}>
        Go Back
      </Button>
    </div>
  );
};

export default Unauthorized;