/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// @mui
import { Stack, Container, Typography, Card, Box, IconButton, Tooltip } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { EditApi, getApi } from 'services/api';
import AddIcon from '@mui/icons-material/Add';
import AddReceivedPayments from './AddReceivedPayments';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const ActiveLoans = () => {
  const userId = localStorage.getItem('user_id');
  const navigate = useNavigate();

  const [activeLoanData, setActiveLoanData] = useState([]);
  const [currencyData, setCurrencyData] = useState([]);
  const [openReceivedPayment, setOpenReceivedPayment] = useState(false);
  const [loanAmount, setLoanAmount] = useState('');
  const [paymentData, setPaymentData] = useState([]);

  const handleOpenReceivedPayment = () => setOpenReceivedPayment(true);
  const handleCloseReceivedPayment = () => setOpenReceivedPayment(false);

  const getActiveLoanList = async () => {
    const response = await getApi(`loan/list/approved?createdBy=${userId}`);
    if (response && response.status === 200) {
      setActiveLoanData(response.data.loans);
    }
  };

  const getCurrencyList = async () => {
    const response = await getApi(`currency/list?createdBy=${userId}`);
    if (response && response.status === 200) {
      const activeCurrencies = response.data.getAllResult.filter((currency) => currency.currencyStatus === 'active');

      setCurrencyData(activeCurrencies);
    }
  };

  const AddPaymentReceived = async (id, data) => {
    const response = await EditApi(`loan/ReceivePayment/${id}`, data);
    if (response && response.status === 200) {
      getActiveLoanList();
    }
  };

  const getAllPaymentMethodList = async () => {
    const response = await getApi(`paymentMethod/list/?createdBy=${userId}`);
    if (response && response.status === 200) {
      setPaymentData(response.data.getAllResult);
    }
  };

  useEffect(() => {
    getActiveLoanList();
    getCurrencyList();
    getAllPaymentMethodList();
  }, []);

  const calculateDueDate = (releaseDate, loanDuration, durationPeriod) => {
    const releaseDateTime = new Date(releaseDate);

    // Calculate the due date based on loan duration and duration period
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
      field: 'loanStatus',
      headerName: 'Loan Status',
      flex: 1
    },
    {
      field: 'monthlyEmi',
      headerName: 'Monthly Emi',
      flex: 1,
      renderCell: (params) => {
        return <Typography>{`${currencyData[0]?.currencySymbol} ${params?.row?.monthlyEmi ? params?.row?.monthlyEmi : '--'}`} </Typography>;
      }
    },

    {
      field: 'repaymentAmount',
      headerName: 'Total Amount',
      flex: 1,
      renderCell: (params) => {
        return <Typography>{`${currencyData[0]?.currencySymbol} ${params?.row?.repaymentAmount}`} </Typography>;
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
      field: 'Action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => {
        const handleCellClick = (row) => {
          setLoanAmount(row);
          handleOpenReceivedPayment();
        };
        const handleHistoryClick = (params) => {
          navigate(`/ReceivedPayment/History/${params.row._id}`);
        };
        return (
          <Box>
            <Tooltip title="Add Received Payment">
              <IconButton fontSize="40px" color="primary" onClick={() => handleCellClick(params.row)}>
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="View History">
              <IconButton fontSize="40px" color="secondary" onClick={() => handleHistoryClick(params)}>
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      }
    }
  ];

  return (
    <>
      <AddReceivedPayments
        open={openReceivedPayment}
        handleClose={handleCloseReceivedPayment}
        loanAmount={loanAmount}
        AddPaymentReceived={AddPaymentReceived}
        paymentData={paymentData}
      />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Active-Loans-Lists</Typography>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={activeLoanData ?? []}
                columns={columns}
                getRowId={(row) => row._id}
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true } }}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};

export default ActiveLoans;
