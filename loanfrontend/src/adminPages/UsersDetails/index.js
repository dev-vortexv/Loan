/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
// @mui
import { Stack, Container, Typography, Card, Box } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getApi } from 'services/api';

// ----------------------------------------------------------------------

const UserDetails = () => {
  const user_id = localStorage.getItem('user_id');
  const userRole = localStorage.getItem('userRole');

  const [usersData, setUsersData] = useState([]);
 

  const columns = [
    {
      field: '_id',
      headerName: 'SNo',
      flex: 0.5,
      cellClassName: 'name-column--cell name-column--cell--capitalize',
      valueGetter: (index) => index.api.getRowIndexRelativeToVisibleRows(index.row._id) + 1
    },
    {
      field: 'UserName',
      headerName: 'UserName',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize',
      valueGetter: (params) => {
        return `${params.row.firstName} ${params.row.lastName}`;
      }
    },

    {
      field: 'emailAddress',
      headerName: 'Email',
      flex: 1
    },
    {
      field: 'createdOn',
      headerName: 'StartDate',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize',
      valueFormatter: (params) => {
        const date = new Date(params.value);
        const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleString(undefined, dateOptions);
      }
    }
  ];

  const getAllUsersData = async () => {
    const response = await getApi(userRole === 'superadmin' ? `/user/getAllUser` : `user/list/?createdBy=${user_id}`);
    if (response && response.status === 200) {
      setUsersData(response?.data?.result);
    }
  };

  useEffect(() => {
    getAllUsersData();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">UsersList</Typography>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={usersData ?? []}
                columns={columns}
                getRowId={(row) => row._id}
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true } }}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};

export default UserDetails;
