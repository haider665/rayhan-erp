import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Paper, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface Purchase {
    id: number;
    productId: number;
    clientId: number;
    quantity: number;
    purchaseDate: Date;
    purchaseBy: string;
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

export default function PurchaseDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [purchase, setPurchase] = useState<Purchase | null>(null);

    useEffect(() => {
        // In a real application, you would fetch the purchase details from an API
        // For this example, we'll use mock data
        const mockPurchase: Purchase = {
            id: Number(id),
            productId: 1,
            clientId: 1,
            quantity: 10,
            purchaseDate: new Date(),
            purchaseBy: "John Doe",
        };
        setPurchase(mockPurchase);
    }, [id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real application, you would send the updated purchase details to an API
        console.log('Updated purchase:', purchase);
        // Navigate back to the purchases list
        navigate('/purchases');
    };

    if (!purchase) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box sx={{ width: '100%', maxWidth: '600px', margin: 'auto', mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Purchase Details
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiFormControl-root': { m: 1, width: '100%' } }}>
                    <FormControl fullWidth>
                        <InputLabel id="product-select-label">Product</InputLabel>
                        <Select
                            labelId="product-select-label"
                            value={purchase.productId}
                            label="Product"
                            onChange={(e) => setPurchase({ ...purchase, productId: Number(e.target.value) })}
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
                            value={purchase.clientId}
                            label="Client"
                            onChange={(e) => setPurchase({ ...purchase, clientId: Number(e.target.value) })}
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
                        value={purchase.quantity}
                        onChange={(e) => setPurchase({ ...purchase, quantity: Number(e.target.value) })}
                        required
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Purchase Date"
                            value={purchase.purchaseDate}
                            onChange={(newValue) => setPurchase({ ...purchase, purchaseDate: newValue || new Date() })}
                        />
                    </LocalizationProvider>
                    <TextField
                        label="Purchase By"
                        value={purchase.purchaseBy}
                        onChange={(e) => setPurchase({ ...purchase, purchaseBy: e.target.value })}
                        required
                    />
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button type="submit" variant="contained">
                            Update Purchase
                        </Button>
                        <Button variant="outlined" onClick={() => navigate('/purchases')}>
                            Back to Purchases
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

