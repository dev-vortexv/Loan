import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Container, Card, Box, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getApi } from 'services/api';

const AllLoanDetails = () => {
  const params = useParams();

  const [borrowerLoanDetails, setBorrowerLoanDetails] = useState([]);

  //  api
  const getBorrowersAllLoans = async () => {
    const result = await getApi(`borrower/loan/${params.id}`);
    if (result && result.status === 200) {
      setBorrowerLoanDetails(result?.data?.loans);
    }
  };

  useEffect(() => {
    getBorrowersAllLoans();
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
      field: 'principleAmount',
      headerName: 'Loan Amount',
      flex: 1
    },
    {
      field: 'repaymentAmount',
      headerName: 'Repayment Amount',
      flex: 1
    },

    {
      field: 'lender',
      headerName: 'Lender',
      flex: 1,
      renderCell: (params) => {
        return <Typography>{params?.row?.landers?.landersName ? params?.row?.landers?.landersName : '--'}</Typography>;
      }
    },
    {
      field: 'releaseDate',
      headerName: 'Disbursal Date',
      flex: 1
    },

    {
      field: 'loanStatus',
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
              rows={borrowerLoanDetails ?? []}
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

export default AllLoanDetails;
