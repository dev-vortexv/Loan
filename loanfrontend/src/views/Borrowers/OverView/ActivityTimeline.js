import React, { useEffect, useState } from "react";

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { Card, Typography, Box, CircularProgress } from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import { getApi } from 'services/api';


const ActivityTimeline = ({ data }) => {
 
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLoansTimeline = async () => {
    try {
      const response = await  getApi(`loan/loanTimeline/${data._id}`);
      setLoans(response.data.loans);
    } catch (error) {
      console.error("Error fetching loans:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchLoansTimeline();
  }, [data._id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!loans.length) {
    return <Typography>No loans found for this borrower.</Typography>;
  }

  return (
    <Box>
      {loans.map((loan, loanIndex) => (
        <Card key={loanIndex} sx={{ mb: 3 }}>
          <Box p={2}>
            <Typography variant="h6">Loan Number: {loan.loanNumber}</Typography>
          </Box>
          <Box px={2}>
            <Timeline>
              {loan.statusHistory.map((status, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot
                      color={
                        status.status === "fullyPaid"
                          ? "success"
                          : status.status === "denied"
                          ? "error"
                          : "primary"
                      }
                    >
                      <ExploreIcon />
                    </TimelineDot>
                    {index < loan.statusHistory.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography variant="body1" color="textPrimary">
                      Status: {status.status}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Changed On: {new Date(status.changedOn).toLocaleString()}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default ActivityTimeline;
