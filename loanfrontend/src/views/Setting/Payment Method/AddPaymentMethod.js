/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
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
  FormLabel
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddPaymentMethod = ({ open, handleClose, addMethod, editData, UpdateMethod, setEditData }) => {
  const user_Id = localStorage.getItem('user_id');

  const initialValues = {
    paymentType: editData ? editData.paymentType : '',
    status: editData ? editData.status : '',
    createdBy: user_Id
  };

  const PaymentValidationSchema = Yup.object().shape({
    paymentType: Yup.string().required('payment Type is required'),
    status: Yup.string().oneOf(['active', 'inactive'], 'Invalid status').required('Payment Type Status is required')
  });

  const formik = useFormik({
    initialValues,
    validationSchema: PaymentValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      editData ? UpdateMethod(editData._id, values) : addMethod(values);
      handleClose();
      setEditData('');
      formik.resetForm();
    }
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editData ? 'Edit Payment Method' : 'Add Payment Method'}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <FormLabel>Payment Type Name</FormLabel>
          <TextField
            name="paymentType"
            margin="dense"
            type="text"
            fullWidth
            value={formik.values.paymentType}
            onChange={formik.handleChange}
            error={formik.touched.paymentType && Boolean(formik.errors.paymentType)}
            helperText={formik.touched.paymentType && formik.errors.paymentType}
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>

        {editData ? null : (
          <FormControl fullWidth margin="dense">
            <FormLabel shrink>Payment Type Status</FormLabel>
            <Select
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              error={formik.touched.status && Boolean(formik.errors.status)}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
            {formik.touched.status && formik.errors.status && <div style={{ color: 'red' }}>{formik.errors.status}</div>}
          </FormControl>
        )}
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            formik.resetForm();
            handleClose();
            setEditData('');
          }}
        >
          Cancel
        </Button>
        <Button onClick={formik.handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

AddPaymentMethod.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  addMethod: PropTypes.func.isRequired,
  UpdateMethod: PropTypes.func.isRequired,
  setEditData: PropTypes.func.isRequired
};

export default AddPaymentMethod;
