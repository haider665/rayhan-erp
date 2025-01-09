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
  ThemeProvider,
  CssBaseline,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  createTheme,
} from "@mui/material";
import LeftNavbar from "./LeftNavbar.tsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

interface Account {
  id: number;
  accountHolderName: string;
  accountNumber: string;
  bankName: string;
  branchName: string;
  balance: number;
}

export default function AccountsPage() {
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = createTheme();
  const [balance, setBalance] = useState("");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      accountHolderName &&
      accountNumber &&
      bankName &&
      branchName &&
      balance
    ) {
      setAccounts([
        ...accounts,
        {
          id: Date.now(),
          accountHolderName,
          accountNumber,
          bankName,
          branchName,
          balance: Number(balance),
        },
      ]);
      setAccountHolderName("");
      setAccountNumber("");
      setBankName("");
      setBranchName("");
      setBalance("");
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LeftNavbar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />

        <Box sx={{ width: "100%", maxWidth: "800px", margin: "auto" }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            Accounts Management
          </Typography>

          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6">Add New Account</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ "& .MuiTextField-root": { m: 1, width: "100%" } }}
              >
                <TextField
                  label="Account Holder Name"
                  value={accountHolderName}
                  onChange={(e) => setAccountHolderName(e.target.value)}
                  required
                />
                <TextField
                  label="Account Number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  required
                />
                <TextField
                  label="Bank Name"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  required
                />
                <TextField
                  label="Branch Name"
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Balance"
                  type="number"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2, width: "100%" }}
                >
                  Add Account
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
              <Typography variant="h6">Account List</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Account Holder Name</TableCell>
                      <TableCell>Account Number</TableCell>
                      <TableCell>Bank Name</TableCell>
                      <TableCell>Branch Name</TableCell>
                      <TableCell>Balance</TableCell>
                      <TableCell>Details</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {accounts.map((account) => (
                      <TableRow key={account.id}>
                        <TableCell>{account.accountHolderName}</TableCell>
                        <TableCell>{account.accountNumber}</TableCell>
                        <TableCell>{account.bankName}</TableCell>
                        <TableCell>{account.branchName}</TableCell>
                        <TableCell>{account.balance}</TableCell>
                        <TableCell>
                          <Link
                            to={`/accounts/${account.id}`}
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

        {/*<Box sx={{width: '100%', maxWidth: '800px', margin: 'auto'}}>*/}
        {/*    <Typography variant="h4" gutterBottom sx={{mb: 4}}>*/}
        {/*        Accounts Management*/}
        {/*    </Typography>*/}

        {/*    <Accordion defaultExpanded>*/}
        {/*        <AccordionSummary*/}
        {/*            expandIcon={<ExpandMoreIcon/>}*/}
        {/*            aria-controls="panel1a-content"*/}
        {/*            id="panel1a-header"*/}
        {/*        >*/}
        {/*            <Typography variant="h6">Add New Account</Typography>*/}
        {/*        </AccordionSummary>*/}
        {/*        <AccordionDetails>*/}
        {/*            <Box component="form" onSubmit={handleSubmit}*/}
        {/*                 sx={{'& .MuiTextField-root': {m: 1, width: '100%'}}}>*/}
        {/*                <TextField*/}
        {/*                    label="Account Holder Name"*/}
        {/*                    value={accountHolderName}*/}
        {/*                    onChange={(e) => setAccountHolderName(e.target.value)}*/}
        {/*                    required*/}
        {/*                />*/}
        {/*                <TextField*/}
        {/*                    label="Account Number"*/}
        {/*                    value={accountNumber}*/}
        {/*                    onChange={(e) => setAccountNumber(e.target.value)}*/}
        {/*                    required*/}
        {/*                />*/}
        {/*                <TextField*/}
        {/*                    label="Bank Name"*/}
        {/*                    value={bankName}*/}
        {/*                    onChange={(e) => setBankName(e.target.value)}*/}
        {/*                    required*/}
        {/*                />*/}
        {/*                <TextField*/}
        {/*                    label="Branch Name"*/}
        {/*                    value={branchName}*/}
        {/*                    onChange={(e) => setBranchName(e.target.value)}*/}
        {/*                    required*/}
        {/*                />*/}
        {/*                <Button type="submit" variant="contained" sx={{mt: 2, width: '100%'}}>*/}
        {/*                    Add Account*/}
        {/*                </Button>*/}
        {/*            </Box>*/}
        {/*        </AccordionDetails>*/}
        {/*    </Accordion>*/}

        {/*    <Accordion defaultExpanded sx={{mt: 2}}>*/}
        {/*        <AccordionSummary*/}
        {/*            expandIcon={<ExpandMoreIcon/>}*/}
        {/*            aria-controls="panel2a-content"*/}
        {/*            id="panel2a-header"*/}
        {/*        >*/}
        {/*            <Typography variant="h6">Account List</Typography>*/}
        {/*        </AccordionSummary>*/}
        {/*        <AccordionDetails>*/}
        {/*            <TableContainer component={Paper}>*/}
        {/*                <Table>*/}
        {/*                    <TableHead>*/}
        {/*                        <TableRow>*/}
        {/*                            <TableCell>Account Holder Name</TableCell>*/}
        {/*                            <TableCell>Account Number</TableCell>*/}
        {/*                            <TableCell>Bank Name</TableCell>*/}
        {/*                            <TableCell>Branch Name</TableCell>*/}
        {/*                        </TableRow>*/}
        {/*                    </TableHead>*/}
        {/*                    <TableBody>*/}
        {/*                        {accounts.map((account) => (*/}
        {/*                            <TableRow key={account.id}>*/}
        {/*                                <TableCell>{account.accountHolderName}</TableCell>*/}
        {/*                                <TableCell>{account.accountNumber}</TableCell>*/}
        {/*                                <TableCell>{account.bankName}</TableCell>*/}
        {/*                                <TableCell>{account.branchName}</TableCell>*/}
        {/*                            </TableRow>*/}
        {/*                        ))}*/}
        {/*                    </TableBody>*/}
        {/*                </Table>*/}
        {/*            </TableContainer>*/}
        {/*        </AccordionDetails>*/}
        {/*    </Accordion>*/}
        {/*</Box>*/}
      </ThemeProvider>
    </>
  );
}
