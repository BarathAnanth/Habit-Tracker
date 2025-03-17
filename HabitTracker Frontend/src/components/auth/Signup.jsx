import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Typography, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../store/authSlice';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting:', { email, password }); // Add this
    
    try {
      await dispatch(signup({ email, password })).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ 
        mt: 8,
        p: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign Up"}
            </Button>
            <Typography align="center">
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;