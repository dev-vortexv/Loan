/* eslint-disable */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Container, Grid, Stack, Tab, Tabs } from '@mui/material';
import React, { useState, useEffect } from 'react';

import Currency from './Currency';

import Header from '../../ui-component/Header';

import { CustomTabPanel, a11yProps } from '../../ui-component/CustomTabPanel';
import PaymentMethod from './Payment Method';

// import { toast } from 'react-toastify';
const Setting = () => {
  const [value, setValue] = useState(0);

  // tab
  const handleChange = (_, newValue) => setValue(newValue);

  return (
    <div>
      <Container>
        <Grid container display="flex" alignItems="center">
          <Stack direction="row" alignItems="center" mb={3} justifyContent={'space-between'} width={'100%'}>
            <Header title={'Setting tab'} />

            <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}></Stack>
          </Stack>
        </Grid>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '0px' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label={'Currency'} {...a11yProps(0)} />
              <Tab label={'Payment Method'} {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Currency />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <PaymentMethod />
          </CustomTabPanel>
        </Box>
      </Container>
    </div>
  );
};

export default Setting;
