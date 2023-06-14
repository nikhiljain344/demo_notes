import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import appContext from '../Context/AppContext'
import { AppBar, Avatar, Box, Button, Container, Grid, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper, TextField, Toolbar, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useForm } from 'react-hook-form';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { updateUser } from '../service';
import { toast } from 'react-toastify';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


export const Profile = () => {
    const AppContext = useContext(appContext);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);

    let initialValues = {
        first_name: AppContext?.user?.user?.first_name,
        last_name: AppContext?.user?.user?.last_name,
        mobile: AppContext?.user?.user?.mobile,
        email: AppContext?.user?.user?.email,
    };
    const {
        register,
        handleSubmit, setValue,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });



    useEffect(() => {
        setValue('first_name', AppContext?.user?.user?.first_name)
        setValue('last_name', AppContext?.user?.user?.last_name)
        setValue('mobile', AppContext?.user?.user?.mobile)
        setValue('email', AppContext?.user?.user?.email)
    }, [AppContext?.user])

    console.log("AppContext?.user", AppContext?.user);

    const onSubmit = async (data) => {
        try {
            let res = await updateUser(data);
            if (res?.data?.status) {
                AppContext.setUser({ ...AppContext?.user, user: res?.data?.data });
                toast.success(res?.data?.message)
            }
            else {
                toast.error(res?.data?.message)
            }
        }
        catch (e) { console.log(e); toast.error(e?.response?.data?.message) }
    }



    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="absolute" open={true}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{
                            marginRight: '36px',

                        }}
                        onClick={() => navigate('/home')}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Profile Settings
                    </Typography>
                    <Avatar sx={{ color: '#673ab7', bgcolor: "#fff", textTransform: "capitalize" }} onClick={(event) => setAnchorEl(event.currentTarget)}>{AppContext?.user?.user?.first_name[0]}{AppContext?.user?.user?.last_name[0]}</Avatar>
                    <Menu
                        id="action-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                        <MenuItem onClick={() => {
                            navigate('/profile')
                            setAnchorEl(null)
                        }}>
                            <ListItemIcon>
                                <AccountCircleIcon style={{ fontSize: 18 }} />
                            </ListItemIcon>
                            <ListItemText primary="Profile" style={{ fontSize: 14 }} />
                        </MenuItem>
                        <MenuItem onClick={() => {
                            setAnchorEl(null)
                            localStorage.clear();
                            navigate('/');
                        }}>
                            <ListItemIcon>
                                <ExitToAppIcon style={{ fontSize: 18 }} />
                            </ListItemIcon>
                            <ListItemText primary="Logout" style={{ fontSize: 14 }} />
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container justifyContent={'center'}>
                        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square px={4} py={3} style={{ borderRadius: 20 }}>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Avatar sx={{ m: 1, bgcolor: 'primary.main', }}>
                                    <AccountCircleIcon style={{ fontSize: 40 }} />
                                </Avatar>
                            </div>
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
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    margin="normal"
                                    fullWidth
                                    type='number'
                                    label="Mobile Number"
                                    name="mobile"
                                    {...register('mobile', { required: true })}
                                />
                                {errors.mobile && <p className="text-danger mb-0" style={{ fontSize: 12 }}>Mobile is required.</p>}

                                <TextField
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    margin="normal"
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    {...register('email')}
                                />
                                {errors.email && <p className="text-danger mb-0" style={{ fontSize: 12 }}>Email is required.</p>}

                                <Button className='btn'
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Update Profile
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box >
    )
}
