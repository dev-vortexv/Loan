/* eslint-disable */
import { useState, useEffect } from 'react';
import { Button, Container, Typography, Card, Box, Switch } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Iconify from '../../../ui-component/iconify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModel from '../../../ui-component/Deletemodle';
import { getApi, postApi, deleteApi, EditApi } from 'services/api';
import AddPaymentMethod from './AddPaymentMethod';

const PaymentMethod = () => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const user_Id = localStorage.getItem('user_id');

  const [deleteId, setDeleteId] = useState('');
  const [editData, setEditData] = useState('');
  const [openDelete, setOpenDelete] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);
  const [method, setMethod] = useState([]);

  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const getAllPaymentMethod = async () => {
    const response = await getApi(`paymentMethod/list/?createdBy=${user_Id}`);
    if (response && response.status === 200) {
      setMethod(response?.data?.getAllResult);
    }
  };

  const addMethod = async (values) => {
    const data = values;
    const response = await postApi('paymentMethod/add', data);
    if (response && response.status === 201) {
      getAllPaymentMethod();
    }
  };

  const DeleteMethod = async (id) => {
    const result = await deleteApi(`paymentMethod/delete/${id}`, id);
    if (result && result.status === 200) {
      getAllPaymentMethod();
    }
    handleCloseDelete();
  };

  const UpdateMethod = async (id, values) => {
    const data = values;
    const result = await EditApi(`paymentMethod/edit/${id}`, data);
    if (result && result.status === 200) {
      getAllPaymentMethod();
    }
  };

  useEffect(() => {
    getAllPaymentMethod();
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
      field: 'paymentType',
      headerName: 'Payment Type',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'Status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => {
        const handleChange = async (event) => {
          const newStatus = event.target.checked ? 'active' : 'inactive';

          const payload = {
            status: newStatus
          };
          UpdateMethod(params.row._id, payload);
        };
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Switch {...label} checked={params.row.status === 'active'} onChange={handleChange} />
            <Typography>{params.row.status}</Typography>
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
              <DeleteModel openDelete={openDelete} deleteId={deleteId} handleCloseDelete={handleCloseDelete} deleteData={DeleteMethod} />
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
          Add Method
        </Button>
      </div>
    );
  }
  return (
    <>
      <AddPaymentMethod
        open={openAdd}
        handleClose={handleCloseAdd}
        addMethod={addMethod}
        editData={editData}
        UpdateMethod={UpdateMethod}
        setEditData={setEditData}
      />
      <Container>
        <Box width="100%" sx={{ paddingTop: '15px' }}>
          <Card style={{ height: '600px' }}>
            <DataGrid
              rows={method ?? []}
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

export default PaymentMethod;
