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
    CssBaseline, ThemeProvider, createTheme, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import LeftNavbar from "./LeftNavbar.tsx";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

interface Sales {
    id: number;
    productId: number;
    clientId: number;
    quantity: number;
    salesDate: Date;
    saleBy: string;
}

// Mock data for products and clients
const products = [
    { id: 1, name: 'Product A' },
    { id: 2, name: 'Product B' },
    { id: 3, name: 'Product C' },
];

const clients = [
    { id: 1, name: 'Client X' },
    { id: 2, name: 'Client Y' },
    { id: 3, name: 'Client Z' },
];

export default function SalesPage() {
    const [productId, setProductId] = useState('');
    const [clientId, setClientId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [salesDate, setSalesDate] = useState<Date | null>(null);
    const [SaleBy, setSaleBy] = useState('');
    const [sales, setSales] = useState<Sales[]>([]);

    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = createTheme();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (productId && clientId && quantity && salesDate && SaleBy) {
            setSales([...sales, {
                id: Date.now(),
                productId: Number(productId),
                clientId: Number(clientId),
                quantity: Number(quantity),
                salesDate: salesDate,
                saleBy: SaleBy
            }]);
            setProductId('');
            setClientId('');
            setQuantity('');
            setSalesDate(null);
            setSaleBy('');
        }
    };
    return (
        <>

            <ThemeProvider theme={theme}>
                <CssBaseline />

                <LeftNavbar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

                <Box sx={{ width: '100%', maxWidth: '800px', margin: 'auto' }}>
                    <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                        Sales Management
                    </Typography>

                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography variant="h6">Add New Sale</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiFormControl-root': { m: 1, width: '100%' } }}>
                                <FormControl fullWidth>
                                    <InputLabel id="product-select-label">Product</InputLabel>
                                    <Select
                                        labelId="product-select-label"
                                        value={productId}
                                        label="Product"
                                        onChange={(e) => setProductId(e.target.value)}
                                        required
                                    >
                                        {products.map((product) => (
                                            <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="client-select-label">Client</InputLabel>
                                    <Select
                                        labelId="client-select-label"
                                        value={clientId}
                                        label="Client"
                                        onChange={(e) => setClientId(e.target.value)}
                                        required
                                    >
                                        {clients.map((client) => (
                                            <MenuItem key={client.id} value={client.id}>{client.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField
                                    label="Quantity"
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    required
                                />
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Sale Date"
                                        value={salesDate}
                                        onChange={(newValue) => setSalesDate(newValue)}
                                    />
                                </LocalizationProvider>
                                <TextField
                                    label="Sale By"
                                    value={SaleBy}
                                    onChange={(e) => setSaleBy(e.target.value)}
                                    required
                                />
                                <Button type="submit" variant="contained" sx={{ mt: 2, width: '100%' }}>
                                    Add Sale
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
                            <Typography variant="h6">Sales List</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Product</TableCell>
                                            <TableCell>Client</TableCell>
                                            <TableCell>Quantity</TableCell>
                                            <TableCell>Sale Date</TableCell>
                                            <TableCell>Sale By</TableCell>
                                            <TableCell>Details</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {sales.map((sale) => (
                                            <TableRow key={sale.id}>
                                                <TableCell>{products.find(p => p.id === sale.productId)?.name}</TableCell>
                                                <TableCell>{clients.find(c => c.id === sale.clientId)?.name}</TableCell>
                                                <TableCell>{sale.quantity}</TableCell>
                                                <TableCell>{sale.salesDate.toLocaleDateString()}</TableCell>
                                                <TableCell>{sale.saleBy}</TableCell>
                                                <TableCell>
                                                    <Link to={`/sales/${sale.id}`} style={{ textDecoration: 'none' }}>
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
