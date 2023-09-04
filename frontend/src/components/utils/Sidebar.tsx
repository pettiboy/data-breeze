import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { IconButton, useTheme } from '@mui/material';
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useContext } from 'react';
import { StyleThemeContext } from '../../context/StyleThemeContext';
import DateRangePicker from './DateRangePicker';

const drawerWidth = 240;

const routes = [
    {
        name: "Comparison",
        path: '/dashboard/comparison',
        icon: <InboxIcon />,
    },
    {
        name: "Time Series",
        path: '/dashboard/time-series',
        icon: <InboxIcon />,
    },
]

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();

    const { toggleColorMode } = useContext(StyleThemeContext);

    const currentPath = location.pathname;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} elevation={0}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Data Breeze
                    </Typography>

                    <Box sx={{ ml: "auto" }}>
                        <IconButton onClick={toggleColorMode} color="inherit">
                            {theme.palette.mode === "dark" ? (
                                <DarkModeIcon />
                            ) : (
                                <LightModeIcon />
                            )}
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {routes.map((route) => (
                            <ListItem key={route.path} disablePadding onClick={() => {
                                navigate(route.path)
                            }}>
                                <ListItemButton selected={currentPath === route.path}>
                                    <ListItemIcon>
                                        {route.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={route.name} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />

                <DateRangePicker />
                <Outlet />
            </Box>
        </Box>
    );
}