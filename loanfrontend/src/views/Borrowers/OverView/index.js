/* eslint-disable  */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Tab,
  Tabs,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import React, { useState, useEffect } from 'react';

// eslint-disable-next-line arrow-body-style
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../ui-component/Header';
import { CustomTabPanel, a11yProps } from '../../../ui-component/CustomTabPanel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PersonalDetails from './PersonalDetails';
import PersonalDocument from './PersonalDocument';
import PermanentAddress from './PermanentAddress';
import ResidenceAdress from './ResidenceAdress';
import ActivityTimeline from './ActivityTimeline';
import BusinessDetails from './BussinessDetails';
import BankDetailsCard from './BankDetails';
import AllLoanDetails from './AllLoanDetails';
import LoanOffersDetails from './LoanOffers';
import DocumentsDetails from './DocumentsDetails';
import { getApi, EditApi } from 'services/api';

// eslint-disable-next-line no-unused-vars
const BorrowersView = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [value, setValue] = useState(0);
  const [borrowerDetailsData, setBorrowerDetailsData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogFields, setDialogFields] = useState([]);

  const handleChange = (_, newValue) => setValue(newValue);

  const backToList = () => {
    navigate('/customers/borrowers');
  };

  //  api
  const getBorrowersAllDetails = async () => {
    const result = await getApi(`borrower/view/${params.id}`);
    if (result && result.status === 200) {
      setBorrowerDetailsData(result?.data?.borrowerDetails);
    }
  };

  useEffect(() => {
    getBorrowersAllDetails();
  }, []);

  // Open dialog with specific fields
  const handleEdit = (title, fields) => {
    setDialogTitle(title);
    setDialogFields(fields);
    setDialogOpen(true);
  };

  // Handle save changes
  const handleSave = async () => {
    const updatedData = dialogFields.reduce((acc, field) => {
      acc[field.key] = field.value;
      return acc;
    }, {});

    try {
      const result = await EditApi(`borrower/edit/${params.id}`, updatedData); // PATCH API call
      if (result.status === 200) {
        setBorrowerDetailsData({ ...borrowerDetailsData, ...updatedData });
        setDialogOpen(false);
      } else {
        console.error('Error updating borrower details:', result);
      }
    } catch (error) {
      console.error('Failed to save updates:', error);
    }
  };

  return (
    <div>
      <Container>
        <Grid container display="flex" alignItems="center">
          <Stack direction="row" alignItems="center" mb={3} justifyContent={'space-between'} width={'100%'}>
            <Header title={'Borrowers Details'} subtitle={'Borrowers Data'} />
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
              <Tab label={'Personal Details'} {...a11yProps(0)} />
              <Tab label={'Activity'} {...a11yProps(1)} />
              <Tab label={'Business Details'} {...a11yProps(2)} />
              <Tab label={'Loans'} {...a11yProps(3)} />
              <Tab label={'Loan Offers'} {...a11yProps(4)} />
              <Tab label={'Documents'} {...a11yProps(5)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Box py={2}>
              <Grid container spacing={2} py={2}>
                <Grid item xs={12} md={6}>
                  <PersonalDetails
                    data={borrowerDetailsData}
                    onEdit={() =>
                      handleEdit('Edit Personal Details', [
                        { label: 'First Name', value: borrowerDetailsData?.firstName || '', key: 'firstName' },
                        { label: 'Middle Name', value: borrowerDetailsData?.middleName || '', key: 'middleName' },
                        { label: 'Last Name', value: borrowerDetailsData?.lastName || '', key: 'lastName' },
                        { label: 'Email Id', value: borrowerDetailsData?.emailID || '', key: 'emailID' },
                        { label: 'Occupation Type', value: borrowerDetailsData?.occupationType || '', key: 'occupationType' }
                      ])
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <PermanentAddress
                    data={borrowerDetailsData}
                    onEdit={() =>
                      handleEdit('Edit Permanent Details', [
                        { label: 'Address Line1', value: borrowerDetailsData?.addressLine1 || '', key: 'addressLine1' },
                        { label: 'Address Line2', value: borrowerDetailsData?.addressLine2 || '', key: 'addressLine2' },
                        { label: 'Ownership Type', value: borrowerDetailsData?.ownerShipType || '', key: 'ownerShipType' },
                        { label: 'Pin Code', value: borrowerDetailsData?.pinCode || '', key: 'pinCode' }
                      ])
                    }
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} py={2}>
                <Grid item xs={12} md={6}>
                  <ResidenceAdress
                    data={borrowerDetailsData}
                    onEdit={() =>
                      handleEdit('Edit Residence Details', [
                        {
                          label: 'Residence Address Line1',
                          value: borrowerDetailsData?.residenceAddressLine1 || '',
                          key: 'residenceAddressLine1'
                        },
                        {
                          label: 'Residence Address Line2',
                          value: borrowerDetailsData?.residenceAddressLine2 || '',
                          key: 'residenceAddressLine2'
                        },
                        {
                          label: 'Residence Ownership Type',
                          value: borrowerDetailsData?.residenceOwnerShipType || '',
                          key: 'residenceOwnerShipType'
                        },
                        { label: 'Residence Pin Code', value: borrowerDetailsData?.residencePinCode || '', key: 'residencePinCode' }
                      ])
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <PersonalDocument
                    data={borrowerDetailsData}
                    onEdit={() =>
                      handleEdit('Personal Document Details', [
                        { label: 'Aadhaar Number', value: borrowerDetailsData?.aadhaarNumber || '', key: 'aadhaarNumber' },
                        { label: 'Pan Number', value: borrowerDetailsData?.panNumber || '', key: 'panNumber' },
                        { label: 'Contact NO.', value: borrowerDetailsData?.phoneNumber || '', key: 'phoneNumber' }
                      ])
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Box py={2}>
              <ActivityTimeline data={borrowerDetailsData} />
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Box py={2}>
              <Grid container spacing={2} py={2}>
                <Grid item xs={12} md={6}>
                  <BusinessDetails
                    data={borrowerDetailsData}
                    onEdit={() =>
                      handleEdit('Business Details', [
                        { label: 'Business Name', value: borrowerDetailsData?.businessName || '', key: 'businessName' },
                        { label: 'Business Type', value: borrowerDetailsData?.businessType || '', key: 'businessType' },
                        { label: 'Industry Type', value: borrowerDetailsData?.industryType || '', key: 'industryType' },
                        { label: 'Annual Turnover', value: borrowerDetailsData?.annualTurnOver || '', key: 'annualTurnOver' }
                      ])
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <BankDetailsCard
                    data={borrowerDetailsData}
                    onEdit={() =>
                      handleEdit('Bank Details', [
                        { label: 'Account Holder', value: borrowerDetailsData?.accountHolder || '', key: 'accountHolder' },
                        { label: 'Account Type', value: borrowerDetailsData?.accountType || '', key: 'accountType' },
                        { label: 'Account Number', value: borrowerDetailsData?.accountNumber || '', key: 'accountNumber' },
                        { label: 'Statement File', value: borrowerDetailsData?.bankStatement?.fileName || '', key: 'fileName' }
                      ])
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <Box py={3}>
              <AllLoanDetails data={borrowerDetailsData} />
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <Box py={3}>
              <LoanOffersDetails data={borrowerDetailsData} />
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={5}>
            <Box py={3}>
              <DocumentsDetails data={borrowerDetailsData} />
            </Box>
          </CustomTabPanel>
        </Box>
      </Container>
      {/* Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          {dialogFields.map((field, index) => (
            <TextField
              key={index}
              margin="dense"
              label={field.label}
              fullWidth
              value={field.value}
              onChange={(e) => {
                const updatedFields = [...dialogFields];
                updatedFields[index].value = e.target.value;
                setDialogFields(updatedFields);
              }}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BorrowersView;
