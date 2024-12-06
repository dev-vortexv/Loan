/* eslint-disable react/prop-types */
import { Box, Card, Grid, Typography, IconButton } from '@mui/material';

import React from 'react';
import Palette from '../../../ui-component/ThemePalette';
import EditIcon from '@mui/icons-material/Edit';

// eslint-disable-next-line arrow-body-style
const PermanentAddress = ({ data , onEdit  }) => (
  <Card>
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Permanent Address</Typography>
        <IconButton onClick={onEdit} sx={{ color: 'blue' }} aria-label="edit">
          <EditIcon />
        </IconButton>
      </Box>

      <Grid container spacing={2} style={{ marginTop: '3px' }}>
        <Grid item xs={6}>
          <Typography variant="body1">Address Line1</Typography>
          <Typography variant="body2" color={Palette.grey[600]}>
            {data?.addressLine1 ? data?.addressLine1 : '--'}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Address Line2</Typography>
          <Typography variant="body2" color={Palette.grey[600]}>
            {data?.addressLine2 || '--'}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">OwnerShip Type</Typography>
          <Typography variant="body2" color={Palette.grey[600]}>
            {data?.ownerShipType || '--'}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Pin Code</Typography>
          <Typography variant="body2" color={Palette.grey[600]}>
            {data?.pinCode || '--'}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

export default PermanentAddress;
