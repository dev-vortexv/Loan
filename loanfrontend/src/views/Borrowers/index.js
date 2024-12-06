/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// @mui
import { Stack, Button, Container, Typography, Box, Card, IconButton } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TableStyle from '../../ui-component/TableStyle';
import AddBorrowersWithStepper from './AddBorrowers.js';
import { postApi, getApi, deleteApi, EditApi } from 'services/api';
import DeleteModel from '../../ui-component/Deletemodle';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../ui-component/iconify';

// ----------------------------------------------------------------------

const Borrowers = () => {
  const userId = localStorage.getItem('user_id');
  const navigate = useNavigate();

  const [borrowerData, setBorrowerData] = useState([]);
  const [deleteBorrowerData, setDeleteBorrowerData] = useState();
  const [verificationData, setVerificationData] = useState();
  const [editBorrowerData, setEditBorrowerData] = useState('');
  const [openDelete, setOpenDelete] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

  const getAllBorrowersData = async () => {
    const response = await getApi(`borrower/list?createdBy=${userId}`);
    if (response && response.status === 200) {
      setBorrowerData(response.data.borrowerAllData);
    }
  };

  const AddBorrowerDetails = async (values) => {
    const response = await postApi('borrower/add', values);
    if (response && response.status === 200) {
      getAllBorrowersData();
    }
  };

  const EditBorrowerDetails = async (values) => {
    const result = await EditApi(`borrower/edit/${editBorrowerData._id}`, values);
    if (result && result.status === 200) {
      getAllBorrowersData();
    }
  };

  const DeleteBorrower = async (id) => {
    const result = await deleteApi(`borrower/delete/${id}`, id);
    if (result && result.status === 200) {
      getAllBorrowersData();
    }
    handleCloseDelete();
  };

  useEffect(() => {
    getAllBorrowersData();
  }, []);

  const handleVerification = async (row) => {
    const newPayload = {
      ...row,
      status: 'verified'
    };
    const result = await EditApi(`borrower/edit/${verificationData}`, newPayload);
    if (result && result.status === 200) {
      getAllBorrowersData();
    }
  };

  const columns = [
    {
      field: '_id',
      headerName: 'S.No.',
      flex: 0.5,
      width: 40,
      cellClassName: 'name-column--cell name-column--cell--capitalize',
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1
    },
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 150,
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize',
      renderCell: (params) => {
        const handleCellClick = () => {
          const borrowerId = params?.row?._id;
          navigate(`/customers/borrowers/View/${borrowerId}`);
        };
        return (
          <Box onClick={handleCellClick} style={{ cursor: 'pointer' }}>
            <Typography>{`${params?.row?.firstName} ${params?.row?.lastName}`}</Typography>
          </Box>
        );
      }
    },
    {
      field: 'emailID',
      headerName: 'Email ID',
      flex: 1,
      renderCell: (params) => {
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography>{params?.row?.emailID}</Typography>
            <Typography>{params?.row?.status}</Typography>
          </Box>
        );
      }
    },
    {
      field: 'phoneNumber',
      headerName: 'Contact No.',
      flex: 1
    },

    {
      field: 'verification',
      headerName: 'Verification',
      flex: 1,
      renderCell: (params) => {
        const handleButtonClick = async (row) => {
          setVerificationData(row._id);
          handleVerification(row);
        };
        return (
          <Box>
            <Button
              variant="contained"
              onClick={() => {
                handleButtonClick(params?.row);
              }}
              disabled={params.row.status === 'verified'}
            >
              Verification
            </Button>
          </Box>
        );
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => {
        const handleDeleteClick = async (row) => {
          setDeleteBorrowerData(row._id);
          handleOpenDelete();
        };
        const handleEditClick = async (row) => {
          setEditBorrowerData(row);
          handleOpenDrawer();
        };

        return (
          <Box>
            <IconButton
              fontSize="40px"
              color="primary"
              onClick={() => {
                handleEditClick(params?.row);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                handleDeleteClick(params?.row);
              }}
            >
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
      <DeleteModel
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
        deleteData={DeleteBorrower}
        deleteId={deleteBorrowerData}
      />
      <AddBorrowersWithStepper
        drawerOpen={drawerOpen}
        handleCloseDrawer={handleCloseDrawer}
        AddBorrowerDetails={AddBorrowerDetails}
        editBorrowerData={editBorrowerData}
        setEditBorrowerData={setEditBorrowerData}
        EditBorrowerDetails={EditBorrowerDetails}
      />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h3">Borrowers List</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenDrawer}>
              Add Borrowers
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px' }}>
              <DataGrid
                rows={borrowerData ?? []}
                rowHeight={70}
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

export default Borrowers;
