/* eslint-disable */
import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import TotalDefaultCard from './TotalDefaultCard';
import AllUsersCard from './AllUsersCard';
import TotalApprovedCard from './TotalApprovedCard';
import TotalPendingCard from './TotalPendingCard';
import TotalFullyPaidCard from './TotalFullyPaidCard';
import TotalLoanGrowthChart from './TotalLoanGrowthChart';
import { gridSpacing } from 'store/constant';
import { getApi } from '../../services/api';

// ==============================|| ADMIN DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [fullyPaidData, setFullyPaidData] = useState([]);
  const [approvedData, setApprovedData] = useState([]);
  const [defaultData, setDefaultData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    setLoading(false);
  }, []);

  const getAllFullyPaidData = async () => {
    const response = await getApi(`loan/allLoans/fullyPaid`);
    if (response && response.status === 200) {
      setFullyPaidData(response.data.loans);
    }
  };

  const getAllApprovedData = async () => {
    const response = await getApi(`loan/allLoans/approved`);
    if (response && response.status === 200) {
      setApprovedData(response.data.loans);
    }
  };

  const getAllDefaultData = async () => {
    const response = await getApi(`loan/allLoans/defaulted`);
    if (response && response.status === 200) {
      setDefaultData(response.data.loans);
    }
  };

  const getAllPendingData = async () => {
    const response = await getApi(`loan/allLoans/pending`);
    if (response && response.status === 200) {
      setPendingData(response.data.loans);
    }
  };

  const getAllUsersData = async () => {
    const response = await getApi(`/user/getAllUser`);
    if (response && response.status === 200) {
      setUsersData(response?.data?.result);
    }
  };

  const getAllLoanGraphData = async () => {
    const response = await getApi(`loan/totalLoanGraph`);
    if (response && response.status === 200) {
      setGraphData(response?.data?.result);
    }
  };

  useEffect(() => {
    getAllFullyPaidData();
    getAllApprovedData();
    getAllLoanGraphData();
    getAllDefaultData();
    getAllPendingData();
    getAllUsersData();
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <TotalApprovedCard isLoading={isLoading} approvedData={approvedData} />
          </Grid>

          <Grid item sm={6} xs={12} md={6} lg={3}>
            <TotalPendingCard isLoading={isLoading} pendingData={pendingData} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <TotalDefaultCard isLoading={isLoading} defaultData={defaultData} />
          </Grid>
          <Grid item sm={6} xs={12} md={6} lg={3}>
            <TotalFullyPaidCard isLoading={isLoading} fullyPaidData={fullyPaidData} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <TotalLoanGrowthChart isLoading={isLoading} graphData={graphData} />
          </Grid>
          <Grid item xs={12} md={4}>
            <AllUsersCard isLoading={isLoading} usersData={usersData} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
