import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Stack, Button, Container, Card, Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModel from '../../../ui-component/Deletemodle';
import { getApi, deleteApi } from 'services/api';
import Header from '../../../ui-component/Header';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DownloadIcon from '@mui/icons-material/Download';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { toast } from 'react-toastify';

const PaymentHistory = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [deleteId, setDeleteId] = useState('');
  const [openDelete, setOpenDelete] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);

  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const backToList = () => {
    navigate('/Loans/activeLoans');
  };

  const downloadStatement = () => {
    const doc = new jsPDF();

    const tableData = paymentHistory?.map((item, index) => [
      index + 1,
      item.receiveAmount || '-',
      item.paymentType || '-',
      item.repaymentAmount || '-',
      item.transactionDate ? new Date(item.transactionDate).toLocaleDateString() : '-'
    ]);

    autoTable(doc, {
      head: [['S.No.', 'Received Amount', 'Payment Type', 'Remaining Amount', 'Transaction Date']],
      body: tableData
    });

    // Save the PDF
    doc.save(`loan:${params.id}.pdf`);
    toast.success('Payment History successfully');
  };

  const getAllPaymentHistory = async () => {
    const response = await getApi(`loan/ReceivedPayment/History/${params.id}`);
    if (response && response.status === 200) {
      const paymentHistoryData = response?.data?.transactionHistory;

      const transactionPaymentHistory = paymentHistoryData?.map((transaction) => ({
        ...transaction,
        receiveAmount: transaction.receiveAmount,
        repaymentAmount: transaction.updatedRepaymentAmount,
        transactionDate: new Date(transaction.transactionDate).toLocaleString(),
        paymentType: transaction.paymentType,
        _id: transaction._id
      }));
      setPaymentHistory(transactionPaymentHistory);
    }
  };

  const DeletePaymentHistory = async (deleteId) => {
    const result = await deleteApi(`loan/receivedPayment/deleteHistory/${deleteId}`);
    if (result && result.status === 200) {
      getAllPaymentHistory();
    }
    handleCloseDelete();
  };

  useEffect(() => {
    getAllPaymentHistory();
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
      field: 'receiveAmount',
      headerName: 'Received Amount',
      flex: 1
    },
    {
      field: 'paymentType',
      headerName: 'payment Type',
      flex: 1
    },
    {
      field: 'repaymentAmount',
      headerName: 'Remaining Amount',
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
                deleteData={DeletePaymentHistory}
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
          <Header title={'Received payments History'} />
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" color="primary" onClick={backToList} startIcon={<ArrowBackIosIcon />}>
              Back
            </Button>
            <Button variant="contained" color="secondary" onClick={downloadStatement} startIcon={<DownloadIcon />}>
              Download
            </Button>
          </Stack>
        </Stack>
        <Box width="100%">
          <Card style={{ height: '600px', paddingTop: '15px' }}>
            <DataGrid
              rows={paymentHistory ?? []}
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

export default PaymentHistory;
