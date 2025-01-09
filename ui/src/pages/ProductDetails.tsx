import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

interface Product {
    id: number;
    name: string;
    unit: string;
}

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        // In a real application, you would fetch the product details from an API
        // For this example, we'll use mock data
        const mockProduct: Product = {
            id: Number(id),
            name: "Sample Product",
            unit: "Piece",
        };
        setProduct(mockProduct);
    }, [id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real application, you would send the updated product details to an API
        console.log('Updated product:', product);
        // Navigate back to the products list
        navigate('/products');
    };

    if (!product) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box sx={{ width: '100%', maxWidth: '600px', margin: 'auto', mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Product Details
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}>
                    <TextField
                        label="Product Name"
                        value={product.name}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        required
                    />
                    <TextField
                        label="Unit"
                        value={product.unit}
                        onChange={(e) => setProduct({ ...product, unit: e.target.value })}
                        required
                    />
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button type="submit" variant="contained">
                            Update Product
                        </Button>
                        <Button variant="outlined" onClick={() => navigate('/products')}>
                            Back to Products
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

