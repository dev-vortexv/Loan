/* eslint-disable react/prop-types */
import * as React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  FormLabel,
  FormHelperText,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { toast } from 'react-toastify';

const AddReceivedPayments = (props) => {
  const UserId = localStorage.getItem('user_id');

  const { open, handleClose, loanAmount, AddPaymentReceived, paymentData } = props;

  // -----------  validationSchema
  const validationSchema = yup.object({
    repaymentAmount: yup.string().required('Total Amount is required'),
    receiveAmount: yup.string().required('Receive Amount is required'),
    paymentType: yup.string().required('Payment Type is required')
  });

  // -----------   initialValues
  const initialValues = {
    repaymentAmount: loanAmount ? loanAmount.repaymentAmount : '',
    receiveAmount: loanAmount ? loanAmount.monthlyEmi : '',
    paymentType: '',
    createdBy: UserId
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      AddPaymentReceived(loanAmount._id, values);
      toast.success('Add Received  Payment successfully');
      handleClose();
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
          <Typography variant="h6">Add Received Payment</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Total Loan Amount</FormLabel>
                  <TextField
                    id="repaymentAmount"
                    name="repaymentAmount"
                    size="small"
                    fullWidth
                    value={formik.values.repaymentAmount}
                    disabled={formik.values.repaymentAmount}
                    onChange={formik.handleChange}
                    error={formik.touched.repaymentAmount && Boolean(formik.errors.repaymentAmount)}
                    helperText={formik.touched.repaymentAmount && formik.errors.repaymentAmount}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={12}>
                  <FormLabel>Add Monthly EMI </FormLabel>
                  <TextField
                    id="receiveAmount"
                    name="receiveAmount"
                    type="number"
                    size="small"
                    fullWidth
                    value={formik.values.receiveAmount}
                    disabled={formik.values.receiveAmount}
                    onChange={formik.handleChange}
                    error={formik.touched.receiveAmount && Boolean(formik.errors.receiveAmount)}
                    helperText={formik.touched.receiveAmount && formik.errors.receiveAmount}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={12}>
                  <FormLabel>Payment Type</FormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id=""
                      name="paymentType"
                      label=""
                      size="small"
                      value={formik.values.paymentType || null}
                      onChange={formik.handleChange}
                      error={formik.touched.paymentType && Boolean(formik.errors.paymentType)}
                    >
                      {paymentData?.map((item) => (
                        <MenuItem key={item._id} value={item.paymentType}>
                          {item.paymentType}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error={formik.touched.paymentType && Boolean(formik.errors.paymentType)}>
                      {formik.touched.paymentType && formik.errors.paymentType}
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

export default AddReceivedPayments;
