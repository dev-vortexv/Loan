/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormControl, FormHelperText, FormLabel, MenuItem, Select } from '@mui/material';
import { toast } from 'react-toastify';

const AddRepayment = (props) => {
  const { open, handleClose, loanData, editRepaymentData, EditRepayments, setEditRepaymentData } = props;

  const userId = localStorage.getItem('user_id');

  // -----------  validationSchema
  const validationSchema = yup.object({
    borrowers: yup.string().required('Borrowers is required'),
    addAmount: yup.string().required(' Add Amount is required'),
    currentBalance: yup.string().required('Current Balance is required'),
    paymentMethod: yup.string().required('payment Method is required'),
    transactionReference: yup.string().required('Transaction is required')
  });

  // -----------   initialValues
  const initialValues = {
    borrowers: editRepaymentData ? editRepaymentData.borrowers : '',
    addAmount: '',
    loanDuration: '',
    currentBalance: editRepaymentData ? editRepaymentData.repaymentAmount : '',
    durationPeriod: editRepaymentData ? editRepaymentData.durationPeriod : '',
    loanType: editRepaymentData ? editRepaymentData.loanType : '',
    interestRate: editRepaymentData ? editRepaymentData.interestRate : '',
    paymentMethod: editRepaymentData ? editRepaymentData.paymentMethod : '',
    transactionReference: editRepaymentData ? editRepaymentData.TransactionReference : '',
    repaymentAmount: '',
    createdBy: userId
  };

  const calculateInterest = (addAmount, interestRate, duration, period) => {
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

    return (addAmount * ratePerPeriod * duration) / 100;
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const newPayload = {
        ...values
      };

      EditRepayments(newPayload);
      handleClose();
      setEditRepaymentData('');
      toast.success('Repayment Add successfully');
      resetForm();
    }
  });

  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h6"> Add Repayments</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Borrowers Name</FormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id=""
                      name="borrowers"
                      label=""
                      size="small"
                      value={formik.values.borrowers || null}
                      onChange={(event) => {
                        const selectedBorrowersLoan = event.target.value;
                        formik.setFieldValue('borrowers', selectedBorrowersLoan);
                        const selectedLoanRepayment = loanData.find((item) => item.borrowers === selectedBorrowersLoan);
                        if (selectedLoanRepayment) {
                          formik.setFieldValue('currentBalance', selectedLoanRepayment?.repaymentAmount);
                        }
                      }}
                      error={formik.touched.borrowers && Boolean(formik.errors.borrowers)}
                    >
                      {loanData?.map((item) => {
                        return (
                          <MenuItem key={item?._id} value={`${item?.borrowers}`}>
                            {`${item?.borrowers} `}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText error={formik.touched.borrowers && Boolean(formik.errors.borrowers)}>
                      {formik.touched.borrowers && formik.errors.borrowers}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} sm={6}>
                  <FormLabel>Loan Type</FormLabel>
                  <TextField
                    id="loanType"
                    name="loanType"
                    size="small"
                    fullWidth
                    value={formik.values.loanType}
                    onChange={formik.handleChange}
                    disabled={Boolean(formik.values.loanType)}
                    error={formik.touched.loanType && Boolean(formik.errors.loanType)}
                    helperText={formik.touched.loanType && formik.errors.loanType}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Add Amount</FormLabel>
                  <TextField
                    id="addAmount"
                    name="addAmount"
                    type="number"
                    size="small"
                    fullWidth
                    value={formik.values.addAmount}
                    onChange={formik.handleChange}
                    error={formik.touched.addAmount && Boolean(formik.errors.addAmount)}
                    helperText={formik.touched.addAmount && formik.errors.addAmount}
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
                    error={formik.touched.durationPeriod && Boolean(formik.errors.durationPeriod)}
                    helperText={formik.touched.durationPeriod && formik.errors.durationPeriod}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Loan Duration</FormLabel>
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

                      // Calculate interest amount based on principle amount, interest rate, and duration
                      const addAmount = formik.values.addAmount;
                      const interestRate = formik.values.interestRate;
                      const durationPeriod = formik.values.durationPeriod;
                      const currentBalance = formik.values.currentBalance;
                      const interestAmount = calculateInterest(addAmount, interestRate, loanDuration, durationPeriod);
                      // Set the calculated interest amount value in the form
                      formik.setFieldValue('interestAmount', parseInt(interestAmount));
                      formik.setFieldValue('repaymentAmount', currentBalance + addAmount + parseInt(interestAmount));
                    }}
                    error={formik.touched.loanDuration && Boolean(formik.errors.loanDuration)}
                    helperText={formik.touched.loanDuration && formik.errors.loanDuration}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Current Balance</FormLabel>
                  <TextField
                    id="currentBalance"
                    name="currentBalance"
                    type="number"
                    size="small"
                    fullWidth
                    value={formik.values.currentBalance}
                    disabled={Boolean(formik.values.currentBalance)}
                    onChange={formik.handleChange}
                    error={formik.touched.currentBalance && Boolean(formik.errors.currentBalance)}
                    helperText={formik.touched.currentBalance && formik.errors.currentBalance}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Interest Rate</FormLabel>
                  <TextField
                    id="interestRate"
                    name="interestRate"
                    type="number"
                    size="small"
                    fullWidth
                    value={formik.values.interestRate}
                    disabled={Boolean(formik.values.interestRate)}
                    onChange={formik.handleChange}
                    error={formik.touched.interestRate && Boolean(formik.errors.interestRate)}
                    helperText={formik.touched.interestRate && formik.errors.interestRate}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Interest Amount</FormLabel>
                  <TextField
                    id="interestAmount"
                    name="interestAmount"
                    type="number"
                    size="small"
                    fullWidth
                    value={formik.values.interestAmount}
                    onChange={formik.handleChange}
                    error={formik.touched.interestAmount && Boolean(formik.errors.interestAmount)}
                    helperText={formik.touched.interestAmount && formik.errors.interestAmount}
                  />
                </Grid>

                <Grid item xs={12} md={6} sm={6}>
                  <FormLabel>Repayment Amount</FormLabel>
                  <TextField
                    id="repaymentAmount"
                    name="repaymentAmount"
                    size="small"
                    fullWidth
                    value={formik.values.repaymentAmount}
                    onChange={formik.handleChange}
                    error={formik.touched.repaymentAmount && Boolean(formik.errors.repaymentAmount)}
                    helperText={formik.touched.repaymentAmount && formik.errors.repaymentAmount}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Payment method</FormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id=""
                      name="paymentMethod"
                      label=""
                      size="small"
                      value={formik.values.paymentMethod || null}
                      onChange={formik.handleChange}
                      error={formik.touched.paymentMethod && Boolean(formik.errors.paymentMethod)}
                    >
                      <MenuItem value="bankTransfer">Bank Transfer</MenuItem>
                      <MenuItem value="mobileTransfer">Mobile Money</MenuItem>
                      <MenuItem value="cheque">Cheque</MenuItem>
                      <MenuItem value="cash">Cash</MenuItem>
                    </Select>
                    <FormHelperText error={formik.touched.paymentMethod && Boolean(formik.errors.paymentMethod)}>
                      {formik.touched.paymentMethod && formik.errors.paymentMethod}
                    </FormHelperText>
                  </FormControl>
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
              handleClose();
              setEditRepaymentData('');
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

export default AddRepayment;
