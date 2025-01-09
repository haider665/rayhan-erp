import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface Sale {
  id: number;
  productId: number;
  clientId: number;
  quantity: number;
  saleDate: Date;
  saleBy: string;
  amount: number;
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

export default function SalesDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sale, setSale] = useState<Sale | null>(null);

  useEffect(() => {
    // In a real application, you would fetch the sale details from an API
    // For this example, we'll use mock data
    const mockSale: Sale = {
      id: Number(id),
      productId: 1,
      clientId: 1,
      quantity: 5,
      saleDate: new Date(),
      saleBy: "John Doe",
      amount: 500
    };
    setSale(mockSale);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send the updated sale details to an API
    console.log('Updated sale:', sale);
    // Navigate back to the sales list
    navigate('/sales');
  };

  if (!sale) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ width: '100%', maxWidth: '600px', margin: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Sale Details
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiFormControl-root': { m: 1, width: '100%' } }}>
          <FormControl fullWidth>
            <InputLabel id="product-select-label">Product</InputLabel>
            <Select
              labelId="product-select-label"
              value={sale.productId}
              label="Product"
              onChange={(e) => setSale({ ...sale, productId: Number(e.target.value) })}
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
              value={sale.clientId}
              label="Client"
              onChange={(e) => setSale({ ...sale, clientId: Number(e.target.value) })}
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
            value={sale.quantity}
            onChange={(e) => setSale({ ...sale, quantity: Number(e.target.value) })}
            required
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Sale Date"
              value={sale.saleDate}
              onChange={(newValue) => setSale({ ...sale, saleDate: newValue || new Date() })}
            />
          </LocalizationProvider>
          <TextField
            label="Sale By"
            value={sale.saleBy}
            onChange={(e) => setSale({ ...sale, saleBy: e.target.value })}
            required
          />
          <TextField
            label="Amount"
            type="number"
            value={sale.amount}
            onChange={(e) => setSale({ ...sale, amount: Number(e.target.value) })}
            required
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button type="submit" variant="contained">
              Update Sale
            </Button>
            <Button variant="outlined" onClick={() => navigate('/sales')}>
              Back to Sales
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

