/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { FormControl, FormLabel, Grid, TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';


const AddPackages = (props) => {
  const { open, handleClose, addPackagesData } = props;
 

  const userid = localStorage.getItem('user_id');

  // -----------  validationSchema
  const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    amount: yup.number().required('amount is required'),
    description: yup.string().required('Description is required'),
    // days: yup
    //   .number()
    //   .required('Days is required')
    //   .test('len', 'Days must be Max 3 numbers', (val) => val.toString().length <= 3)
  });

  // -----------   initialValues
  const initialValues = {
    title: '',
    amount: '',
    description: '',
    days: '',
    assigned_agent: userid,
    createdBy: userid
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const packagesPayload = {
        title: values.title,
        days: values.days,
        amount: values.amount,
        description: values.description,
        assigned_agent: values.assigned_agent,
        createdBy: values.createdBy
      };
      addPackagesData(packagesPayload);
      handleClose();
      toast.success('Packages Add successfully');
      formik.resetForm();
    }
  });

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        // TransitionComponent={Transition}
      >
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
            // backgroundColor: "#2b4054",
            // color: "white",
          }}
        >
          <Typography variant="h6">NewPackages</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Typography style={{ marginBottom: '15px' }} variant="h6">
              Basic Information
              </Typography>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <FormLabel>Title</FormLabel>
                    <TextField
                      id="title"
                      name="title"
                      size="small"
                      fullWidth
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      error={formik.touched.amount && Boolean(formik.errors.title)}
                      helperText={formik.touched.title && formik.errors.title}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormLabel>Amount</FormLabel>
                  <TextField
                    id="amount"
                    name="amount"
                    type="number"
                    size="small"
                    fullWidth
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    error={formik.touched.amount && Boolean(formik.errors.amount)}
                    helperText={formik.touched.amount && formik.errors.amount}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <FormLabel>Days</FormLabel>
                    <TextField
                      id="days"
                      name="days"
                      type="number"
                      size="small"
                      fullWidth
                      value={formik.values.days}
                      onChange={formik.handleChange}
                      error={formik.touched.days && Boolean(formik.errors.days)}
                      helperText={formik.touched.days && formik.errors.days}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Description</FormLabel>
                  <TextField
                    id="description"
                    name="description"
                    label=""
                    size="small"
                    multiline
                    rows={5}
                    fullWidth
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                  />
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={formik.handleSubmit} variant="contained" color="primary" type="submit">
            save
          </Button>
          <Button
            onClick={() => {
              formik.resetForm();
              handleClose();
            }}
            variant="outlined"
            color="error"
          >
            cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddPackages;
