/* eslint-disable react/prop-types */
import { Box, Card, Grid, Typography, IconButton } from '@mui/material';

import React from 'react';
import Palette from '../../../ui-component/ThemePalette';
import EditIcon from '@mui/icons-material/Edit';

// eslint-disable-next-line arrow-body-style
const ResidenceAddress = ({ data , onEdit }) => (
  <Card>
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Residence Address</Typography>
        <IconButton onClick={onEdit} sx={{ color: 'blue' }} aria-label="edit">
          <EditIcon />
        </IconButton>
      </Box>

      <Grid container spacing={2} style={{ marginTop: '3px' }}>
        <Grid item xs={6}>
          <Typography variant="body1"> Residence AddressLine1</Typography>
          <Typography variant="body2" color={Palette.grey[600]}>
            {data?.residenceAddressLine1 ? data?.residenceAddressLine1 : '--'}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Residence AddressLine2</Typography>
          <Typography variant="body2" color={Palette.grey[600]}>
            {data?.residenceAddressLine2 || '--'}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Residence OwnerShipType</Typography>
          <Typography variant="body2" color={Palette.grey[600]}>
            {data?.residenceOwnerShipType || '--'}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Residence PinCode</Typography>
          <Typography variant="body2" color={Palette.grey[600]}>
            {data?.residencePinCode || '--'}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

export default ResidenceAddress;
