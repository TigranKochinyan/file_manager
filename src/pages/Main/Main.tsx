import { useState } from 'react';
import { Container, Grid } from '@mui/material';
import LeftNavigation from '../../components/LeftNavigation';
import RightSide from '../../components/RightSide';
import styles from './index.module.scss';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
} from '@mui/material';
import { lightBlue } from '@mui/material/colors';

import { MiscellaneousServicesRounded } from '@mui/icons-material';

const drawerWidth = 240;

const Main = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <LeftNavigation />
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return <Container>
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MiscellaneousServicesRounded />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    <Toolbar>
                        <Typography color={lightBlue[900]} variant='h3'>Folders</Typography>
                    </Toolbar>
                    {drawer}
                </Drawer>
            </Box>
            <Box className={styles.mt7}>
                <RightSide />
            </Box>
        </Box>
    </Container>
}

export default Main;