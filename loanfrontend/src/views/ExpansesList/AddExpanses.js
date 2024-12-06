/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
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
import { FormControl, FormHelperText, FormLabel, MenuItem, Select, Box } from '@mui/material';
import dayjs from 'dayjs';
import { getApi } from 'services/api';

const AddExpanses = (props) => {
  const { open, handleClose, AddExpansesData, editExpansesData, UpdateExpanses, setEditExpansesData } = props;

  const userId = localStorage.getItem('user_id');

  const [walletData, setWalletData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);

  const [file, setFile] = useState();

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  const getWalletList = async () => {
    const response = await getApi(`Wallet/list?createdBy=${userId}`);
    if (response && response.status === 200) {
      setWalletData(response.data.getAllResult);
    }
  };

  const getAllExpenseCategoriesData = async () => {
    const response = await getApi(`expansesCategories/list?createdBy=${userId}`);
    if (response && response.status === 200) {
      setCategoriesData(response.data.getAllResult);
    }
  };

  useEffect(() => {
    getWalletList();
    getAllExpenseCategoriesData();
    // eslint-disable-next-line
  }, []);

  // -----------  validationSchema
  const validationSchema = yup.object({
    expenseName: yup.string().required('Expense Name is required'),
    expenseVendor: yup.string().required('Expense Vendor is required'),
    expenseAmount: yup.string().required('Expense Amount is required'),
    expenseFromAccount: yup.string().required('From Account is required'),
    expenseCategory: yup.string().required('Expense Category is required'),
    expenseDate: yup.string().required('Expense Date is required')
  });

  // -----------   initialValues
  const initialValues = {
    expenseName: editExpansesData ? editExpansesData.expanseName : '',
    expenseVendor: editExpansesData ? editExpansesData.expanseVendor : '',
    expenseAmount: editExpansesData ? editExpansesData.expanseAmount : '',
    expenseFromAccount: editExpansesData ? editExpansesData.expanseFromAccount : '',
    expenseCategory: editExpansesData ? editExpansesData.expanseCategory : '',
    expenseDate: editExpansesData ? editExpansesData.expanseDate : '',
    file: editExpansesData ? editExpansesData?.path : '',
    createdBy: userId
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const newPayload = {
        ...values,
        file: file,
        fileName: file?.name,
        fileType: file?.type
      };
      editExpansesData ? UpdateExpanses(newPayload) : AddExpansesData(newPayload);
      handleClose();
      setEditExpansesData('');
      resetForm();
    }
  });

  useEffect(() => {
    setFile(editExpansesData?.path);
  }, [editExpansesData]);

  const getFileName = (fullFileName) => {
    if (!fullFileName) {
      return ''; // Return an empty string if fullFileName is undefined or null
    }
    const fileNameParts = fullFileName.split('\\');
    return fileNameParts[fileNameParts.length - 1];
  };

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
          <Typography variant="h6"> {editExpansesData ? 'Edit Expense' : 'Create Expense'} </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Expense Name</FormLabel>
                  <TextField
                    id="expenseName"
                    name="expenseName"
                    size="small"
                    fullWidth
                    value={formik.values.expenseName}
                    onChange={formik.handleChange}
                    error={formik.touched.expenseName && Boolean(formik.errors.expenseName)}
                    helperText={formik.touched.expenseName && formik.errors.expenseName}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Expense Vendor</FormLabel>
                  <TextField
                    id="expenseVendor"
                    name="expenseVendor"
                    size="small"
                    fullWidth
                    value={formik.values.expenseVendor}
                    onChange={formik.handleChange}
                    error={formik.touched.expenseVendor && Boolean(formik.errors.expenseVendor)}
                    helperText={formik.touched.expenseVendor && formik.errors.expenseVendor}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Expense Amount</FormLabel>
                  <TextField
                    id="expenseAmount"
                    name="expenseAmount"
                    size="small"
                    type="number"
                    fullWidth
                    value={formik.values.expenseAmount}
                    onChange={formik.handleChange}
                    error={formik.touched.expenseAmount && Boolean(formik.errors.expenseAmount)}
                    helperText={formik.touched.expenseAmount && formik.errors.expenseAmount}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>From this Account</FormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id=""
                      name="expenseFromAccount"
                      label=""
                      size="small"
                      value={formik.values.expenseFromAccount || null}
                      onChange={formik.handleChange}
                      error={formik.touched.expenseFromAccount && Boolean(formik.errors.expenseFromAccount)}
                    >
                      {walletData?.map((item) => {
                        return (
                          <MenuItem key={item?._id} value={`${item?._id}`}>
                            {`${item?.walletName}- Balance: ${item?.addFunds}`}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText error={formik.touched.expenseFromAccount && Boolean(formik.errors.expenseFromAccount)}>
                      {formik.touched.expenseFromAccount && formik.errors.expenseFromAccount}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Expense Category</FormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id=""
                      name="expenseCategory"
                      label=""
                      size="small"
                      value={formik.values.expenseCategory || null}
                      onChange={formik.handleChange}
                      error={formik.touched.expenseCategory && Boolean(formik.errors.expenseCategory)}
                    >
                      {categoriesData?.map((item) => {
                        return (
                          <MenuItem key={item?._id} value={`${item?.categoryName}`}>
                            {`${item?.categoryName}`}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText error={formik.touched.expenseCategory && Boolean(formik.errors.expenseCategory)}>
                      {formik.touched.expenseCategory && formik.errors.expenseCategory}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormLabel>Expense Date</FormLabel>
                  <TextField
                    name="expenseDate"
                    type={'date'}
                    size="small"
                    fullWidth
                    value={dayjs(formik.values.expenseDate).format('YYYY-MM-DD')}
                    onChange={formik.handleChange}
                    error={formik.touched.expenseDate && Boolean(formik.errors.expenseDate)}
                    helperText={formik.touched.expenseDate && formik.errors.expenseDate}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormLabel>Expense attachment</FormLabel>
                  <Box component="section" sx={{ p: 2, border: '1px dashed grey', textAlign: 'center' }}>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*,application/pdf"
                      style={{ color: 'blue', cursor: 'pointer' }}
                    />
                    {editExpansesData && <p>Selected file: {file && typeof file === 'object' ? file?.name : getFileName(file)}</p>}
                  </Box>
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
              setEditExpansesData('');
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

export default AddExpanses;
