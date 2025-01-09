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
    CssBaseline, Accordion, AccordionSummary, AccordionDetails, ThemeProvider, createTheme
} from '@mui/material';
import LeftNavbar from "./LeftNavbar.tsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from 'react-router-dom';

interface Product {
    id: number;
    name: string;
    unit: string;
}

export default function ProductPage() {
    const [name, setName] = useState('');
    const [unit, setUnit] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = createTheme();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && unit) {
            setProducts([...products, { id: Date.now(), name, unit }]);
            setName('');
            setUnit('');
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
                        Products Management
                    </Typography>

                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography variant="h6">Add New Product</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}>
                                <TextField
                                    label="Product Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <TextField
                                    label="Unit"
                                    value={unit}
                                    onChange={(e) => setUnit(e.target.value)}
                                    required
                                />
                                <Button type="submit" variant="contained" sx={{ mt: 2, width: '100%' }}>
                                    Add Product
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
                            <Typography variant="h6">Product List</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Unit</TableCell>
                                            <TableCell>Details</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {products.map((product) => (
                                            <TableRow key={product.id}>
                                                <TableCell>{product.name}</TableCell>
                                                <TableCell>{product.unit}</TableCell>
                                                <TableCell>
                                                    <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
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

