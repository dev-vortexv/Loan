/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  MenuItem,
  Box,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Typography
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';

const AddBorrowersWithStepper = ({
  drawerOpen,
  handleCloseDrawer,
  AddBorrowerDetails,
  editBorrowerData,
  EditBorrowerDetails,
  setEditBorrowerData
}) => {
  const user_id = localStorage.getItem('user_id');

  const [activeStep, setActiveStep] = useState(0);

  // yup Validation Schema
  const validationSchema = yup.object({
    firstName: yup.string().required('First Name is required'),
    middleName: yup.string(),
    lastName: yup.string().required('Last Name is required'),
    dateOfBirth: yup.string().required('Date of Birth is required'),
    gender: yup.string().required('Gender is required'),
    fatherName: yup.string().required('Father Name is required'),
    emailID: yup.string().email('Invalid email').required('Email ID is required'),
    phoneNumber: yup
      .string()
      .required('Phone Number is required')
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
    occupationType: yup.string().required('Occupation Type is required'),
    panNumber: yup
      .string()
      .required('PAN Number is required')
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format'),
    aadhaarNumber: yup
      .string()
      .required('Aadhaar Number is required')
      .matches(/^[0-9]{12}$/, 'Aadhaar must be 12 digits')
  });

  const initialValues = {
    firstName: editBorrowerData ? editBorrowerData.firstName : '',
    middleName: editBorrowerData ? editBorrowerData.middleName : '',
    lastName: editBorrowerData ? editBorrowerData.lastName : '',
    dateOfBirth: editBorrowerData ? editBorrowerData.dateOfBirth : '',
    gender: editBorrowerData ? editBorrowerData.gender : '',
    emailID: editBorrowerData ? editBorrowerData.emailID : '',
    phoneNumber: editBorrowerData ? editBorrowerData.phoneNumber : '',
    fatherName: editBorrowerData ? editBorrowerData.fatherName : '',
    occupationType: editBorrowerData ? editBorrowerData.occupationType : '',
    panNumber: editBorrowerData ? editBorrowerData.panNumber : '',
    aadhaarNumber: editBorrowerData ? editBorrowerData.aadhaarNumber : '',
    addressLine1: editBorrowerData ? editBorrowerData.addressLine1 : '',
    addressLine2: editBorrowerData ? editBorrowerData.addressLine2 : '',
    pinCode: editBorrowerData ? editBorrowerData.pinCode : 0,
    residingSince: editBorrowerData ? editBorrowerData.residingSince : '',
    ownerShipType: editBorrowerData ? editBorrowerData.ownerShipType : '',
    residenceAddressLine1: editBorrowerData ? editBorrowerData.residenceAddressLine1 : '',
    residenceAddressLine2: editBorrowerData ? editBorrowerData.residenceAddressLine2 : '',
    residencePinCode: editBorrowerData ? editBorrowerData.residencePinCode : 0,
    residenceResidingSince: editBorrowerData ? editBorrowerData.residenceResidingSince : '',
    residenceOwnerShipType: editBorrowerData ? editBorrowerData.residenceOwnerShipType : '',
    businessName: editBorrowerData ? editBorrowerData.businessName : '',
    annualTurnOver: editBorrowerData ? editBorrowerData.annualTurnOver : '',
    industryType: editBorrowerData ? editBorrowerData.industryType : '',
    businessType: editBorrowerData ? editBorrowerData.businessType : '',
    accountType: editBorrowerData ? editBorrowerData.accountType : 0,
    accountHolder: editBorrowerData ? editBorrowerData.accountHolder : '',
    accountNumber: editBorrowerData ? editBorrowerData.accountNumber : 0,
    ifsc: editBorrowerData ? editBorrowerData.ifsc : '',
    bankStatement: null,
    sameAsPermanentAddress: editBorrowerData ? editBorrowerData.sameAsPermanentAddress : false,
    createdBy: user_id
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const newBorrowersData = new FormData();

      Object.keys(values).forEach((key) => {
        if (key === 'bankStatement' && values[key]) {
          // If the field is a file, append the file
          newBorrowersData.append(key, values[key]);
        } else {
          // Append other non-file values as usual
          newBorrowersData.append(key, values[key]);
        }
      });
      editBorrowerData ? await EditBorrowerDetails(newBorrowersData) : await AddBorrowerDetails(newBorrowersData);
      handleCloseDrawer();
      formik.resetForm();
      setActiveStep(0);
      setEditBorrowerData('');
    }
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleChange = (field) => (event) => {
    const value = field === 'bankStatement' ? event.target.files[0] : event.target.value;
    formik.setFieldValue(field, value); // Update Formik state
  };

  useEffect(() => {
    if (formik.values.sameAsPermanentAddress) {
      formik.setFieldValue('residenceAddressLine1', formik.values.addressLine1);
      formik.setFieldValue('residenceAddressLine2', formik.values.addressLine2);
      formik.setFieldValue('residencePinCode', formik.values.pinCode);
      formik.setFieldValue('residenceResidingSince', formik.values.residingSince);
      formik.setFieldValue('residenceOwnerShipType', formik.values.ownerShipType);
    } else {
      formik.setFieldValue('residenceAddressLine1', '');
      formik.setFieldValue('residenceAddressLine2', '');
      formik.setFieldValue('residencePinCode', '');
      formik.setFieldValue('residenceResidingSince', '');
      formik.setFieldValue('residenceOwnerShipType', '');
    }
    // eslint-disable-next-line
  }, [formik.values.sameAsPermanentAddress]);

  useEffect(() => {
    if (editBorrowerData?.bankStatement && typeof editBorrowerData.bankStatement === 'object') {
      const EditFile = new File([''], editBorrowerData?.bankStatement.fileName);
      formik.setFieldValue('bankStatement', EditFile);
    }
    // eslint-disable-next-line
  }, [editBorrowerData.bankStatement]);

  const steps = [
    {
      id: 1,
      label: 'Personal Details',
      content: () => (
        <Box>
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('firstName')}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField label="Middle Name" fullWidth margin="normal" {...formik.getFieldProps('middleName')} />
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('lastName')}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <InputLabel htmlFor="outlined-adornment-password">Date Of Birth</InputLabel>
          <TextField
            name="dateOfBirth"
            type="date"
            fullWidth
            {...formik.getFieldProps('dateOfBirth')}
            error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
            helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
          />
          <TextField
            label="Gender"
            select
            fullWidth
            margin="normal"
            {...formik.getFieldProps('gender')}
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            helperText={formik.touched.gender && formik.errors.gender}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </TextField>

          <TextField
            label="Father`s Name"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('fatherName')}
            error={formik.touched.fatherName && Boolean(formik.errors.fatherName)}
            helperText={formik.touched.fatherName && formik.errors.fatherName}
          />

          <TextField
            label="Email ID"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('emailID')}
            error={formik.touched.emailID && Boolean(formik.errors.emailID)}
            helperText={formik.touched.emailID && formik.errors.emailID}
          />
          <TextField
            label="Phone Number"
            type="number"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('phoneNumber')}
            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />

          <TextField
            label="Occupation Type"
            select
            fullWidth
            margin="normal"
            {...formik.getFieldProps('occupationType')}
            error={formik.touched.occupationType && Boolean(formik.errors.occupationType)}
            helperText={formik.touched.occupationType && formik.errors.occupationType}
          >
            <MenuItem value="Salaried">Salaried</MenuItem>
            <MenuItem value="Self Employed">Self Employed</MenuItem>
            <MenuItem value="Retired">Retired</MenuItem>
            <MenuItem value="Housewife">Housewife</MenuItem>
            <MenuItem value="Student">Student</MenuItem>
          </TextField>
          <TextField
            label="Aadhaar Number"
            fullWidth
            type="number"
            margin="normal"
            {...formik.getFieldProps('aadhaarNumber')}
            error={formik.touched.aadhaarNumber && Boolean(formik.errors.aadhaarNumber)}
            helperText={formik.touched.aadhaarNumber && formik.errors.aadhaarNumber}
          />
        </Box>
      )
    },
    {
      id: 2,
      label: 'Permanent Address',
      content: () => (
        <Box>
          <TextField label="Address Line 1" fullWidth margin="normal" {...formik.getFieldProps('addressLine1')} />
          <TextField label="Address Line 2" fullWidth margin="normal" {...formik.getFieldProps('addressLine2')} />
          <TextField label="Pin Code" type="number" fullWidth margin="normal" {...formik.getFieldProps('pinCode')} />
          <TextField label="Residing Since" fullWidth margin="normal" {...formik.getFieldProps('residingSince')} />
          <TextField label="OwnerShip Type" select fullWidth margin="normal" {...formik.getFieldProps('ownerShipType')}>
            <MenuItem value="Owned">Owned</MenuItem>
            <MenuItem value="Family">Family</MenuItem>
            <MenuItem value="Rented">Rented</MenuItem>
          </TextField>
        </Box>
      )
    },
    {
      id: 3,
      label: 'Residence Address',
      content: () => (
        <Box>
          <FormControlLabel
            control={<Checkbox checked={formik.values.sameAsPermanentAddress} {...formik.getFieldProps('sameAsPermanentAddress')} />}
            label="Same as Permanent Address"
            sx={{
              paddingTop: '20px'
            }}
          />
          <TextField label="Address Line 1" fullWidth margin="normal" {...formik.getFieldProps('residenceAddressLine1')} />
          <TextField label="Address Line 2" fullWidth margin="normal" {...formik.getFieldProps('residenceAddressLine2')} />
          <TextField label="Pin Code" fullWidth type="number" margin="normal" {...formik.getFieldProps('residencePinCode')} />
          <TextField label="Residing Since" fullWidth margin="normal" {...formik.getFieldProps('residenceResidingSince')} />
          <TextField label="OwnerShip Type" select fullWidth margin="normal" {...formik.getFieldProps('residenceOwnerShipType')}>
            <MenuItem value="Owned">Owned</MenuItem>
            <MenuItem value="Family">Family</MenuItem>
            <MenuItem value="Rented">Rented</MenuItem>
          </TextField>
        </Box>
      )
    },
    {
      id: 4,
      label: 'Business Details',
      content: () => (
        <Box>
          <TextField label="Business Name" fullWidth margin="normal" {...formik.getFieldProps('businessName')} />

          <TextField
            label="Annual TurnOver (IN lakh)"
            type="number"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('annualTurnOver')}
          ></TextField>
          <TextField label="Industry Type" fullWidth margin="normal" {...formik.getFieldProps('industryType')}></TextField>
          <TextField label="Business Type" fullWidth margin="normal" {...formik.getFieldProps('businessType')}></TextField>
        </Box>
      )
    },
    {
      id: 5,
      label: 'Bank Details',
      content: () => (
        <>
          <TextField
            label="PAN Number"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('panNumber')}
            error={formik.touched.panNumber && Boolean(formik.errors.panNumber)}
            helperText={formik.touched.panNumber && formik.errors.panNumber}
          />
          <TextField label="Account Type" select fullWidth margin="normal" {...formik.getFieldProps('accountType')}>
            <MenuItem value="Saving">Saving</MenuItem>
            <MenuItem value="Current">Current</MenuItem>
          </TextField>
          <TextField label="Account Holder Name" fullWidth margin="normal" {...formik.getFieldProps('accountHolder')} />
          <TextField label="Account Number" fullWidth type="number" margin="normal" {...formik.getFieldProps('accountNumber')} />
          <TextField label="IFSC" fullWidth margin="normal" {...formik.getFieldProps('ifsc')} />
          <InputLabel htmlFor="outlined-adornment-password">6 Month Statement</InputLabel>
          <TextField
            type="file"
            fullWidth
            onChange={(event) => {
              const file = event.currentTarget.files[0];
              formik.setFieldValue('bankStatement', file);
            }}
            accept="image/*,application/pdf"
            style={{ color: 'blue', cursor: 'pointer' }}
          />
          {editBorrowerData?.bankStatement?.fileName && (
            <Typography sx={{ color: 'blue', textAlign: 'center', paddingTop: '5px' }}>
              File Name :- {editBorrowerData?.bankStatement?.fileName}
            </Typography>
          )}
        </>
      )
    }
  ];

  return (
    <div>
      <Drawer anchor="right" open={drawerOpen} PaperProps={{ style: { width: '420px' } }}>
        <form onSubmit={formik.handleSubmit}>
          <Box p={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>{steps[activeStep]?.label}</h3>
              <ClearIcon
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  handleCloseDrawer();
                  formik.resetForm();
                  setActiveStep(0);
                  setEditBorrowerData('');
                }}
              />
            </Box>
            {/* Stepper progress */}
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps?.map((step) => (
                <Step key={step.id}>
                  <StepLabel />
                </Step>
              ))}
            </Stepper>

            {steps[activeStep].content(handleChange)}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              {activeStep === steps.length - 1 ? (
                <Button variant="contained" onClick={() => setActiveStep(0)}>
                  Reset
                </Button>
              ) : (
                <Button variant="contained" color="secondary" disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
              )}

              <Button
                variant="contained"
                onClick={handleNext}
                style={{ display: activeStep === steps.length - 1 ? 'none' : 'inline-block' }}
              >
                Next
              </Button>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                style={{ display: activeStep === steps.length - 1 ? 'inline-block' : 'none' }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </form>
      </Drawer>
    </div>
  );
};

export default AddBorrowersWithStepper;
