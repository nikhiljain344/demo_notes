import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import appContext from '../Context/AppContext'
import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useForm } from 'react-hook-form';
import { authorizeMe, login } from '../service';
import { toast } from 'react-toastify';

export const Login = () => {
    const AppContext = useContext(appContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            let res = await login(data);
            if (res?.data?.status) {
                authorizeMe(res?.data?.data?.token);
                AppContext.setUser(res?.data?.data);
                toast.success(res?.data?.message);
                navigate('/home');
            } else {
                toast.error(res?.data?.message);
            }
        } catch (e) { console.error(e); toast.error(e?.response?.data?.message); }
    };

    return (
        <>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://img.freepik.com/free-vector/realistic-style-technology-particle-background_23-2148426704.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: "center",
                        height: "100vh"
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <AccountCircleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h6" style={{ fontweight: 700 }}>
                        <b>  Sign In</b>
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            {...register('email', { required: true })}
                        />
                        {errors.email && <p className="text-danger mb-0" style={{ fontSize: 12 }}>First name is required.</p>}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            {...register('password', { required: true })}
                        />
                        {errors.password && <p className="text-danger mb-0" style={{ fontSize: 12 }}>Password is required.</p>}
                        <Button className='btn'
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent={'center'} className='mt-3'>
                            <Grid item display={'flex'}>
                                <Typography style={{ fontweight: 700, fontSize: 16 }} className='text-muted'>
                                    Don't have an account ?
                                </Typography>
                                <Link to={'/sign-up'} style={{ textDecoration: "none" }}  >
                                    <Typography style={{ fontweight: 700, fontSize: 16 }} color='primary' className='ms-1'>
                                        <b>Register Now</b>
                                    </Typography>
                                </Link>

                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </>
    )
}
