/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// @mui
import { Stack, Button, Container, Typography, Card, Box, IconButton } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AddLoans from './AddLoans';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Iconify from '../../ui-component/iconify';
import { getApi, postApi, deleteApi, EditApi } from 'services/api';
import DeleteModel from '../../ui-component/Deletemodle';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const Loans = () => {
  const userId = localStorage.getItem('user_id');
  const navigate = useNavigate();

  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loanData, setLoanData] = useState([]);
  const [loanTypeData, setLoanTypeData] = useState([]);
  const [borrowerData, setBorrowerData] = useState([]);
  const [landersData, setLandersData] = useState([]);
  const [walletData, setWalletData] = useState([]);
  const [deleteLoanData, setDeleteLoanData] = useState([]);
  const [editLoanData, setEditLoanData] = useState('');
  const [currencyData, setCurrencyData] = useState([]);
  const [loanOffersData, setLoanOffersData] = useState([]);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const getAllLoanTypeData = async () => {
    const response = await getApi(`loanType/list?createdBy=${userId}`);
    if (response && response.status === 200) {
      setLoanTypeData(response.data.getAllResult);
    }
  };

  const getAllLoanOffersList = async () => {
    const response = await getApi(`loanOffers/list?createdBy=${userId}`);
    if (response && response.status === 200) {
      const activeLoanOffers = response.data.getAllResult.filter((loanOffers) => loanOffers.status === 'active');
      setLoanOffersData(activeLoanOffers);
    }
  };

  const getAllBorrowersData = async () => {
    const response = await getApi(`borrower/list?createdBy=${userId}`);
    if (response && response.status === 200) {
      const verifiedBorrowers = response.data.borrowerAllData.filter((borrower) => borrower.status === 'verified');
      setBorrowerData(verifiedBorrowers);
    }
  };

  const getAllLandersDetails = async () => {
    const response = await getApi(`landers/list?createdBy=${userId}`);
    if (response && response.status === 200) {
      setLandersData(response?.data?.getAllResult);
    }
  };

  const getWalletList = async () => {
    const response = await getApi(`Wallet/list?createdBy=${userId}`);
    if (response && response.status === 200) {
      setWalletData(response.data.getAllResult);
    }
  };

  const getLoanList = async () => {
    const response = await getApi(`loan/list?createdBy=${userId}`);
    if (response && response.status === 200) {
      setLoanData(response.data.getAllResult);
    }
  };

  const AddLoanData = async (values) => {
    const data = values;
    const response = await postApi('loan/add', data);
    if (response && response.status === 201) {
      getLoanList();
    }
  };

  const UpDateLoanData = async (values) => {
    const data = values;
    const result = await EditApi(`loan/edit/${editLoanData._id}`, data);
    if (result && result.status === 200) {
      getLoanList();
    }
  };

  const DeleteLoanData = async (id) => {
    const result = await deleteApi(`loan/delete/${id}`, id);
    if (result && result.status === 200) {
      getLoanList();
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
    getLoanList();
    getAllLoanTypeData();
    getAllBorrowersData();
    getWalletList();
    getCurrencyList();
    getAllLandersDetails();
    getAllLoanOffersList();
  }, []);

  const calculateDueDate = (releaseDate, loanDuration, durationPeriod) => {
    const releaseDateTime = new Date(releaseDate);

    // Calculate the due date based on loan duration and duration period
    let dueDate = new Date(releaseDateTime);

    switch (durationPeriod) {
      case 'daily':
        dueDate.setDate(dueDate.getDate() + loanDuration);
        break;
      case 'weekly':
        dueDate.setDate(dueDate.getDate() + loanDuration * 7);
        break;
      case 'monthly':
        dueDate.setMonth(dueDate.getMonth() + loanDuration);
        break;
      case 'yearly':
        dueDate.setFullYear(dueDate.getFullYear() + loanDuration);
        break;
      default:
        return null;
    }

    return dueDate;
  };

  const columns = [
    {
      field: '_id',
      headerName: 'S.No.',
      flex: 0.5,
      cellClassName: 'name-column--cell name-column--cell--capitalize',
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1
    },
    {
      field: 'loanNumber',
      headerName: 'Loan Number',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize',
      renderCell: (params) => {
        const handleCellClick = () => {
          const loanId = params?.row?._id;
          navigate(`/Loans/loanList/View/${loanId}`);
        };
        return (
          <Box onClick={handleCellClick} style={{ cursor: 'pointer' }}>
            <Typography>{params?.row?.loanNumber}</Typography>
          </Box>
        );
      }
    },

    {
      field: 'borrowers',
      headerName: 'Borrowers',
      flex: 1,
      renderCell: (params) => {
        return (
          <Typography>
            {params.row.borrowers?.firstName ? `${params.row.borrowers?.firstName} ${params.row.borrowers?.lastName}` : '--'}
          </Typography>
        );
      }
    },

    {
      field: 'loanType',
      headerName: ' Loan Type',
      flex: 1
    },

    {
      field: 'repaymentAmount',
      headerName: 'Total Amount',
      flex: 1,
      renderCell: (params) => {
        return <Typography>{`${currencyData[0]?.currencySymbol} ${params?.row?.repaymentAmount}`} </Typography>;
      }
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize',
      renderCell: (params) => {
        return (
          <Typography>
            {params?.row?.releaseDate
              ? calculateDueDate(params?.row?.releaseDate, params?.row?.loanDuration, params?.row?.durationPeriod)?.toDateString()
              : '-'}
          </Typography>
        );
      }
    },

    {
      field: 'loanStatus',
      headerName: 'Loan Status',
      flex: 1
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => {
        const handleClickDelete = (rowData) => {
          setDeleteLoanData(rowData._id);
          handleOpenDelete();
        };
        const handleClickEdit = (rowData) => {
          setEditLoanData(rowData);
          handleOpenAdd();
        };
        return (
          <Box>
            <IconButton
              fontSize="40px"
              color="primary"
              onClick={() => {
                handleClickEdit(params?.row);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                handleClickDelete(params?.row);
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
      <DeleteModel openDelete={openDelete} handleCloseDelete={handleCloseDelete} deleteId={deleteLoanData} deleteData={DeleteLoanData} />
      <AddLoans
        open={openAdd}
        handleClose={handleCloseAdd}
        AddLoanData={AddLoanData}
        loanTypeData={loanTypeData}
        borrowerData={borrowerData}
        walletData={walletData}
        editLoanData={editLoanData}
        setEditLoanData={setEditLoanData}
        UpDateLoanData={UpDateLoanData}
        landersData={landersData}
        loanOffersData={loanOffersData}
      />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Loans Lists</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              New loan
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={loanData ?? []}
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

export default Loans;
