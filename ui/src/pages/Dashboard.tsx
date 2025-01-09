// 'use client'
//
// import React from 'react';
// import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
// import LeftNavbar from "./LeftNavbar.tsx";
// // import DashboardForm from './components/DashboardForm';
//
// const theme = createTheme();
//
// export default function Dashboard() {
//     return (
//         <ThemeProvider theme={theme}>
//             <CssBaseline />
//             <Box sx={{ display: 'flex' }}>
//                 <LeftNavbar />
//                 {/*<Box component="main" sx={{ flexGrow: 1, p: 3 }}>*/}
//                 {/*    <DashboardForm />*/}
//                 {/*</Box>*/}
//             </Box>
//         </ThemeProvider>
//     );
// }
//



'use client'

import React, { useState } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme, AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LeftNavbar from './LeftNavbar';
import ProductPage from './ProductPage';
import ClientsPage from './ClientPage.tsx';
import AccountsPage from './AccountsPage';
import LoginPage from "./LoginPage.tsx";

const theme = createTheme();

export default function Dashboard() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {/*<AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>*/}
                {/*    <Toolbar>*/}
                {/*        <Typography variant="h6" noWrap component="div">*/}
                {/*            Admin Dashboard*/}
                {/*        </Typography>*/}
                {/*    </Toolbar>*/}
                {/*</AppBar>*/}

                <LeftNavbar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

                {/*<Router>*/}
                {/*    <Routes>*/}
                {/*        <Route path="/clients" element={<ClientsPage/>} />*/}
                {/*        /!*<Route path="/form" element={<Form />} />*!/*/}
                {/*    </Routes>*/}
                {/*</Router>*/}
                {/*<Router>*/}
                {/*    <Routes>*/}
                {/*        /!*<Route path="/" element={<LoginPage />} />*!/*/}
                {/*        /!*<Route path="/login" element={<LoginPage />} />*!/*/}
                {/*        <Route path="/dashboard" element={<Dashboard/>} />*/}
                {/*        <Route path="/client" element={<ClientsPage/>} />*/}
                {/*        /!*<Route path="/form" element={<Form />} />*!/*/}
                {/*    </Routes>*/}
                {/*</Router>*/}
                {/*<Router>*/}
                {/*    <Box sx={{ display: 'flex' }}>*/}
                {/*        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>*/}
                {/*            <Toolbar>*/}
                {/*                <Typography variant="h6" noWrap component="div">*/}
                {/*                    Admin Dashboard*/}
                {/*                </Typography>*/}
                {/*            </Toolbar>*/}
                {/*        </AppBar>*/}
                {/*        /!*<LeftNavbar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />*!/*/}
                {/*        /!*<Box*!/*/}
                {/*        /!*    component="main"*!/*/}
                {/*        /!*    sx={{*!/*/}
                {/*        /!*        flexGrow: 1,*!/*/}
                {/*        /!*        p: 3,*!/*/}
                {/*        /!*        width: { sm: `calc(100% - ${240}px)` },*!/*/}
                {/*        /!*        ml: { sm: `${240}px` },*!/*/}
                {/*        /!*        mt: ['48px', '56px', '64px'],*!/*/}
                {/*        /!*    }}*!/*/}
                {/*        /!*>*!/*/}
                {/*        /!*    /!*<Routes>*!/*!/*/}
                {/*        /!*    /!*    <Route path="/products" element={<ProductPage />} />*!/*!/*/}
                {/*        /!*    /!*    <Route path="/clients" element={<ClientsPage />} />*!/*!/*/}
                {/*        /!*    /!*    <Route path="/accounts" element={<AccountsPage />} />*!/*!/*/}
                {/*        /!*    /!*    <Route path="/" element={<Typography variant="h4">Welcome to the Admin Dashboard</Typography>} />*!/*!/*/}
                {/*        /!*    /!*</Routes>*!/*!/*/}
                {/*        /!*</Box>*!/*/}
                {/*    </Box>*/}
                {/*</Router>*/}
            </ThemeProvider>
        </>

    );
}


