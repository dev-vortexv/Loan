/* eslint-disable */
import { useState, useEffect } from 'react';
import { Stack, Button, Container, Typography, Card, Box, Switch } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Iconify from '../../../ui-component/iconify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModel from '../../../ui-component/Deletemodle';
import { getApi, postApi, deleteApi, EditApi } from 'services/api';
import AddCurrency from './AddCurrency';
import { toast } from 'react-toastify';

const Currency = () => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const user_Id = localStorage.getItem('user_id');

  const [deleteId, setDeleteId] = useState('');
  const [editData, setEditData] = useState('');
  const [openDelete, setOpenDelete] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);
  const [currency, setCurrency] = useState([]);

  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const getAllCurrency = async () => {
    const response = await getApi(`currency/list/?createdBy=${user_Id}`);
    if (response && response.status === 200) {
      setCurrency(response?.data?.getAllResult);
    }
  };

  const addCurrency = async (values) => {
    const data = values;
    const response = await postApi('currency/add', data);
    if (response && response.status === 201) {
      getAllCurrency();
    }
  };

  const DeleteCurrency = async (id) => {
    const result = await deleteApi(`currency/delete/${id}`, id);
    if (result && result.status === 200) {
      getAllCurrency();
    }
    handleCloseDelete();
  };

  const UpdateCurrency = async (id, values) => {
    const data = values;
    const result = await EditApi(`currency/edit/${id}`, data);
    if (result && result.status === 200) {
      getAllCurrency();
    }
  };

  useEffect(() => {
    getAllCurrency();
  }, []);

  const columns = [
    {
      field: '_id',
      headerName: 'S.No.',
      flex: 0.5,
      cellClassName: 'name-column--cell name-column--cell--capitalize',
      valueGetter: (index) => index.api.getRowIndexRelativeToVisibleRows(index.row._id) + 1
    },
    {
      field: 'currencyName',
      headerName: 'Currency Name',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'currencySymbol',
      headerName: 'Currency Symbol',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'currencyStatus',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => {
        const handleChange = async (event) => {
          const newStatus = event.target.checked ? 'active' : 'inactive';

          const activeCurrency = currency.find((curr) => curr.currencyStatus === 'active');

          if (newStatus === 'active' && activeCurrency && activeCurrency._id !== params.row._id) {
            toast.error('Only one currency can be active at a time');
            return;
          }

          const payload = {
            currencyStatus: newStatus
          };
          UpdateCurrency(params.row._id, payload);
        };
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Switch {...label} checked={params.row.currencyStatus === 'active'} onChange={handleChange} />
            <Typography>{params.row.currencyStatus}</Typography>
          </Box>
        );
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => {
        const handleEditClick = async (data) => {
          setEditData(data);
          handleOpenAdd();
        };
        const handleDeleteClick = async (id) => {
          setDeleteId(id);
          handleOpenDelete();
        };

        return (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box onClick={() => handleEditClick(params?.row)}>
                <EditIcon sx={{ color: '#6F2DA8' }} />
              </Box>
              <DeleteModel openDelete={openDelete} deleteId={deleteId} handleCloseDelete={handleCloseDelete} deleteData={DeleteCurrency} />
              <Box onClick={() => handleDeleteClick(params?.row._id)}>
                <DeleteIcon sx={{ color: 'red' }} />
              </Box>
            </Box>
          </>
        );
      }
    }
  ];

  function CustomToolbar({ handleOpenAdd }) {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <GridToolbar />
        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
          Add Currency
        </Button>
      </div>
    );
  }
  return (
    <>
      <AddCurrency
        open={openAdd}
        handleClose={handleCloseAdd}
        addCurrency={addCurrency}
        editData={editData}
        UpdateCurrency={UpdateCurrency}
        setEditData={setEditData}
      />
      <Container>
        <Box width="100%" sx={{ paddingTop: '15px' }}>
          <Card style={{ height: '600px' }}>
            <DataGrid
              rows={currency ?? []}
              columns={columns}
              getRowId={(row) => row._id}
              slots={{ toolbar: CustomToolbar }}
              slotProps={{ toolbar: { handleOpenAdd } }}
              pageSize={10}
              rowsPerPageOptions={[10, 20, 50]}
            />
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default Currency;
