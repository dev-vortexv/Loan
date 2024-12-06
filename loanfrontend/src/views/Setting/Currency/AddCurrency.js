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

const AddCurrency = ({ open, handleClose, addCurrency, editData, UpdateCurrency, setEditData }) => {
  const user_Id = localStorage.getItem('user_id');

  const initialValues = {
    currencyName: editData ? editData.currencyName : '',
    currencySymbol: editData ? editData.currencySymbol : '',
    currencyStatus: editData ? editData.currencyStatus : '',
    createdBy: user_Id
  };

  const CurrencyValidationSchema = Yup.object().shape({
    currencyName: Yup.string().required('Currency name is required').min(2, 'Currency name must be at least 2 characters'),

    currencySymbol: Yup.string().required('Currency symbol is required').max(5, 'Currency symbol can be at most 5 characters'),

    currencyStatus: Yup.string().oneOf(['active', 'inactive'], 'Invalid status').required('Currency status is required')
  });

  const formik = useFormik({
    initialValues,
    validationSchema: CurrencyValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      editData ? UpdateCurrency(editData._id, values) : addCurrency(values);
      handleClose();
      setEditData('');
      formik.resetForm();
    }
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editData ? 'Edit Currency' : 'Add Currency'}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <FormLabel>Currency Name</FormLabel>
          <TextField
            name="currencyName"
            margin="dense"
            type="text"
            fullWidth
            value={formik.values.currencyName}
            onChange={formik.handleChange}
            error={formik.touched.currencyName && Boolean(formik.errors.currencyName)}
            helperText={formik.touched.currencyName && formik.errors.currencyName}
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>Currency Symbol</FormLabel>
          <TextField
            name="currencySymbol"
            margin="dense"
            type="text"
            fullWidth
            value={formik.values.currencySymbol}
            onChange={formik.handleChange}
            error={formik.touched.currencySymbol && Boolean(formik.errors.currencySymbol)}
            helperText={formik.touched.currencySymbol && formik.errors.currencySymbol}
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>
        {editData ? null : (
          <FormControl fullWidth margin="dense">
            <FormLabel shrink>Currency Status</FormLabel>
            <Select
              name="currencyStatus"
              value={formik.values.currencyStatus}
              onChange={formik.handleChange}
              error={formik.touched.currencyStatus && Boolean(formik.errors.currencyStatus)}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
            {formik.touched.currencyStatus && formik.errors.currencyStatus && (
              <div style={{ color: 'red' }}>{formik.errors.currencyStatus}</div>
            )}
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

AddCurrency.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  addSetting: PropTypes.func.isRequired
};

export default AddCurrency;
