import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useForm } from 'react-hook-form';
import { signUp } from '../service';
import { toast } from 'react-toastify';

export const Register = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            let res = await signUp(data);
            if (res?.data?.status) {
                navigate('/');
                toast.success(res?.data?.message)
            }
            else {
                toast.error(res?.data?.message)
            }
        }
        catch (e) { console.log(e); toast.error(e?.response?.data?.message) }
    }

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
            <Grid item xs={12} sm={8} md={5} >
                <Box
                    sx={{
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: "center",
                        my: 2
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <AccountCircleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h6" style={{ fontweight: 700 }} className='mb-1'>
                        <b>  Create New Account</b>
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <TextField
                            margin="normal"
                            fullWidth
                            label="First Name"
                            name="first_name"
                            {...register('first_name', { required: true })}
                        />
                        {errors.first_name && <p className="text-danger mb-0" style={{ fontSize: 12 }}>First name is required.</p>}

                        <TextField
                            margin="normal"
                            fullWidth
                            label="Last Name"
                            name="last_name"
                            {...register('last_name', { required: true })}
                        />
                        {errors.last_name && <p className="text-danger mb-0" style={{ fontSize: 12 }}>Last name is required.</p>}

                        <TextField
                            margin="normal"
                            fullWidth
                            type='number'
                            label="Mobile Number"
                            name="mobile"
                            {...register('mobile', { required: true })}
                        />
                        {errors.mobile && <p className="text-danger mb-0" style={{ fontSize: 12 }}>Mobile is required.</p>}

                        <TextField
                            margin="normal"
                            fullWidth
                            label="Email Address"
                            name="email"
                            {...register('email')}
                        />
                        {errors.email && <p className="text-danger mb-0" style={{ fontSize: 12 }}>Email is required.</p>}

                        <TextField
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            {...register('password', { required: true })}
                        />
                        {errors.password && <p className="text-danger mb-0" style={{ fontSize: 12 }}>Password is required.</p>}


                        <Button className='btn'
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                    </form>
                    <Grid container justifyContent={'center'} >
                        <Grid item display={'flex'}>
                            <Typography style={{ fontweight: 700, fontSize: 16 }} className='text-muted'>
                                Already have a account .
                            </Typography>
                            <Link to={'/'} style={{ textDecoration: "none" }}  >
                                <Typography style={{ fontweight: 700, fontSize: 16 }} color='primary' className='ms-1'>
                                    <b>  Sign In</b>
                                </Typography>
                            </Link>

                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </>
    )
}
