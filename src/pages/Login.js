import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import axios from 'axios'; // Import axios for API calls
import '../css/Login.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the form from submitting in the default way

        try {
            // Gửi yêu cầu POST đến API
            const response = await axios.post('http://graduationshowcase.online/api/v1/auth/sign-in', {
                username: username,
                password: password,
            });

            // Xử lý thành công (ví dụ: lưu token vào localStorage và chuyển hướng người dùng)
            console.log('Login successful:', response.data);
            localStorage.setItem('token', response.data.token);
            // Chuyển hướng đến trang chính sau khi đăng nhập
            window.location.href = '/home';
        } catch (error) {
            // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
            //setErrorMessage('Invalid username or password. Please try again.');
            console.error('Error logging in:', error);
        }
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            {/* Left-side image */}
            <Grid item xs={false} sm={4} md={7} sx={{
                backgroundImage: 'url(https://img.freepik.com/free-vector/flat-university-concept-background_23-2148189718.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }} />

            {/* Right-side login form */}
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className="login-container">
                    <Typography variant="h4" gutterBottom>
                        Welcome back!
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        If you are an Admin, please login below.
                    </Typography>

                    {/* Form đăng nhập cho admin */}
                    <form noValidate onSubmit={handleLogin}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} // Update state with input value
                            className="text-field"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Update state with input value
                            className="text-field"
                        />

                        {errorMessage && (
                            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                {errorMessage}
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2, padding: '10px 0', fontWeight: 'bold' }}
                        >
                            Đăng nhập
                        </Button>
                    </form>

                    <Typography variant="body1" gutterBottom style={{ marginTop: '20px' }}>
                        If you are a user, please sign in with Google:
                    </Typography>

                    {/* Nút đăng nhập bằng Google */}
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<GoogleIcon />}
                        className="google-button"
                    >
                        Sign in with Google
                    </Button>
                </div>
            </Grid>
        </Grid>
    );
};

export default LoginPage;
