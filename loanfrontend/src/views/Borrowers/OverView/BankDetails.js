/* eslint-disable react/prop-types */
import { Box, Card, Grid, Typography, IconButton } from '@mui/material';

import React from 'react';
import Palette from '../../../ui-component/ThemePalette';
import EditIcon from '@mui/icons-material/Edit';

// eslint-disable-next-line arrow-body-style
const BankDetailsCard = ({ data , onEdit }) => (
  <Card>
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Bank Details</Typography>
        <IconButton onClick={onEdit} sx={{ color: 'blue' }} aria-label="edit">
          <EditIcon />
        </IconButton>
      </Box>

      <Grid container spacing={2} style={{ marginTop: '3px' }}>
        <Grid item xs={6}>
          <Typography variant="body1">Account Holder</Typography>
          <Typography variant="body2" color={Palette.grey[600]}>
            {data?.accountHolder ? data?.accountHolder : '--'}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Account Type</Typography>
          <Typography variant="body2" color={Palette.grey[600]}>
            {data?.accountType || '--'}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Account Number</Typography>
          <Typography variant="body2" color={Palette.grey[600]}>
            {data?.accountNumber || '--'}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Statement File</Typography>
          <Typography variant="body2" color={Palette.grey[600]}>
            {data?.bankStatement?.fileName || '--'}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

export default BankDetailsCard;
