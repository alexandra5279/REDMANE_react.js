import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import WehiLogo from '../assets/logos/wehi-logo.png';
import MelbUniLogo from '../assets/logos/unimelb-logo.png';
import BusinessIcon from '@mui/icons-material/Business';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../actions/authActions'; 
import keycloak from '../keycloak';  

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();  // Initialize Redux dispatch

  // Simulated login form submission logic
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Get form data
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    // Simulated authentication logic (replace with real logic)
    const isAuthenticated = email === '' && password === '';

    if (isAuthenticated) {
      dispatch(login());  // Dispatch login action
      navigate('/dashboard');  // Redirect to the dashboard
    } else {
      alert('Invalid credentials');
    }
  };

  const handleInstitutionLogin = async () => {
    if (!keycloak) {
        console.error("Keycloak instance is not initialized");
        return;
    }

    try {
        console.log("Keycloak logging in...");
        await keycloak.login();
    } catch (err) {
        console.error("Keycloak login failed", err);
    }
};

// Listen for Keycloak to perform a redirect after successful authentication.
keycloak.onAuthSuccess = () => {
    console.log("User authenticated, performing redirect");
    dispatch(login());
    navigate('/projects');
};

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={WehiLogo} alt="WEHI" width="240" height="80" style={{ marginRight: '20px' }} />
            <div style={{ borderLeft: '2px solid grey', height: '100px', marginRight: '15px' }}></div>
            <img src={MelbUniLogo} alt="Melbourne University" width="90" height="90" />
          </div> 
          <br />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              onClick={handleInstitutionLogin}  // Trigger Keycloak login
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              <BusinessIcon sx={{mr: 1 }} />
              Sign In Through Your Institution
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="https://www.wehi.edu.au/" variant="body2">
                  {"About Us"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>    
        <Footer />
      </Container>
    </ThemeProvider>
  );
}
