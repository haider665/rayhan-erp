import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

import {
    Accordion, 
    AccordionSummary, 
    AccordionDetails,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
  } from '@mui/material';
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

  import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface Account {
    id: number;
    accountHolderName: string;
    accountNumber: string;
    bankName: string;
    branchName: string;
    balance: number;
}

interface Transaction {
    id: number;
    type: 'Deposit' | 'Withdraw';
    transactionType: string;
    amount: number;
    transactionBy: string;
    transactionDate: Date;
  }

export default function AccountDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [account, setAccount] = useState<Account | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    // New state for transaction form
    const [transactionType, setTransactionType] = useState<'Deposit' | 'Withdraw'>('Deposit');
    const [transactionMethod, setTransactionMethod] = useState('');
    const [amount, setAmount] = useState('');
    const [transactionBy, setTransactionBy] = useState('');
    const [transactionDate, setTransactionDate] = useState<Date | null>(new Date());

    useEffect(() => {
        // In a real application, you would fetch the account details from an API
        // For this example, we'll use mock data
        const mockAccount: Account = {
            id: Number(id),
            accountHolderName: "John Doe",
            accountNumber: "1234567890",
            bankName: "Example Bank",
            branchName: "Main Branch",
            balance: 1000
        };
        setAccount(mockAccount);
    }, [id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real application, you would send the updated account details to an API
        console.log('Updated account:', account);
        // Navigate back to the accounts list
        navigate('/accounts');
    };

    const handleTransactionSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (account && transactionType && transactionMethod && amount && transactionDate && transactionBy) {
          const newTransaction: Transaction = {
            id: Date.now(),
            type: transactionType,
            transactionType: transactionMethod,
            amount: parseFloat(amount),
            transactionBy,
            transactionDate: transactionDate,
          };
    
          // Update balance
          const newBalance = transactionType === 'Deposit' 
            ? account.balance + parseFloat(amount)
            : account.balance - parseFloat(amount);
    
          // Update account and transactions
          setAccount({ ...account, balance: newBalance });
          setTransactions([newTransaction, ...transactions]);
    
          // Reset form
          setTransactionType('Deposit');
          setTransactionMethod('');
          setAmount('');
          setTransactionBy('');
          setTransactionDate(new Date());
        }
      };

    if (!account) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <>
            <Box sx={{ width: '100%', maxWidth: '800px', margin: 'auto', mt: 4 }}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Account Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}>
              <TextField
                label="Account Holder Name"
                value={account.accountHolderName}
                onChange={(e) => setAccount({ ...account, accountHolderName: e.target.value })}
                required
              />
              <TextField
                label="Account Number"
                value={account.accountNumber}
                onChange={(e) => setAccount({ ...account, accountNumber: e.target.value })}
                required
              />
              <TextField
                label="Bank Name"
                value={account.bankName}
                onChange={(e) => setAccount({ ...account, bankName: e.target.value })}
                required
              />
              <TextField
                label="Branch Name"
                value={account.branchName}
                onChange={(e) => setAccount({ ...account, branchName: e.target.value })}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Balance"
                type="number"
                value={account.balance}
                InputProps={{
                  readOnly: true,
                }}
                required
              />
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button type="submit" variant="contained">
                  Update Account
                </Button>
                <Button variant="outlined" onClick={() => navigate('/accounts')}>
                  Back to Accounts
                </Button>
              </Box>
            </Box>
          </Paper>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded sx={{ mt: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="h6">Transactions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>New Transaction</Typography>
            <Box component="form" onSubmit={handleTransactionSubmit} sx={{ '& .MuiFormControl-root': { m: 1, width: '100%' } }}>
              <FormControl fullWidth>
                <InputLabel id="transaction-type-label">Transaction</InputLabel>
                <Select
                  labelId="transaction-type-label"
                  value={transactionType}
                  label="Transaction"
                  onChange={(e) => setTransactionType(e.target.value as 'Deposit' | 'Withdraw')}
                  required
                >
                  <MenuItem value="Deposit">Deposit</MenuItem>
                  <MenuItem value="Withdraw">Withdraw</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="transaction-method-label">Transaction Type</InputLabel>
                <Select
                  labelId="transaction-method-label"
                  value={transactionMethod}
                  label="Transaction Type"
                  onChange={(e) => setTransactionMethod(e.target.value)}
                  required
                >
                  <MenuItem value="Cheque">Cheque</MenuItem>
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                  <MenuItem value="Bkash">Bkash</MenuItem>
                  <MenuItem value="Nagad">Nagad</MenuItem>
                  <MenuItem value="Rocket">Rocket</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                margin="normal"
                label="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
               <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Transaction Date"
                  value={transactionDate}
                  onChange={(newValue) => setTransactionDate(newValue)}
                />
              </LocalizationProvider>
              <TextField
                fullWidth
                margin="normal"
                label="Transaction By"
                value={transactionBy}
                onChange={(e) => setTransactionBy(e.target.value)}
                required
              />
              <Button type="submit" variant="contained" sx={{ mt: 2, width: '100%' }}>
                Submit Transaction
              </Button>
            </Box>
          </Paper>

          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Transaction Type</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Transaction By</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>{transaction.transactionType}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.transactionBy}</TableCell>
                    <TableCell>{transaction.transactionDate.toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </Box>
        </>
    //     <Box sx={{ width: '100%', maxWidth: '600px', margin: 'auto', mt: 4 }}>
    //   <Paper elevation={3} sx={{ p: 4 }}>
    //     <Typography variant="h4" gutterBottom>
    //       Account Details
    //     </Typography>
    //     <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}>
    //       <TextField
    //         label="Account Holder Name"
    //         value={account.accountHolderName}
    //         onChange={(e) => setAccount({ ...account, accountHolderName: e.target.value })}
    //         required
    //       />
    //       <TextField
    //         label="Account Number"
    //         value={account.accountNumber}
    //         onChange={(e) => setAccount({ ...account, accountNumber: e.target.value })}
    //         required
    //       />
    //       <TextField
    //         label="Bank Name"
    //         value={account.bankName}
    //         onChange={(e) => setAccount({ ...account, bankName: e.target.value })}
    //         required
    //       />
    //       <TextField
    //         label="Branch Name"
    //         value={account.branchName}
    //         onChange={(e) => setAccount({ ...account, branchName: e.target.value })}
    //         required
    //       />
    //       <TextField
    //         fullWidth
    //         margin="normal"
    //         label="Balance"
    //         type="number"
    //         value={account.balance}
    //         InputProps={{
    //           readOnly: true,
    //         }}
    //         required
    //       />
    //       <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
    //         <Button type="submit" variant="contained">
    //           Update Account
    //         </Button>
    //         <Button variant="outlined" onClick={() => navigate('/accounts')}>
    //           Back to Accounts
    //         </Button>
    //       </Box>
    //     </Box>
    //   </Paper>
    // </Box>
    );
}

