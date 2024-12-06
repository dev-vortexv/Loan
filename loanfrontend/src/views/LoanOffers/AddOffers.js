/* eslint-disable */
/* eslint-disable  prop-type*/
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  DialogContentText,
  FormHelperText,
  Grid
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddOffersDetails = ({ open, handleClose, addLoanOffers, editData, UpdateLoanOffers, setEditData, loanTypeDetails }) => {
  const user_Id = localStorage.getItem('user_id');

  const initialValues = {
    offerName: editData ? editData.offerName : '',
    loanType: editData ? editData.loanType : '',
    interestRate: editData ? editData.interestRate : '',
    status: editData ? editData.status : '',
    createdBy: user_Id
  };

  const OffersValidationSchema = Yup.object().shape({
    offerName: Yup.string().required('Offer Name is required'),
    loanType: Yup.string().required('Loan Type is required'),
    interestRate: Yup.number()
      .min(1, 'Interest rate must be at least 1%')
      .max(30, 'Interest rate cannot exceed 30%')
      .required('Interest rate is required'),

    status: Yup.string().oneOf(['active', 'inactive'], 'Invalid status').required('Loan Offers Status is required')
  });

  const formik = useFormik({
    initialValues,
    validationSchema: OffersValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      editData ? UpdateLoanOffers(editData._id, values) : addLoanOffers(values);
      handleClose();
      setEditData('');
      formik.resetForm();
    }
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editData ? 'Edit Loan Offers' : 'Add Loan Offers'}</DialogTitle>
      <DialogContent dividers>
        <form>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={6}>
                <FormLabel>Offers Name</FormLabel>
                <TextField
                  id="offerName"
                  name="offerName"
                  size="small"
                  fullWidth
                  value={formik.values.offerName}
                  onChange={formik.handleChange}
                  error={formik.touched.offerName && Boolean(formik.errors.offerName)}
                  helperText={formik.touched.offerName && formik.errors.offerName}
                />
              </Grid>
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
                    onChange={formik.handleChange}
                    error={formik.touched.loanType && Boolean(formik.errors.loanType)}
                  >
                    {loanTypeDetails?.map((item) => {
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

              <Grid item xs={12} sm={6}>
                <FormLabel>Interest Rate</FormLabel>
                <TextField
                  id="interestRate"
                  name="interestRate"
                  type="number"
                  size="small"
                  fullWidth
                  value={formik.values.interestRate}
                  onChange={formik.handleChange}
                  error={formik.touched.interestRate && Boolean(formik.errors.interestRate)}
                  helperText={formik.touched.interestRate && formik.errors.interestRate}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Loan Offers Status</FormLabel>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id=""
                    name="status"
                    label=""
                    size="small"
                    value={formik.values.status || null}
                    onChange={formik.handleChange}
                    error={formik.touched.status && Boolean(formik.errors.status)}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                  <FormHelperText error={formik.touched.status && Boolean(formik.errors.status)}>
                    {formik.touched.status && formik.errors.status}
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
  );
};

export default AddOffersDetails;
