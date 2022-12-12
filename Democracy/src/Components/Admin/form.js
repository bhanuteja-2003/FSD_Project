import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import './form.css';
import { db } from '../../utils/firebase/firebase.utils';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import './form';

import './form.css';
import { addDoc, collection, doc, getDocs } from 'firebase/firestore';

const columns = [
  { field: 'Name', headerName: 'Name', width: 250 },
  { field: 'aadhar', headerName: 'Aadhar', width: 250 },
  { field: 'district', headerName: 'District', width: 250 },
  {
    field: 'email',
    headerName: 'Email',
    width: 250,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 250,
  },
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(10),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(5),
  },
}));

function BootstrapDialogTitle(p) {
  const { children, onClose, ...other } = p;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const check = (JsonData) => {
  let element = [];
  let elements = [];

  for (var i = 0; i < JsonData.length; i++) {
    if (!elements.includes(JsonData[i].district)) {
      elements.push(JsonData[i].district);
      var c = 0;
      for (var j = 0; j < JsonData.length; j++) {
        if (JsonData[i].district === JsonData[j].district) {
          c = c + 1;
        }
      }
      element.push(
        <div>
          <Typography style={{ fontSize: '20px', color: 'Red' }} gutterBottom>
            <p>
              {JsonData[i].district}:{' '}
              <span style={{ marginLeft: '10px', color: 'green' }}>{c} </span>{' '}
            </p>
          </Typography>
        </div>
      );
    }
  }

  return element;
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function JsonDataDisplay() {
  const [data, setdata] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [element, setElement] = React.useState([]);
  const [JsonData, setJsonData] = useState([]);
  const [mla, setMla] = useState([]);
  const [fetchData, setFetchData] = useState(false);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const getUsers = async () => {
      const j = [];
      const d = await getDocs(collection(db, 'User'));
      let i = 1;
      d.forEach((elem) => {
        j.push({ ...elem.data(), id: i });
        i += 1;
      });
      setCounter(i - 1);
      setdata(j);
      setJsonData(j);
    };

    const getMLA = async () => {
      const j = [];
      const d = await getDocs(collection(db, 'MLA'));
      let i = 1;
      d.forEach((elem) => {
        j.push({ ...elem.data(), id: i });
        i += 1;
      });
      setMla(j);
    };
    getUsers();
    getMLA();
  }, []);

  useEffect(() => {
    const getMLA = async () => {
      const j = [];
      const d = await getDocs(collection(db, 'MLA'));
      let i = 1;
      d.forEach((elem) => {
        j.push({ ...elem.data(), id: i });
        i += 1;
      });
      setMla(j);
    };

    getMLA();
  }, [fetchData]);

  const deleterow = (items) => {
    alert('Deleting the row');
    console.log(items);
    let copy = JsonData.filter((item) => item.aadhar !== items.row.aadhar);
    setdata(copy);
    setCounter(counter - 1);
  };
  const columns2 = [
    { field: 'aadhar', headerName: 'Aadhar', width: 250 },
    { field: 'name', headerName: 'Name', width: 250 },
    { field: 'district', headerName: 'District', width: 250 },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 250,
    },
    {
      field: 'username',
      headerName: 'Username',
      width: 250,
    },
    {
      field: 'Delete',
      headerName: 'Delete',
      width: 130,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => deleterow(cellValues)}
          >
            Delete
          </Button>
        );
      },
    },
  ];
  const districtFilter = (e) => {
    let d = JsonData.filter((item) =>
      item.district.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setdata(d);
  };
  const handleClickOpen = () => {
    setElement(check(data));
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [name, setName] = React.useState('');
  const [phone, setphone] = React.useState(0);
  const [dis, setdis] = React.useState('');
  const [aadhar, setaadhar] = React.useState(0);
  const [email, setemail] = React.useState('');
  const [password, setpassword] = React.useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    const docRef = collection(db, 'MLA');
    addDoc(docRef, {
      Name: name,
      phone: phone,
      district: dis,
      aadhar: aadhar,
      email: email,
      password: password,
    });

    setName('');
    setphone(0);
    setdis('');
    setaadhar(0);
    setemail('');
    setpassword('');
    setFetchData(!fetchData);
  };
  return (
    <div>
      <label>District: </label>
      <input id="district2" type="text" onChange={districtFilter} />
      <Button id="but2" variant="outlined" onClick={handleClickOpen}>
        Users From Each District
      </Button>
      <div>
        <div>
          <Button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#myModal"
            id="but2"
            variant="outlined"
          >
            Create User+
          </Button>
        </div>
        <div class="modal" id="myModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Create User</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div class="modal-body">
                <form onSubmit={submitHandler}>
                  <div class="mb-3">
                    <label class="form-label required">Phone Number</label>
                    <input
                      value={phone}
                      onChange={(e) => {
                        setphone(e.target.value);
                      }}
                      type="number"
                      class="form-control"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label required">Name</label>
                    <input
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      type="text"
                      class="form-control"
                    />
                  </div>

                  <div class="mb-3">
                    <label class="form-label required">District</label>
                    <input
                      value={dis}
                      onChange={(e) => {
                        setdis(e.target.value);
                      }}
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label required">Aadhar</label>
                    <input
                      value={aadhar}
                      onChange={(e) => {
                        setaadhar(e.target.value);
                      }}
                      type="number"
                      class="form-control"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label required">Email</label>
                    <input
                      value={email}
                      onChange={(e) => {
                        setemail(e.target.value);
                      }}
                      type="email"
                      class="form-control"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label required">password</label>
                    <input
                      value={password}
                      onChange={(e) => {
                        setpassword(e.target.value);
                      }}
                      type="password"
                      class="form-control"
                    />
                  </div>
                  <button
                    type="submit"
                    class="btn btn-primary "
                    data-bs-dismiss="modal"
                  >
                    Submit
                  </button>
                </form>
              </div>
              <div class="modal-footer"></div>
            </div>
          </div>
        </div>
      </div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Info
        </BootstrapDialogTitle>

        <DialogContent dividers>{element.map((e) => e)}</DialogContent>
      </BootstrapDialog>
      <div>
        <label>Total Users: </label>
        <input id="len2" value={counter} />
      </div>{' '}
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns2}
          pageSize={5}
          rowsPerPageOptions={[10]}
          checkboxSelection
          sx={{
            backgroundColor: 'white',
            fontSize: 18,
          }}
        />
      </div>
      <br />
      <h2>Officers</h2>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={mla}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          sx={{
            backgroundColor: 'white',
            fontSize: 18,
          }}
        />
      </div>
    </div>
  );
}
