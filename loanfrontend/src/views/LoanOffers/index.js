/* eslint-disable */
import { useState, useEffect } from 'react';
import { Button, Container, Typography, Card, Box, Switch, Stack } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import TableStyle from '../../ui-component/TableStyle';
import Iconify from '../../ui-component/iconify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModel from '../../ui-component/Deletemodle';
import { getApi, postApi, deleteApi, EditApi } from 'services/api';
import AddOffers from './AddOffers';

const LoanOffersDetails = () => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const user_Id = localStorage.getItem('user_id');

  const [deleteId, setDeleteId] = useState('');
  const [editData, setEditData] = useState('');
  const [openDelete, setOpenDelete] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);
  const [offersDetails, setOffersDetails] = useState([]);
  const [loanTypeDetails, setLoanTypeDetails] = useState([]);

  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const getAllOffersDetails = async () => {
    const response = await getApi(`loanOffers/list/?createdBy=${user_Id}`);
    if (response && response.status === 200) {
      setOffersDetails(response?.data?.getAllResult);
    }
  };

  const getAllLoanTypesDetails = async () => {
    const response = await getApi(`loanType/list/?createdBy=${user_Id}`);
    if (response && response.status === 200) {
      setLoanTypeDetails(response?.data?.getAllResult);
    }
  };

  const addLoanOffers = async (values) => {
    const data = values;
    const response = await postApi('loanOffers/add', data);
    if (response && response.status === 201) {
      getAllOffersDetails();
    }
  };

  const DeleteOffersDetails = async (id) => {
    const result = await deleteApi(`loanOffers/delete/${id}`, id);
    if (result && result.status === 200) {
      getAllOffersDetails();
    }
    handleCloseDelete();
  };

  const UpdateLoanOffers = async (id, values) => {
    const data = values;
    const result = await EditApi(`loanOffers/edit/${id}`, data);
    if (result && result.status === 200) {
      getAllOffersDetails();
    }
  };

  useEffect(() => {
    getAllOffersDetails();
    getAllLoanTypesDetails();
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
      field: 'offerName',
      headerName: 'Offers Name',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'loanType',
      headerName: 'Loan Type',
      flex: 1
    },
    {
      field: 'interestRate',
      headerName: 'Interest Rate',
      flex: 1,
      renderCell: (params) => {
        return <Typography>{`${params?.row?.interestRate} %`}</Typography>;
      }
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
          UpdateLoanOffers(params.row._id, payload);
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
              <DeleteModel
                openDelete={openDelete}
                deleteId={deleteId}
                handleCloseDelete={handleCloseDelete}
                deleteData={DeleteOffersDetails}
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
      <AddOffers
        open={openAdd}
        handleClose={handleCloseAdd}
        addLoanOffers={addLoanOffers}
        editData={editData}
        UpdateLoanOffers={UpdateLoanOffers}
        setEditData={setEditData}
        loanTypeDetails={loanTypeDetails}
      />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Loans Offers Lists</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              Add Offers
            </Button>
          </Stack>
        </Stack>
        {/* <Box width="100%">
          <Card style={{ height: '600px' }}>
            <DataGrid
              rows={offersDetails ?? []}
              columns={columns}
              getRowId={(row) => row._id}
              slots={{ toolbar: GridToolbar }}
              slotProps={{ toolbar: { handleOpenAdd } }}
              pageSize={10}
              rowsPerPageOptions={[10, 20, 50]}
            />
          </Card>
        </Box> */}
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={offersDetails ?? []}
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

export default LoanOffersDetails;
