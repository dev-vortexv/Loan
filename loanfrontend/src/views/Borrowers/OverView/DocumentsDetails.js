/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Box, Button, IconButton } from '@mui/material';
import Iconify from '../../../ui-component/iconify';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AddDocuments from './AddDocuments';
import { postApi, getApi, deleteApi, EditApi } from 'services/api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModel from '../../../ui-component/Deletemodle';

const DocumentsDetails = () => {
  const params = useParams();

  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [borrowerDocuments, setBorrowerDocuments] = useState(false);
  const [deleteBorrowerDocument, setDeleteBorrowerDocument] = useState('');
  const [editBorrowerDocumentData, setEditBorrowerDocumentData] = useState('');

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  //  api
  const addBorrowersDocuments = async (data) => {
    const formData = new FormData();
    formData.append('file', data.file); // Append the actual file here
    formData.append('fileName', data.fileName);
    formData.append('createdBy', data.createdBy);
    const result = await postApi(`borrower/documents/${params.id}`, formData);
    if (result && result.status === 201) {
      getBorrowersDocuments();
    }
  };

  const getBorrowersDocuments = async () => {
    const result = await getApi(`borrower/documentsList/${params.id}`);
    if (result && result.status === 200) {
      setBorrowerDocuments(result?.data?.documents);
    }
  };

  const deleteBorrowersDocuments = async (id) => {
    const result = await deleteApi(`borrower/documentsDelete/${id}`, id);
    if (result && result.status === 200) {
      getBorrowersDocuments();
    }
    handleCloseDelete();
  };

  const editBorrowerDocumentDetails = async (values) => {
    const formData = new FormData();
    formData.append('file', values.file);
    formData.append('fileName', values.fileName);
    formData.append('createdBy', values.createdBy);
    const result = await EditApi(`borrower/documentsEdit/${editBorrowerDocumentData._id}`, formData);
    if (result && result.status === 200) {
      getBorrowersDocuments();
    }
  };

  useEffect(() => {
    getBorrowersDocuments();
    // eslint-disable-next-line
  }, []);
  const columns = [
    {
      field: '_id',
      headerName: 'S.No.',
      flex: 0.5,
      valueGetter: (index) => index.api.getRowIndexRelativeToVisibleRows(index.row._id) + 1
    },
    {
      field: 'fileName',
      headerName: 'Documents Name',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'file',
      headerName: 'Documents file',
      flex: 1,
      renderCell: (params) => {
        const fileName = params?.row?.file?.name;
        const fileUrl = `https://localhost:4000/uploads/borrowersDocuments/${fileName}`; // Replace with your actual backend URL

        return fileName ? (
          <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="name-column--cell--link">
            {fileName}
          </a>
        ) : null; // Show nothing if no file name exists
      }
    },

    {
      field: 'action',
      headerName: 'action',
      flex: 1,
      renderCell: (params) => {
        const handleDeleteClick = async (row) => {
          setDeleteBorrowerDocument(row._id);
          handleOpenDelete();
        };
        const handleEditClick = async (row) => {
          setEditBorrowerDocumentData(row);
          handleOpenAdd();
        };

        return (
          <Box>
            <IconButton
              fontSize="40px"
              color="primary"
              onClick={() => {
                handleEditClick(params?.row);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                handleDeleteClick(params?.row);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      }
    }
  ];

  function CustomToolbar({ handleOpenAdd }) {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <GridToolbar />
        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
          Add Documents
        </Button>
      </div>
    );
  }

  return (
    <>
      <DeleteModel
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
        deleteData={deleteBorrowersDocuments}
        deleteId={deleteBorrowerDocument}
      />
      <AddDocuments
        open={openAdd}
        handleClose={handleCloseAdd}
        addBorrowersDocuments={addBorrowersDocuments}
        editBorrowerDocumentData={editBorrowerDocumentData}
        editBorrowerDocumentDetails={editBorrowerDocumentDetails}
        setEditBorrowerDocumentData={setEditBorrowerDocumentData}
      />
      <Container>
        <Box width="100%">
          <Card style={{ height: '600px', paddingTop: '15px' }}>
            <DataGrid
              rows={borrowerDocuments ?? []}
              columns={columns}
              getRowId={(row) => row._id}
              slots={{ toolbar: CustomToolbar }}
              slotProps={{ toolbar: { handleOpenAdd } }}
            />
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default DocumentsDetails;
