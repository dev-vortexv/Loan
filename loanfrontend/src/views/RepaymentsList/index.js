/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// @mui
import { Stack, Container, Typography, Card, Box, IconButton } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import AddRepayments from './AddRepayments';
import { getApi, EditApi } from 'services/api';
// ----------------------------------------------------------------------

const Repayments = () => {
  const userId = localStorage.getItem('user_id');

  const [openAdd, setOpenAdd] = useState(false);
  const [loanData, setLoanData] = useState([]);
  const [repaymentData, setRepaymentData] = useState([]);
  const [editRepaymentData, setEditRepaymentData] = useState('');

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const getBorrowersList = async () => {
    const response = await getApi(`loan/list?createdBy=${userId}`);
    if (response && response.status === 200) {
      setLoanData(response.data.getAllResult);
    }
  };

  const EditRepayments = async (data) => {
    const response = await EditApi(`loan/edit/${editRepaymentData._id}`, data);
    if (response && response.status === 200) {
      getRepaymentsList();
    }
  };

  const getRepaymentsList = async () => {
    const response = await getApi(`loan/list?createdBy=${userId}`);
    if (response && response.status === 200) {
      setRepaymentData(response.data.getAllResult);
    }
  };

  useEffect(() => {
    getBorrowersList();
    getRepaymentsList();
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
      field: 'borrowers',
      headerName: 'Borrowers Name',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'loanStatus',
      headerName: 'Loan Status',
      flex: 1
    },
    {
      field: 'loanType',
      headerName: 'loan Type',
      flex: 1
    },
    {
      field: 'repaymentAmount',
      headerName: 'Total Repayments',
      flex: 1
    },

    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => {
        const handleEditClick = (editData) => {
          setEditRepaymentData(editData?.row);
          handleOpenAdd();
        };
        return (
          <Box>
            <IconButton fontSize="40px" color="primary" onClick={() => handleEditClick(params)}>
              <AddIcon />
            </IconButton>
          </Box>
        );
      }

      // eslint-disable-next-line arrow-body-style
    }
  ];

  return (
    <>
      <AddRepayments
        open={openAdd}
        handleClose={handleCloseAdd}
        loanData={loanData}
        editRepaymentData={editRepaymentData}
        EditRepayments={EditRepayments}
        setEditRepaymentData={setEditRepaymentData}
      />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Repayments Lists</Typography>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={repaymentData ?? []}
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

export default Repayments;
