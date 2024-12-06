/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

// @mui
import { Stack, Container, Typography, Card, Box, Chip, IconButton } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getApi, deleteApi } from 'services/api';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModel from '../../ui-component/Deletemodle';

// ----------------------------------------------------------------------

const Transactions = () => {
  const userId = localStorage.getItem('user_id');

  const [transactionData, setTransactionData] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [currencyData, setCurrencyData] = useState([]);

  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const getTransferList = async () => {
    const response = await getApi(`transfer/list?createdBy=${userId}`);
    if (response && response.status === 200) {
      setTransactionData(response.data.getAllResult);
    }
  };

  const getTransferDelete = async (id) => {
    const response = await deleteApi(`transfer/delete/${id}`);
    if (response && response.status === 200) {
      getTransferList();
    }
    handleCloseDelete();
  };

  const getCurrencyList = async () => {
    const response = await getApi(`currency/list?createdBy=${userId}`);
    if (response && response.status === 200) {
      const activeCurrencies = response.data.getAllResult.filter((currency) => currency.currencyStatus === 'active');

      setCurrencyData(activeCurrencies);
    }
  };

  useEffect(() => {
    getTransferList();
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
      field: 'createdOn',
      headerName: 'Transaction Date',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize',
      valueFormatter: (params) => new Date(params.value).toLocaleString('en-US')
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1,
      renderCell: (params) => {
        return <Typography>{`${currencyData[0]?.currencySymbol} ${params?.row?.amount}`} </Typography>;
      }
    },
    {
      field: 'type',
      headerName: 'Type',
      flex: 1,
      renderCell: (params) => {
        return (
          <Chip
            label={params?.value ? params?.value : 'N/A'}
            color={params?.value === 'deposit' ? 'success' : params?.value === 'withdrawal' ? 'error' : 'default'}
            variant="outlined"
          />
        );
      }
    },
    {
      field: 'toAccount',
      headerName: 'Wallet Name',
      flex: 1
    },
    {
      field: 'receiver',
      headerName: 'Payee',
      flex: 1,
      renderCell: (params) => <Typography>{`${params?.row?.createdBy?.firstName} ${params?.row?.createdBy?.lastName}`}</Typography>
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => {
        const handleDeleteClick = (rowData) => {
          setDeleteId(rowData.row._id);
          handleOpenDelete();
        };
        return (
          <Box>
            <IconButton color="error" onClick={() => handleDeleteClick(params)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      }
      // eslint-disable-next-line arrow-body-style
    }
  ];

  return (
    <>
      <DeleteModel openDelete={openDelete} handleCloseDelete={handleCloseDelete} deleteId={deleteId} deleteData={getTransferDelete} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Transactions-Lists</Typography>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={transactionData ?? []}
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

export default Transactions;
