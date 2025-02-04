/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormLabel } from '@mui/material';
import { toast } from 'react-toastify';

const AddDocuments = (props) => {
  const { open, handleClose, addBorrowersDocuments, editBorrowerDocumentData, editBorrowerDocumentDetails, setEditBorrowerDocumentData } =
    props;
  const userId = localStorage.getItem('user_id');

  // -----------  validationSchema
  const validationSchema = yup.object({
    file: yup.string().required('File is required'),
    fileName: yup.string().required('File Name is required')
  });

  const defaultFile = new File([''], editBorrowerDocumentData?.file?.name);
  // -----------   initialValues
  const initialValues = {
    fileName: editBorrowerDocumentData ? editBorrowerDocumentData.fileName : '',
    file: editBorrowerDocumentData ? defaultFile : '',
    createdBy: userId
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      editBorrowerDocumentData ? editBorrowerDocumentDetails(values) : addBorrowersDocuments(values);
      handleClose();
      formik.resetForm();
      setEditBorrowerDocumentData('');
      toast.success(t('Documents Upload Successfully'));
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
          <Typography variant="h6"> {editBorrowerDocumentData ? 'Edit Borrowers Documents' : 'Add Borrowers Documents'}</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form encType="multipart/form-data">
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>fileName</FormLabel>
                <TextField
                  id="fileName"
                  name="fileName"
                  size="small"
                  fullWidth
                  value={formik.values.fileName}
                  onChange={formik.handleChange}
                  error={formik.touched.fileName && Boolean(formik.errors.fileName)}
                  helperText={formik.touched.fileName && formik.errors.fileName}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>uploadFile</FormLabel>
                <TextField
                  id="file"
                  name="file"
                  size="small"
                  maxRows={10}
                  fullWidth
                  type="file"
                  multiple
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={(event) => {
                    formik.setFieldValue('file', event.currentTarget.files[0]);
                  }}
                  error={formik.touched.file && Boolean(formik.errors.file)}
                  helperText={
                    formik.touched.file && formik.errors.file ? (
                      formik.errors.file
                    ) : formik.values.file && formik.values.file.name ? (
                      <Typography style={{ fontWeight: 'bold', color: '#007bff' }}>Selected file: {formik.values.file.name}</Typography>
                    ) : (
                      'No file selected'
                    )
                  }
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            onClick={formik.handleSubmit}
            style={{ textTransform: 'capitalize' }}
            // startIcon={<FiSave />}
          >
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
              setEditBorrowerDocumentData('');
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddDocuments;
