import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Grid, Paper } from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';

const Users = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Add login logic here
    if (!email || !password) {
      setError('Both fields are required');
    } else {
      setError('');
      // Proceed with login (e.g., API call)
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: 3 }}>
        {/* Login Heading */}
        <Box display="flex" justifyContent="center" mb={3}>
          <LockOutlinedIcon sx={{ fontSize: 40, color: '#1976D2' }} />
        </Box>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>

        {/* Error Message */}
        {error && (
          <Typography color="error" variant="body2" align="center" gutterBottom>
            {error}
          </Typography>
        )}

        {/* Login Form */}
        <Box>
          {/* Email Field */}
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          
          {/* Password Field */}
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />

          {/* Login Button */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#1976D2',
              marginTop: 2,
              '&:hover': { backgroundColor: '#1565C0' },
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>

        {/* Additional Links */}
        <Grid container justifyContent="flex-end" sx={{ marginTop: 2 }}>
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              Don't have an account?{' '}
              <Button sx={{ textTransform: 'none', color: '#1976D2' }}>Sign Up</Button>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Users;
