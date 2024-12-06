/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// @mui
import { Stack, Button, Container, Typography, Card, Box } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModel from '../../ui-component/Deletemodle';
import EditPackages from './EditPackages';
import Iconify from '../../ui-component/iconify';
import AddPackages from './AddPackages';
import { getApi, postApi, EditApi, deleteApi } from '../../services/api';


// ----------------------------------------------------------------------

const PackagesDetails = () => {
  const userRole = localStorage.getItem('userRole');
  const userId = localStorage.getItem('user_id');
  

  const [openAdd, setOpenAdd] = useState(false);
  const [packageData, setPackageData] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState([]);
  const [deleteId, setDeleteId] = useState('');

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const addPackagesData = async (data) => {
    const response = await postApi(userRole === 'admin' ? `packages/add` : `packages/add/?createdBy=${userId}`, data);
    if (response && response.status === 201) {
      getAllPackagesData();
    }
  };

  const getAllPackagesData = async () => {
    const response = await getApi(userRole === 'admin' ? `packages/list` : `packages/list/?createdBy=${userId}`);
    if (response && response.status === 200) {
      setPackageData(response?.data?.packagesAllData);
    }
  };

  const deletePackagesData = async (id) => {
    const result = await deleteApi(`packages/delete/${id}`, id);
    if (result && result.status === 200) {
      getAllPackagesData();
    }
    handleCloseDelete();
  };

  // edit packages api
  const editPackagesData = async (values) => {
    const data = values;
    const result = await EditApi(`packages/edit/${editData?._id}`, data);

    if (result && result.status === 200) {
      getAllPackagesData();
    }
  };

  useEffect(() => {
    getAllPackagesData();
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      field: '_id',
      headerName: 'SNo',
      flex: 0.5,
      cellClassName: 'name-column--cell name-column--cell--capitalize',
      valueGetter: (index) => index.api.getRowIndexRelativeToVisibleRows(index.row._id) + 1
    },
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },

    {
      field: 'description',
      headerName: 'Description',
      flex: 1
    },

    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1
    },
    {
      field: 'days',
      headerName: 'Days',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      // eslint-disable-next-line arrow-body-style
      renderCell: (params) => {
        const handleEditClick = async (data) => {
          setEditData(data);
          handleOpenEdit();
        };
        const handleDeleteClick = async (data) => {
          setDeleteId(data._id);
          handleOpenDelete();
        };
        return (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EditPackages open={openEdit} editData={editData} handleClose={handleCloseEdit} editPackagesData={editPackagesData} />
              <Box onClick={() => handleEditClick(params?.row)}>
                <EditIcon sx={{ color: '#6F2DA8' }} />
              </Box>
              <DeleteModel
                openDelete={openDelete}
                deleteId={deleteId}
                handleCloseDelete={handleCloseDelete}
                deleteData={deletePackagesData}
              />
              <Box onClick={() => handleDeleteClick(params?.row)}>
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
      <AddPackages open={openAdd} handleClose={handleCloseAdd} addPackagesData={addPackagesData} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4"> PackagesList</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              NewPackages
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={packageData ?? []}
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

export default PackagesDetails;
