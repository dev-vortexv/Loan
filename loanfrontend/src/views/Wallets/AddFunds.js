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
import { FormLabel } from '@mui/material';

const AddFunds = (props) => {
  const UserId = localStorage.getItem('user_id');

  const { open, handleClose, addFundsData, EditWallet } = props;

  // -----------  validationSchema
  const validationSchema = yup.object({
    currentBalance: yup.string().required('Current Balance is required'),
    addFunds: yup
      .number()
      .typeError('Add Funds must be a number')
      .positive('Add Funds must be a positive number')
      .min(1, 'Add Funds must be at least 1')
      .max(10000000, 'Add Funds must not exceed 1 crore (10,000,000)')
      .integer('Add Funds must be an integer')
      .required('Add Funds is required')
  });

  // -----------   initialValues
  const initialValues = {
    currentBalance: addFundsData ? addFundsData.addFunds : '',
    addFunds: '',
    createdBy: UserId
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const newPayload = {
        ...values,
        addFunds: values.currentBalance + values.addFunds // Add current balance and new funds
      };
      EditWallet(addFundsData._id, newPayload);
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
          <Typography variant="h6">Add Funds</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Current Balance</FormLabel>
                  <TextField
                    id="currentBalance"
                    name="currentBalance"
                    size="small"
                    fullWidth
                    value={formik.values.currentBalance}
                    onChange={formik.handleChange}
                    disabled={formik.values.currentBalance}
                    error={formik.touched.currentBalance && Boolean(formik.errors.currentBalance)}
                    helperText={formik.touched.currentBalance && formik.errors.currentBalance}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={12}>
                  <FormLabel>Add Funds</FormLabel>
                  <TextField
                    id="addFunds"
                    name="addFunds"
                    type="number"
                    size="small"
                    fullWidth
                    value={formik.values.addFunds}
                    onChange={formik.handleChange}
                    error={formik.touched.addFunds && Boolean(formik.errors.addFunds)}
                    helperText={formik.touched.addFunds && formik.errors.addFunds}
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

export default AddFunds;
