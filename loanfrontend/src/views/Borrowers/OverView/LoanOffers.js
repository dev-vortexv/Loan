import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Box, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getApi } from 'services/api';

const LoanOffersDetails = () => {
  const params = useParams();

  const [borrowerLoanOffersDetails, setBorrowerLoanOffersDetails] = useState([]);

  //  api
  const getBorrowersAllLoanOffersDetails = async () => {
    const result = await getApi(`borrower/loanOffers/${params.id}`);
    if (result && result.status === 200) {
      setBorrowerLoanOffersDetails(result?.data?.loanOffers);
    }
  };

  useEffect(() => {
    getBorrowersAllLoanOffersDetails();
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
      field: 'loanNumber',
      headerName: 'Loan Number',
      flex: 1
    },
    {
      field: 'loanType',
      headerName: 'Loan Type',
      flex: 1
    },
    {
      field: 'offerName',
      headerName: 'Offer Name',
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
      field: 'status',
      headerName: 'Status',
      flex: 1
    }
  ];

  return (
    <>
      <Container>
        <Box width="100%">
          <Card style={{ height: '600px', paddingTop: '15px' }}>
            <DataGrid
              rows={borrowerLoanOffersDetails ?? []}
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

export default LoanOffersDetails;
