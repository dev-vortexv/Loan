/* eslint-disable react/prop-types */
import { Box, Card, Grid, Typography } from '@mui/material';
import React from 'react';
import Palette from '../../../ui-component/ThemePalette';

const BankDetails = ({ data }) => {
  return (
    <div>
      <Card style={{ borderTopLeftRadius: '0px', borderTopRightRadius: '0px' }}>
        <Box p={3}>
          <Grid container display="flex" spacing={4}>
            <Grid item xs={12} sm={6}>
              <Grid style={{ borderBottom: '1.5px dashed', borderBottomColor: Palette.grey[400] }} pb={2}>
                <Typography variant="body1">Borrowers Name</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>
                  {data?.borrowerName ? data?.borrowerName : '--'}
                </Typography>
              </Grid>
              <Grid
                style={{
                  borderBottom: '1.5px dashed',
                  borderBottomColor: Palette.grey[400],
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
                py={2}
              >
                <Grid>
                  <Typography variant="body1">Loan Type</Typography>
                  <Typography variant="body2" color={Palette.grey[600]}>
                    {data?.loanType ? data?.loanType : '--'}
                  </Typography>
                </Grid>
                <Grid>
                  <Typography variant="body1">Landers Name</Typography>
                  <Typography variant="body2" color={Palette.grey[600]}>
                    {data?.landersName ? data?.landersName : '--'}
                  </Typography>
                </Grid>
              </Grid>
              <Grid style={{ borderBottom: '1.5px dashed', borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Interest Rate :</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>
                  {data?.interestRate ? data?.interestRate : '--'}
                </Typography>
              </Grid>
              <Grid style={{ borderBottom: '1.5px dashed', borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Duration Period :</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>
                  {data?.durationPeriod ? data?.durationPeriod : '--'}
                </Typography>
              </Grid>
              <Grid style={{ borderBottom: '1.5px dashed', borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Loan Duration :</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>
                  {data?.loanDuration ? data?.loanDuration : '--'}
                </Typography>
              </Grid>
              <Grid style={{ borderBottom: '1.5px dashed', borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1"> Loan Status :</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>
                  {data?.loanStatus ? data?.loanStatus : '--'}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid style={{ borderBottom: '1.5px dashed', borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1"> Principle Amount:</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>
                  {data?.principleAmount ? data?.principleAmount : '--'}
                </Typography>
              </Grid>
              <Grid style={{ borderBottom: '1.5px dashed', borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Interest Amount :</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>
                  {data?.interestAmount ? data?.interestAmount : '--'}
                </Typography>
              </Grid>
              <Grid style={{ borderBottom: '1.5px dashed', borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1"> Repayment Amount :</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>
                  {data?.repaymentAmount ? data?.repaymentAmount : '--'}
                </Typography>
              </Grid>
              <Grid style={{ borderBottom: '1.5px dashed', borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1"> Release Date :</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>
                  {data?.releaseDate ? data?.releaseDate : '--'}
                </Typography>
              </Grid>
              <Grid style={{ borderBottom: '1.5px dashed', borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1"> Payment Type :</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>
                  {data?.paymentMethod ? data?.paymentMethod : '--'}
                </Typography>
              </Grid>
              <Grid style={{ borderBottom: '1.5px dashed', borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1"> Transaction Reference :</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>
                  {data?.TransactionReference ? data?.TransactionReference : '--'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  );
};

export default BankDetails;
