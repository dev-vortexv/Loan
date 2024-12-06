/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import * as React from 'react';

import {
  FormControlLabel,
  Checkbox,
  Typography,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
  TextField,
  Grid,
  Box
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { FormControl, FormHelperText, FormLabel, MenuItem, Select } from '@mui/material';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const roundTo = (value, decimals) => {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
};

const AddLoans = (props) => {
  const {
    open,
    handleClose,
    AddLoanData,
    loanTypeData,
    borrowerData,
    walletData,
    editLoanData,
    setEditLoanData,
    UpDateLoanData,
    landersData,
    loanOffersData
  } = props;

  const userId = localStorage.getItem('user_id');

  const [borrowerName, setBorrowerName] = useState('');
  const [newInterestRate, setNewInterestRate] = useState('');

  // -----------  validationSchema
  const validationSchema = yup.object({
    loanType: yup.string().required('loan Type is required'),
    borrowers: yup.string().required('Borrowers is required'),
    loanStatus: yup.string().required('loan Status is required'),
    landers: yup.string().required('Landers  is required'),
    principleAmount: yup.string().required('principle Amount  is required'),
    loanDuration: yup
      .number()
      .required('Loan duration is required')
      .positive('Loan duration must be a positive number')
      .integer('Loan duration must be a whole number'),
    durationPeriod: yup.string().required('Duration Period is required'),
    releaseDate: yup.string().required('Release Date To is required'),
    repaymentAmount: yup.string().required('Release Date is required'),
    interestAmount: yup.string().required('Repayment Amount is required'),
    interestRate: yup.string().required('Interest Rate is required'),
    fromAccount: yup.string().required('fromAccount is required'),
    TransactionReference: yup.string().required('Transaction Reference is required')
  });

  // -----------   initialValues
  const initialValues = {
    loanType: editLoanData ? editLoanData.loanType : '',
    borrowers: editLoanData ? borrowerName : '',
    SelectOffers: false,
    loanStatus: editLoanData ? editLoanData.loanStatus : '',
    landers: editLoanData ? editLoanData.landers : '',
    principleAmount: editLoanData ? editLoanData.principleAmount : '',
    loanDuration: editLoanData ? editLoanData.loanDuration : '',
    durationPeriod: editLoanData ? editLoanData.durationPeriod : '',
    releaseDate: editLoanData ? editLoanData.releaseDate : '',
    repaymentAmount: editLoanData ? editLoanData.repaymentAmount : '',
    interestAmount: editLoanData ? editLoanData.interestAmount : '',
    interestRate: editLoanData ? editLoanData.interestRate : '',
    fromAccount: editLoanData ? editLoanData.fromAccount : '',
    TransactionReference: editLoanData ? editLoanData.TransactionReference : '',
    createdBy: userId
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      editLoanData ? UpDateLoanData(values) : AddLoanData(values);
      handleClose();
      setEditLoanData('');
      editLoanData ? null : toast.success(' Add Loans successfully');
      resetForm();
    }
  });

  const calculateInterest = (principleAmount, interestRate, duration, period) => {
    let ratePerPeriod = 0;

    switch (period) {
      case 'daily':
        ratePerPeriod = interestRate / 365; // Assuming 365 days in a year
        break;
      case 'weekly':
        ratePerPeriod = interestRate / 52; // Assuming 52 weeks in a year
        break;
      case 'monthly':
        ratePerPeriod = interestRate / 12; // Assuming 12 months in a year
        break;
      case 'yearly':
        ratePerPeriod = interestRate;
        break;
      default:
        return 0;
    }

    return (principleAmount * ratePerPeriod * duration) / 100;
  };

  const CalculateEMI = (loanDuration, totalRepayment, currentMonth, paidSoFar) => {
    const totalMonths = loanDuration * 12;
  
   
    if (currentMonth === totalMonths - 1) {
      return roundTo(totalRepayment - paidSoFar, 2);
    }
  
   
    return roundTo(totalRepayment / totalMonths, 2);
  };
  
  const calculateValues = (principleAmount, interestRate, loanDuration, durationPeriod) => {
    const interestAmount = roundTo(calculateInterest(principleAmount, interestRate, loanDuration, durationPeriod), 2);
    const totalRepayment = roundTo(principleAmount + interestAmount, 2);
  
    const loanDurationInMonths = loanDuration * 12;
  
   
    let emiAmounts = [];
    let remainingBalance = totalRepayment;
  
    for (let month = 0; month < loanDurationInMonths; month++) {
      const emi = CalculateEMI(loanDuration, totalRepayment, month, totalRepayment - remainingBalance);
      emiAmounts.push(emi);
      remainingBalance = roundTo(remainingBalance - emi, 2);
    }
  
    
    emiAmounts[loanDurationInMonths - 1] += remainingBalance;
  
    formik.setFieldValue('interestAmount', parseInt(interestAmount));
    formik.setFieldValue('repaymentAmount', totalRepayment);
    formik.setFieldValue('monthlyEmi', emiAmounts[0]); // Typically show the first EMI as monthlyEMI
  };
  
  useEffect(() => {
    if (editLoanData?.borrowers) {
      const { _id } = editLoanData.borrowers;
      setBorrowerName(_id);
    }
  }, [editLoanData]);

  const handleLoanOfferChange = (event) => {
    const selectedOffer = event.target.value;
    formik.setFieldValue('loanOffer', selectedOffer);

    const selectedOfferData = loanOffersData.find((offer) => offer._id === selectedOffer);
    if (selectedOfferData) {
      const updatedInterestRate = formik.values.interestRate - selectedOfferData.interestRate;

      formik.setFieldValue('interestRate', updatedInterestRate);
      calculateValues(formik.values.principleAmount, updatedInterestRate, formik.values.loanDuration, formik.values.durationPeriod);
    }
  };

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    formik.setFieldValue('SelectOffers', isChecked);

    if (!isChecked) {
      // If checkbox is unchecked, reset selected loan offer to null
      formik.setFieldValue('loanOffer', null);
      formik.setFieldValue('interestRate', newInterestRate);
      calculateValues(formik.values.principleAmount, newInterestRate, formik.values.loanDuration, formik.values.durationPeriod);
    }
  };

  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
            // backgroundColor: "#2b4054",
            // color: "white",
          }}
        >
          <Typography variant="h6"> {editLoanData ? 'Edit Loan' : 'Create Loan '}</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Loan Type</FormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id=""
                      name="loanType"
                      label=""
                      size="small"
                      value={formik.values.loanType}
                      onChange={(event) => {
                        const selectedLoanType = event.target.value;
                        formik.setFieldValue('loanType', selectedLoanType);

                        // Determine and set corresponding values for duration or interest rate
                        const selectedLoan = loanTypeData.find((item) => item.loanName === selectedLoanType);
                        if (selectedLoan) {
                          // Assuming duration and interest rate fields are available in formik.values
                          formik.setFieldValue('durationPeriod', selectedLoan.interestCycle);
                          formik.setFieldValue('interestRate', selectedLoan.interestRate);
                          setNewInterestRate(selectedLoan?.interestRate);
                        }
                      }}
                      error={formik.touched.loanType && Boolean(formik.errors.loanType)}
                    >
                      {loanTypeData?.map((item) => {
                        return (
                          <MenuItem key={item._id} value={item.loanName}>
                            {item.loanName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText error={formik.touched.loanType && Boolean(formik.errors.loanType)}>
                      {formik.touched.loanType && formik.errors.loanType}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Borrowers</FormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id=""
                      name="borrowers"
                      label=""
                      size="small"
                      value={formik.values.borrowers || null}
                      onChange={formik.handleChange}
                      error={formik.touched.borrowers && Boolean(formik.errors.borrowers)}
                    >
                      {borrowerData?.map((item) => {
                        return (
                          <MenuItem key={item._id} value={item._id}>
                            {`${item.firstName}${item.lastName}-${item.phoneNumber}`}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText error={formik.touched.borrowers && Boolean(formik.errors.borrowers)}>
                      {formik.touched.borrowers && formik.errors.borrowers}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                {/* Checkbox to toggle loan offer input */}
                <Grid item xs={12} sm={6} md={6}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel>If you want to give loan offers to Borrowers</FormLabel>
                    <FormControlLabel
                      name="SelectOffers"
                      control={<Checkbox checked={formik.values.SelectOffers} onChange={handleCheckboxChange} name="loanOfferCheckbox" />}
                      label="Select Loan Offer"
                    />
                  </Box>
                </Grid>

                {/* Loan Offer Select Input */}
                {formik.values.SelectOffers && (
                  <Grid item xs={12} sm={6} md={6}>
                    <FormLabel>Loan Offer</FormLabel>
                    <FormControl fullWidth>
                      <Select
                        labelId="loan-offer-select-label"
                        id="loanOffer"
                        name="loanOffer"
                        size="small"
                        value={formik.values.loanOffer || ''}
                        onChange={handleLoanOfferChange}
                      >
                        {loanOffersData?.map((offer) => (
                          <MenuItem key={offer._id} value={offer._id}>
                            {offer.offerName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}

                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Landers</FormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id=""
                      name="landers"
                      label=""
                      size="small"
                      value={formik.values.landers || null}
                      onChange={formik.handleChange}
                      error={formik.touched.landers && Boolean(formik.errors.landers)}
                    >
                      {landersData?.map((item) => {
                        return (
                          <MenuItem key={item._id} value={item._id}>
                            {`${item.landersName}`}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText error={formik.touched.landers && Boolean(formik.errors.landers)}>
                      {formik.touched.landers && formik.errors.landers}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Loan Status</FormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id=""
                      name="loanStatus"
                      label=""
                      size="small"
                      value={formik.values.loanStatus || null}
                      onChange={formik.handleChange}
                      error={formik.touched.loanStatus && Boolean(formik.errors.loanStatus)}
                    > 
                      <MenuItem value="pending">Processing</MenuItem>
                      <MenuItem value="approved">Approved</MenuItem>
                      <MenuItem value="denied">Denied</MenuItem>
                      <MenuItem value="defaulted">Defaulted</MenuItem>
                      <MenuItem value="fullyPaid">Fully Paid</MenuItem>
                    </Select>
                    <FormHelperText error={formik.touched.loanStatus && Boolean(formik.errors.loanStatus)}>
                      {formik.touched.loanStatus && formik.errors.loanStatus}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Principle Amount</FormLabel>
                  <TextField
                    id="principleAmount"
                    name="principleAmount"
                    size="small"
                    type="number"
                    fullWidth
                    value={formik.values.principleAmount}
                    onChange={formik.handleChange}
                    error={formik.touched.principleAmount && Boolean(formik.errors.principleAmount)}
                    helperText={formik.touched.principleAmount && formik.errors.principleAmount}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Loan Duration ( In Yearly)</FormLabel>
                  <TextField
                    id="loanDuration"
                    name="loanDuration"
                    size="small"
                    type="number"
                    fullWidth
                    value={formik.values.loanDuration}
                    onChange={(event) => {
                      const loanDuration = event.target.value;
                      formik.setFieldValue('loanDuration', loanDuration);
                      const principleAmount = formik.values.principleAmount;
                      const interestRate = formik.values.interestRate;
                      const durationPeriod = formik.values.durationPeriod;
                      calculateValues(principleAmount, interestRate, loanDuration, durationPeriod);
                    }}
                    error={formik.touched.loanDuration && Boolean(formik.errors.loanDuration)}
                    helperText={formik.touched.loanDuration && formik.errors.loanDuration}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Duration Period</FormLabel>
                  <TextField
                    id="durationPeriod"
                    name="durationPeriod"
                    size="small"
                    fullWidth
                    value={formik.values.durationPeriod}
                    onChange={formik.handleChange}
                    disabled={Boolean(formik.values.durationPeriod)}
                    error={formik.touched.durationPeriod && Boolean(formik.errors.durationPeriod)}
                    helperText={formik.touched.durationPeriod && formik.errors.durationPeriod}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Loan Release Date</FormLabel>
                  <TextField
                    name="releaseDate"
                    type={'date'}
                    size="small"
                    fullWidth
                    value={dayjs(formik.values.releaseDate).format('YYYY-MM-DD')}
                    onChange={formik.handleChange}
                    error={formik.touched.releaseDate && Boolean(formik.errors.releaseDate)}
                    helperText={formik.touched.releaseDate && formik.errors.releaseDate}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Repayment Amount</FormLabel>
                  <TextField
                    id="repaymentAmount"
                    name="repaymentAmount"
                    size="small"
                    type="number"
                    fullWidth
                    value={formik.values.repaymentAmount}
                    onChange={formik.handleChange}
                    error={formik.touched.loanDuration && Boolean(formik.errors.repaymentAmount)}
                    helperText={formik.touched.repaymentAmount && formik.errors.repaymentAmount}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormLabel>Interest Amount</FormLabel>
                  <TextField
                    id="interestAmount"
                    name="interestAmount"
                    size="small"
                    fullWidth
                    value={formik.values.interestAmount}
                    onChange={formik.handleChange}
                    error={formik.touched.interestAmount && Boolean(formik.errors.interestAmount)}
                    helperText={formik.touched.interestAmount && formik.errors.interestAmount}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormLabel>Interest Rate</FormLabel>
                  <TextField
                    id="interestRate"
                    name="interestRate"
                    size="small"
                    fullWidth
                    value={formik.values.interestRate}
                    onChange={formik.handleChange}
                    disabled={Boolean(formik.values.interestRate)}
                    error={formik.touched.interestRate && Boolean(formik.errors.interestRate)}
                    helperText={formik.touched.interestRate && formik.errors.interestRate}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormLabel>From this Account</FormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id=""
                      name="fromAccount"
                      label=""
                      size="small"
                      value={formik.values.fromAccount || null}
                      onChange={formik.handleChange}
                      error={formik.touched.fromAccount && Boolean(formik.errors.fromAccount)}
                    >
                      {walletData?.map((item) => {
                        return (
                          <MenuItem key={item._id} value={item._id}>
                            {`${item.walletName}- Balance: ${item.addFunds}`}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText error={formik.touched.fromAccount && Boolean(formik.errors.fromAccount)}>
                      {formik.touched.fromAccount && formik.errors.fromAccount}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormLabel>Transaction Reference</FormLabel>
                  <TextField
                    id="TransactionReference"
                    name="TransactionReference"
                    size="small"
                    fullWidth
                    value={formik.values.TransactionReference}
                    onChange={formik.handleChange}
                    error={formik.touched.TransactionReference && Boolean(formik.errors.TransactionReference)}
                    helperText={formik.touched.TransactionReference && formik.errors.TransactionReference}
                  />
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" onClick={formik.handleSubmit} style={{ textTransform: 'capitalize' }} color="secondary">
            Save
          </Button>
          <Button
            type="reset"
            variant="outlined"
            style={{ textTransform: 'capitalize' }}
            onClick={() => {
              formik.resetForm();
              setEditLoanData('');
              handleClose();
            }}
            color="error"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddLoans;
