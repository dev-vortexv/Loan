/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Container, Grid, Stack, Tab, Tabs } from '@mui/material';
import React, { useState, useEffect } from 'react';

// eslint-disable-next-line arrow-body-style
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../ui-component/Header';
import LoanDetails from './LoanDetails';
import { CustomTabPanel, a11yProps } from '../../../ui-component/CustomTabPanel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { getApi } from 'services/api';

// eslint-disable-next-line no-unused-vars
const LoanDetailsView = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [value, setValue] = useState(0);
  const [borrowerLoanDetails, setBorrowerLoanDetails] = useState([]);

  const handleChange = (_, newValue) => setValue(newValue);

  const backToList = () => {
    navigate('/Loans/loanList');
  };

  //  api
  const getLoanAllDetails = async () => {
    const result = await getApi(`loan/view/${params.id}`);
    if (result && result.status === 200) {
      setBorrowerLoanDetails(result?.data?.loanDetails);
    }
  };

  useEffect(() => {
    getLoanAllDetails();
  }, []);

  return (
    <div>
      <Container>
        <Grid container display="flex" alignItems="center">
          <Stack direction="row" alignItems="center" mb={3} justifyContent={'space-between'} width={'100%'}>
            <Header title={'Loan Details'} subtitle={' Loan Borrowers Data'} />
            <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
              <Button variant="contained" color="primary" onClick={() => backToList()} startIcon={<ArrowBackIosIcon />}>
                Back
              </Button>
            </Stack>
          </Stack>
        </Grid>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '0px' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label={'Loan Details'} {...a11yProps(0)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <LoanDetails data={borrowerLoanDetails} />
          </CustomTabPanel>
        </Box>
      </Container>
    </div>
  );
};

export default LoanDetailsView;
