import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CssBaseline,
  ThemeProvider,
  createTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import LeftNavbar from "./LeftNavbar.tsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

interface User {
  id: number;
  name: string;
  username: string;
  role: string;
}

export default function UserPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [role, setRole] = useState("");

  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = createTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (name && username && password && role) {
      const newUser: User = {
        id: Date.now(),
        name,
        username,
        role,
      };
      setUsers([...users, newUser]);
      setName("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setRole("");
    }
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
        <LeftNavbar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />

        <Box sx={{ width: "100%", maxWidth: "800px", margin: "auto" }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            User Management
          </Typography>

          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6">Add New User</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ "& .MuiTextField-root": { m: 1, width: "100%" } }}
              >
                <TextField
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <TextField
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <TextField
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel id="role-select-label">Role</InputLabel>
                  <Select
                    labelId="role-select-label"
                    value={role}
                    label="Role"
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <MenuItem value="Regular User">Regular User</MenuItem>
                    <MenuItem value="Admin User">Admin User</MenuItem>
                  </Select>
                </FormControl>
                {error && (
                  <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                  </Typography>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2, width: "100%" }}
                >
                  Add User
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded sx={{ mt: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography variant="h6">User List</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Username</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Details</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <Link
                            to={`/users/${user.id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <Button variant="outlined" size="small">
                              View Details
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        </Box>
      </ThemeProvider>
    </>
  );
}
