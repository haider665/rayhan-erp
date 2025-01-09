import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

interface Client {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
}

export default function ClientDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [client, setClient] = useState<Client | null>(null);

    useEffect(() => {
        // In a real application, you would fetch the client details from an API
        // For this example, we'll use mock data
        const mockClient: Client = {
            id: Number(id),
            name: "John Doe",
            address: "123 Main St, Anytown, USA",
            phoneNumber: "555-1234",
        };
        setClient(mockClient);
    }, [id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real application, you would send the updated client details to an API
        console.log('Updated client:', client);
        // Navigate back to the clients list
        navigate('/clients');
    };

    if (!client) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box sx={{ width: '100%', maxWidth: '600px', margin: 'auto', mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Client Details
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}>
                    <TextField
                        label="Client Name"
                        value={client.name}
                        onChange={(e) => setClient({ ...client, name: e.target.value })}
                        required
                    />
                    <TextField
                        label="Address"
                        value={client.address}
                        onChange={(e) => setClient({ ...client, address: e.target.value })}
                        required
                    />
                    <TextField
                        label="Phone Number"
                        value={client.phoneNumber}
                        onChange={(e) => setClient({ ...client, phoneNumber: e.target.value })}
                        required
                    />
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button type="submit" variant="contained">
                            Update Client
                        </Button>
                        <Button variant="outlined" onClick={() => navigate('/clients')}>
                            Back to Clients
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

