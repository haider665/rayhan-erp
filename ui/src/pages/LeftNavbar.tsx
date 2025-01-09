// import React from 'react';
// import {
//     Drawer,
//     List,
//     ListItemButton,
//     ListItemText,
//     Collapse,
//     ListItemIcon,
// } from '@mui/material';
//
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import PeopleIcon from '@mui/icons-material/People';
// import SettingsIcon from '@mui/icons-material/Settings';
//
// const drawerWidth = 240;
//
// export default function LeftNavbar() {
//     const [open, setOpen] = React.useState({
//         dashboard: false,
//         users: false,
//         settings: false,
//     });
//
//     const handleClick = (section: 'dashboard' | 'users' | 'settings') => {
//         setOpen({...open, [section]: !open[section]});
//     };
//
//     return (
//         <Drawer
//             sx={{
//                 width: drawerWidth,
//                 flexShrink: 0,
//                 '& .MuiDrawer-paper': {
//                     width: drawerWidth,
//                     boxSizing: 'border-box',
//                 },
//             }}
//             variant="permanent"
//             anchor="left"
//         >
//             <List>
//                 <ListItemButton onClick={() => handleClick('dashboard')}>
//                     <ListItemIcon>
//                         <DashboardIcon/>
//                     </ListItemIcon>
//                     <ListItemText primary="Dashboard"/>
//                     {open.dashboard ? <ExpandLess/> : <ExpandMore/>}
//                 </ListItemButton>
//                 <Collapse in={open.dashboard} timeout="auto" unmountOnExit>
//                     <List component="div" disablePadding>
//                         <ListItemButton sx={{pl: 4}}>
//                             <ListItemText primary="Overview"/>
//                         </ListItemButton>
//                         <ListItemButton sx={{pl: 4}}>
//                             <ListItemText primary="Analytics"/>
//                         </ListItemButton>
//                     </List>
//                 </Collapse>
//
//                 <ListItemButton onClick={() => handleClick('users')}>
//                     <ListItemIcon>
//                         <PeopleIcon/>
//                     </ListItemIcon>
//                     <ListItemText primary="Users"/>
//                     {open.users ? <ExpandLess/> : <ExpandMore/>}
//                 </ListItemButton>
//                 <Collapse in={open.users} timeout="auto" unmountOnExit>
//                     <List component="div" disablePadding>
//                         <ListItemButton sx={{pl: 4}}>
//                             <ListItemText primary="Manage Users"/>
//                         </ListItemButton>
//                         <ListItemButton sx={{pl: 4}}>
//                             <ListItemText primary="User Roles"/>
//                         </ListItemButton>
//                     </List>
//                 </Collapse>
//
//                 <ListItemButton onClick={() => handleClick('settings')}>
//                     <ListItemIcon>
//                         <SettingsIcon/>
//                     </ListItemIcon>
//                     <ListItemText primary="Settings"/>
//                     {open.settings ? <ExpandLess/> : <ExpandMore/>}
//                 </ListItemButton>
//                 <Collapse in={open.settings} timeout="auto" unmountOnExit>
//                     <List component="div" disablePadding>
//                         <ListItemButton sx={{pl: 4}}>
//                             <ListItemText primary="General"/>
//                         </ListItemButton>
//                         <ListItemButton sx={{pl: 4}}>
//                             <ListItemText primary="Security"/>
//                         </ListItemButton>
//                     </List>
//                 </Collapse>
//             </List>
//         </Drawer>
//     );
// }
//

// import React from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  IconButton,
  useMediaQuery,
  useTheme,   
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import { useLocation, Link, useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const drawerWidth = 240;

interface LeftNavbarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

export default function LeftNavbar({
  mobileOpen,
  handleDrawerToggle,
}: LeftNavbarProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { text: "Products", icon: <InventoryIcon />, path: "/products" },
    { text: "Clients", icon: <PeopleIcon />, path: "/clients" },
    { text: "Accounts", icon: <AccountBalanceIcon />, path: "/accounts" },
    { text: "Purchases", icon: <ShoppingCartIcon />, path: "/purchases" },
    { text: "Sales", icon: <PointOfSaleIcon />, path: "/sales" },
    { text: "Users", icon: <PersonIcon />, path: "/users" },
  ];


  const handleLogout = () => {
    // In a real application, you would handle the logout process here
    // For now, we'll just navigate to the login page
    navigate('/login');
  };

  const drawer = (
    <>
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={handleLogout}
          startIcon={<ExitToAppIcon />}
        >
          Logout
        </Button>
      </Box>
    </>
  );


  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: "none" } }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
