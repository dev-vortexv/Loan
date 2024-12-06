/* eslint-disable react/prop-types */
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormLabel, TextField, Grid, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';

const AddLoansTypes = (props) => {
  const { open, handleClose, AddLandersData, EditLandersDetails, editData, setEditData } = props;

  const UserId = localStorage.getItem('user_id');

  // -----------  validationSchema
  const validationSchema = yup.object({
    displayName: yup.string().required('Display Name is required'),
    landersName: yup.string().required('Landers Name is required'),
    code: yup.string().required('Code is required'),
    mobile: yup
      .string()
      .required('Mobile is required')
      .matches(/^[0-9]{10}$/, 'Mobile number must be numbers in 10 digits'),
    email: yup.string().required('Email is required').email('Please enter a valid email address'),
    GSTNumber: yup.string().required('GST Number is required')
  });

  // -----------   initialValues
  const initialValues = {
    displayName: editData ? editData.displayName : '',
    landersName: editData ? editData.landersName : '',
    code: editData ? editData.code : '',
    mobile: editData ? editData.mobile : '',
    email: editData ? editData.email : '',
    GSTNumber: editData ? editData.GSTNumber : '',
    createdBy: UserId
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      editData ? EditLandersDetails(values) : AddLandersData(values);
      handleClose();
      setEditData('');
      editData ? null : toast.success(' Add Landers successfully');
      formik.resetForm();
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
            // backgroundColor: "#2b4054",
            // color: "white",
          }}
        >
          <Typography variant="h6"> {editData ? 'Edit Lander' : 'Add New Lander'} </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <Typography style={{ marginBottom: '15px' }} variant="h6">
              Landers Details
            </Typography>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Display Name</FormLabel>
                <TextField
                  id="displayName"
                  name="displayName"
                  size="small"
                  maxRows={10}
                  fullWidth
                  value={formik.values.displayName}
                  onChange={formik.handleChange}
                  error={formik.touched.displayName && Boolean(formik.errors.displayName)}
                  helperText={formik.touched.displayName && formik.errors.displayName}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Landers Name</FormLabel>
                <TextField
                  id="landersName"
                  name="landersName"
                  size="small"
                  fullWidth
                  value={formik.values.landersName}
                  onChange={formik.handleChange}
                  error={formik.touched.landersName && Boolean(formik.errors.landersName)}
                  helperText={formik.touched.landersName && formik.errors.landersName}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Code</FormLabel>
                <TextField
                  id="code"
                  name="code"
                  size="small"
                  fullWidth
                  value={formik.values.code}
                  onChange={formik.handleChange}
                  error={formik.touched.code && Boolean(formik.errors.code)}
                  helperText={formik.touched.code && formik.errors.code}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Mobile</FormLabel>
                <TextField
                  id="mobile"
                  name="mobile"
                  size="small"
                  fullWidth
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                  helperText={formik.touched.mobile && formik.errors.mobile}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Email</FormLabel>
                <TextField
                  id="email"
                  name="email"
                  size="small"
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>GST Number</FormLabel>
                <TextField
                  id="GSTNumber"
                  name="GSTNumber"
                  size="small"
                  fullWidth
                  value={formik.values.GSTNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.GSTNumber && Boolean(formik.errors.GSTNumber)}
                  helperText={formik.touched.GSTNumber && formik.errors.GSTNumber}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" onClick={formik.handleSubmit} style={{ textTransform: 'capitalize' }}>
            Save
          </Button>
          <Button
            type="reset"
            variant="outlined"
            style={{ textTransform: 'capitalize' }}
            color="error"
            onClick={() => {
              formik.resetForm();
              handleClose();
              setEditData('');
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddLoansTypes;
