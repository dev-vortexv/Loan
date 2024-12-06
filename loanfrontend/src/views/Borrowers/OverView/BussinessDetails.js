/* eslint-disable react/prop-types */
import { Box, Card, Grid, Typography, IconButton } from '@mui/material';

import React from 'react';
import Palette from '../../../ui-component/ThemePalette';
import EditIcon from '@mui/icons-material/Edit';

// eslint-disable-next-line arrow-body-style
const BusinessDetailsCard = ({ data , onEdit}) => (
  <Card>
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Business Details</Typography>
        <IconButton  onClick={onEdit}  sx={{ color: 'blue' }} aria-label="edit">
          <EditIcon />
        </IconButton>
      </Box>

      <Grid container spacing={2} style={{ marginTop: '3px' }}>
        <Grid item xs={6}>
          <Typography variant="body1">Business Name</Typography>
          <Typography variant="body2" color={Palette.grey[600]}>
            {data?.businessName ? data?.businessName : '--'}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Business Type </Typography>
          <Typography variant="body2" color={Palette.grey[600]}>
            {data?.businessType || '--'}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="body1">Industry Type</Typography>
          <Typography variant="body2" color={Palette.grey[600]}>
            {data?.industryType || '--'}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Annual TurnOver</Typography>
          <Typography variant="body2" color={Palette.grey[600]}>
            {data?.annualTurnOver || '--'}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

export default BusinessDetailsCard;
