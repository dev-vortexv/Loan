/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// @mui
import { Stack, Container, Typography, Card, Box, Chip } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getApi } from '../../services/api';

const PaymentDetails = () => {
  const user_id = localStorage.getItem('user_id');

  const [paymentData, setPaymentData] = useState([]);
  const [currencyData, setCurrencyData] = useState([]);

  const getAllPaymentsDetails = async () => {
    const response = await getApi(`payments/list/?createdBy=${user_id}`);
    if (response && response.status === 200) {
      setPaymentData(response?.data?.paymentsData);
    }
  };

  const getCurrencyList = async () => {
    const response = await getApi(`currency/list?createdBy=${user_id}`);
    if (response && response.status === 200) {
      const activeCurrencies = response.data.getAllResult.filter((currency) => currency.currencyStatus === 'active');

      setCurrencyData(activeCurrencies);
    }
  };

  useEffect(() => {
    getAllPaymentsDetails();
    getCurrencyList();
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      field: '_id',
      headerName: 'S.No',
      flex: 0.5,
      cellClassName: 'name-column--cell name-column--cell--capitalize',
      valueGetter: (index) => index.api.getRowIndexRelativeToVisibleRows(index.row._id) + 1
    },
    {
      field: 'title',
      headerName: 'Package Name',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize',
      renderCell: (params) => {
        return <Typography>{`${currencyData[0]?.currencySymbol} ${params?.row?.amount}`} </Typography>;
      }
    },
    {
      field: 'days',
      headerName: 'Days',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'createdOn',
      headerName: 'Start Date & Time',
      flex: 1,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleString(undefined, dateOptions);
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize',
      renderCell: (params) => {
        const status = params.row.active ? 'Subscribed' : 'Unsubscribed';
        return <Chip label={status} variant="outlined" color="primary" />;
      }
    }
  ];

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4"> Payment Details Lists</Typography>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={paymentData ?? []}
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

export default PaymentDetails;
