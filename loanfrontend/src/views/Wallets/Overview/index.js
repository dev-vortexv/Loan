import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Stack, Button, Container, Card, Box, Chip } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModel from '../../../ui-component/Deletemodle';
import { getApi, deleteApi } from 'services/api';
import Header from '../../../ui-component/Header';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const OverViewWallets = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [deleteId, setDeleteId] = useState('');
  const [openDelete, setOpenDelete] = useState(false);
  const [rows, setRows] = useState([]); // New state for formatted rows

  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const backToList = () => {
    navigate('/Wallets/walletList');
  };

  const getAllWalletHistory = async () => {
    const response = await getApi(`wallet/view/${params.id}`);
    if (response && response.status === 200) {
      const walletData = response?.data?.walletDetails;

      const formattedRows = walletData?.transactions?.map((transaction) => ({
        ...transaction,
        walletName: walletData.walletName,
        totalAmount: walletData.addFunds,
        transactionDate: new Date(transaction.transactionDate).toLocaleString(),
        _id: transaction._id
      }));

      setRows(formattedRows);
    }
  };

  const DeleteWalletHistory = async (deleteId) => {
    const result = await deleteApi(`wallet/deleteHistory/${deleteId}`);
    if (result && result.status === 200) {
      getAllWalletHistory();
    }
    handleCloseDelete();
  };

  useEffect(() => {
    getAllWalletHistory();
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      field: '_id',
      headerName: 'S.No.',
      flex: 0.5,
      valueGetter: (index) => index.api.getRowIndexRelativeToVisibleRows(index.row._id) + 1
    },
    {
      field: 'walletName',
      headerName: 'Wallet Name',
      flex: 1
    },
    {
      field: 'transactionType',
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
      field: 'amount',
      headerName: 'Add Amount',
      flex: 1
    },
    {
      field: 'updatedBalance',
      headerName: 'Total Amount',
      flex: 1
    },
    {
      field: 'transactionDate',
      headerName: 'Transaction Date',
      flex: 1
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => {
        const handleDeleteClick = async (id) => {
          setDeleteId(id);
          handleOpenDelete();
        };

        return (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <DeleteModel
                openDelete={openDelete}
                deleteId={deleteId}
                handleCloseDelete={handleCloseDelete}
                deleteData={DeleteWalletHistory}
              />
              <Box onClick={() => handleDeleteClick(params?.row._id)}>
                <DeleteIcon sx={{ color: 'red' }} />
              </Box>
            </Box>
          </>
        );
      }
    }
  ];

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" mb={3} justifyContent={'space-between'} width={'100%'}>
          <Header title={'Wallets Funds History'} />
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" color="primary" onClick={backToList} startIcon={<ArrowBackIosIcon />}>
              Back
            </Button>
          </Stack>
        </Stack>
        <Box width="100%">
          <Card style={{ height: '600px', paddingTop: '15px' }}>
            <DataGrid
              rows={rows ?? []}
              columns={columns}
              getRowId={(row) => row._id}
              slots={{ toolbar: GridToolbar }}
              slotProps={{ toolbar: { showQuickFilter: true } }}
            />
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default OverViewWallets;
