/* eslint-disable react/prop-types */
import { Box, Card, Grid, Typography, IconButton } from '@mui/material';

import React from 'react';
import Palette from '../../../ui-component/ThemePalette';
import EditIcon from '@mui/icons-material/Edit';

// eslint-disable-next-line arrow-body-style
const PersonalDocument = ({ data , onEdit }) => (
  <Card>
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Personal Documents Details</Typography>
        <IconButton onClick={onEdit} sx={{ color: 'blue' }} aria-label="edit">
          <EditIcon />
        </IconButton>
      </Box>

      <Grid container spacing={2} style={{ marginTop: '3px' }}>
        <Grid item xs={6}>
          <Typography variant="body1">Aadhar Number</Typography>
          <Typography variant="body2" color={Palette.grey[600]}>
            {data?.aadhaarNumber || '--'}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Pan Number</Typography>
          <Typography variant="body2" color={Palette.grey[600]}>
            {data?.panNumber || '--'}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Contact No.</Typography>
          <Typography variant="body2" color={Palette.grey[600]}>
            {data?.phoneNumber ? data?.phoneNumber : '--'}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Documents Status</Typography>
          <Typography variant="body2" color={Palette.grey[600]}>
            {data?.status || '--'}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

export default PersonalDocument;
