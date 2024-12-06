/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// @mui
import { Stack, Container, Typography, Card, Box, Chip } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getApi } from 'services/api';


// ----------------------------------------------------------------------

const PaymentsDetails = () => {
  const user_id = localStorage.getItem('user_id');
  const userRole = localStorage.getItem('userRole');
  

  const [paymentData, setPaymentData] = useState([]);

  const getAllPaymentsDetails = async () => {
    const response = await getApi(userRole === 'superadmin' ? `payments/totalPayment` : `payments/totalPayment/?createdBy=${user_id}`);
    if (response && response.status === 200) {
      setPaymentData(response?.data?.paymentsData);
    }
  };

  useEffect(() => {
    getAllPaymentsDetails();
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      field: 'id',
      headerName: 'SNo',
      flex: 0.5,
      cellClassName: 'name-column--cell name-column--cell--capitalize',
      valueGetter: (index) => index.api.getRowIndexRelativeToVisibleRows(index.row._id) + 1
    },

    {
      field: 'userId',
      headerName: 'UserName',
      flex: 1,
      valueGetter: (params) => {
        return `${params?.row?.createdBy?.firstName} ${params?.row?.createdBy?.lastName}`;
      }
    },

    {
      field: 'title',
      headerName: 'Title',
      flex: 1
    },
    {
      field: 'days',
      headerName: 'Days',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'startDate',
      headerName: 'StartDate',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize',
      valueGetter: (params) => {
        const startDate = new Date(params.row.createdOn);
        const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return startDate.toLocaleString(undefined, dateOptions);
      }
    },
    {
      field: 'endDate',
      headerName: 'payment.EndDate',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize',
      valueGetter: (params) => {
        const startDate = new Date(params.row.createdOn);
        const durationInDays = params.row.days;
        const endDate = new Date(startDate.getTime() + parseInt(durationInDays) * 24 * 60 * 60 * 1000);
        const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return endDate.toLocaleString(undefined, dateOptions);
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize',
      renderCell: (params) => {
        const status = params.row.active ? 'Subscribed': 'Unsubscribed';
        return <Chip label={status} variant="outlined" color="primary" />;
      }
    }
  ];

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">PaymentsList</Typography>
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

export default PaymentsDetails;
