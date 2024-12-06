/* eslint-disable react/prop-types */
import { Box, Card, Grid, Typography, IconButton } from '@mui/material';

import React from 'react';
import Palette from '../../../ui-component/ThemePalette';
import EditIcon from '@mui/icons-material/Edit';

// eslint-disable-next-line arrow-body-style
const PersonalDetailsCard = ({ data , onEdit }) => (
  <Card>
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Personal Details</Typography>
        <IconButton onClick={onEdit} sx={{ color: 'blue' }} aria-label="edit">
          <EditIcon />
        </IconButton>
      </Box>

      <Grid container spacing={2} style={{ marginTop: '3px' }}>
        <Grid item xs={6}>
          <Typography variant="body1">Borrowers Name</Typography>
          <Typography variant="body2" color={Palette.grey[600]}>
            {data?.firstName ? `${data.firstName} ${data.lastName}` : '--'}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Fathers Name</Typography>
          <Typography variant="body2" color={Palette.grey[600]}>
            {data?.fatherName || '--'}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Email ID</Typography>
          <Typography variant="body2" color={Palette.grey[600]}>
            {data?.emailID || '--'}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Occupation Type</Typography>
          <Typography variant="body2" color={Palette.grey[600]}>
            {data?.occupationType || '--'}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

export default PersonalDetailsCard;
