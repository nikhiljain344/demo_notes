import React from 'react'
import { useNavigate } from 'react-router-dom';
import { styled, } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems } from './listItems';
import Notes from './Notes';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import appContext from '../Context/AppContext'


function Copyright(props) {
    return (
        <Typography variant="body2" color="primary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Demo App
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);


export const Main = () => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const AppContext = React.useContext(appContext);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Notes
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
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                    {mainListItems}
                </List>
            </Drawer>
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
                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12} md={12} lg={12} xl={12}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Notes />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Copyright sx={{ pt: 4 }} />
                </Container>
            </Box>
        </Box >
    )
}
