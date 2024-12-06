/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// @mui
import { Stack, Container, Typography, Card, Box, Button, Menu, MenuItem, Snackbar, Alert } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { EditApi, getApi, postApi } from 'services/api';
// --------------------------------------------------------------------

const PendingLoans = () => {
  const userId = localStorage.getItem('user_id');

  const [pendingLoanData, setPendingLoanData] = useState([]);
  const [currencyData, setCurrencyData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null); 
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' }); 

  const getPendingLoanList = async () => {
    const response = await getApi(`loan/list/pending?createdBy=${userId}`);
    if (response && response.status === 200) {
      setPendingLoanData(response.data.loans);
    }
  };

  const calculateDueDate = (releaseDate, loanDuration, durationPeriod) => {
    const releaseDateTime = new Date(releaseDate);

    let dueDate = new Date(releaseDateTime);

    switch (durationPeriod) {
      case 'daily':
        dueDate.setDate(dueDate.getDate() + loanDuration);
        break;
      case 'weekly':
        dueDate.setDate(dueDate.getDate() + loanDuration * 7);
        break;
      case 'monthly':
        dueDate.setMonth(dueDate.getMonth() + loanDuration);
        break;
      case 'yearly':
        dueDate.setFullYear(dueDate.getFullYear() + loanDuration);
        break;
      default:
        return null;
    }

    return dueDate;
  };

  const getCurrencyList = async () => {
    const response = await getApi(`currency/list?createdBy=${userId}`);
    if (response && response.status === 200) {
      const activeCurrencies = response.data.getAllResult.filter((currency) => currency.currencyStatus === 'active');

      setCurrencyData(activeCurrencies);
    }
  };

  const handleActionClick = (event, rowId) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(rowId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };

  const updateLoanStatus = async (status) => {
   
    try {
      const response = await EditApi(`loan/edit/${selectedRowId}`, {loanStatus:status});

      if (response && response.status === 200) {
       
        getPendingLoanList();
        setPendingLoanData((prevData) =>
          prevData.map((loan) => (loan._id === selectedRowId ? { ...loan, loanStatus: status } : loan))
        );
        setSnackbar({ open: true, message: 'Status updated successfully!', severity: 'success' });
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Error updating status!', severity: 'error' });
    }
  };

  const handleAction = (actionType) => {
    updateLoanStatus(actionType); 
    handleMenuClose();
  };

  useEffect(() => {
    getPendingLoanList();
    getCurrencyList();
  }, []);

  const columns = [
    {
      field: '_id',
      headerName: 'S.No.',
      flex: 0.5,
      cellClassName: 'name-column--cell name-column--cell--capitalize',
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1
    },
    {
      field: 'loanNumber',
      headerName: 'Loan Number',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'borrowers',
      headerName: 'Borrowers',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'loanType',
      headerName: 'Loan Type',
      flex: 1
    },
    {
      field: 'loanStatus',
      headerName: 'Loan Status',
      flex: 1
    },
    {
      field: 'principleAmount',
      headerName: 'Principle Amount',
      flex: 1,
      renderCell: (params) => {
        return <Typography>{`${currencyData[0]?.currencySymbol} ${params?.row?.principleAmount}`} </Typography>;
      }
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      flex: 1,
      renderCell: (params) => {
        return (
          <Typography>
            {params?.row?.releaseDate
              ? calculateDueDate(params?.row?.releaseDate, params?.row?.loanDuration, params?.row?.durationPeriod)?.toDateString()
              : '-'}
          </Typography>
        );
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            size="small"
            onClick={(event) => handleActionClick(event, params.id)}
          >
            Actions
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectedRowId === params.id}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleAction('approved')}>Approved</MenuItem>
            <MenuItem onClick={() => handleAction('denied')}>Denied</MenuItem>
            <MenuItem onClick={() => handleAction('defaulted')}>Default</MenuItem>
          </Menu>
        </>
      )
    }
  ];

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Pending-Loans-Lists</Typography>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={pendingLoanData ?? []}
                columns={columns}
                getRowId={(row) => row._id}
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true } }}
              />
            </Card>
          </Box>
        </TableStyle>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default PendingLoans;
