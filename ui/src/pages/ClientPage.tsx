import { useState } from 'react';
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
    Accordion, AccordionSummary, AccordionDetails,
    CssBaseline, ThemeProvider, createTheme
} from '@mui/material';
import LeftNavbar from "./LeftNavbar.tsx";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

interface Client {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
}

export default function ClientsPage() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [clients, setClients] = useState<Client[]>([]);
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = createTheme();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && address && phoneNumber) {
            setClients([...clients, { id: Date.now(), name, address, phoneNumber }]);
            setName('');
            setAddress('');
            setPhoneNumber('');
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
                <LeftNavbar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

                <Box sx={{ width: '100%', maxWidth: '800px', margin: 'auto' }}>
                    <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                        Clients Management
                    </Typography>

                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography variant="h6">Add New Client</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}>
                                <TextField
                                    label="Client Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <TextField
                                    label="Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                                <TextField
                                    label="Phone Number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                />
                                <Button type="submit" variant="contained" sx={{ mt: 2, width: '100%' }}>
                                    Add Client
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
                            <Typography variant="h6">Client List</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Address</TableCell>
                                            <TableCell>Phone Number</TableCell>
                                            <TableCell>Details</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {clients.map((client) => (
                                            <TableRow key={client.id}>
                                                <TableCell>{client.name}</TableCell>
                                                <TableCell>{client.address}</TableCell>
                                                <TableCell>{client.phoneNumber}</TableCell>
                                                <TableCell>
                                                    <Link to={`/clients/${client.id}`} style={{ textDecoration: 'none' }}>
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
