import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

interface User {
  id: number;
  name: string;
  username: string;
  role: string;
}

export default function UserDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // In a real application, you would fetch the user details from an API
    // For this example, we'll use mock data
    const mockUser: User = {
      id: Number(id),
      name: "John Doe",
      username: "johndoe",
      role: "Regular User",
    };
    setUser(mockUser);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send the updated user details to an API
    console.log("Updated user:", user);
    // Navigate back to the users list
    navigate("/users");
  };

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ width: "100%", maxWidth: "600px", margin: "auto", mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          User Details
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ "& .MuiTextField-root": { m: 1, width: "100%" } }}
        >
          <TextField
            label="Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
          <TextField
            label="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            required
          />
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel id="role-select-label">Role</InputLabel>
            <Select
              labelId="role-select-label"
              value={user.role}
              label="Role"
              onChange={(e) => setUser({ ...user, role: e.target.value })}
              required
            >
              <MenuItem value="Regular User">Regular User</MenuItem>
              <MenuItem value="Admin User">Admin User</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Button type="submit" variant="contained">
              Update User
            </Button>
            <Button variant="outlined" onClick={() => navigate("/users")}>
              Back to Users
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
