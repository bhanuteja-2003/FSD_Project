import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import './form';
import './form.css';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '../../utils/firebase/firebase.utils';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(10),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(5),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

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

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const check = (JsonData, number) => {
  console.log(number);

  for (var i = 0; i < JsonData.length; i++) {
    console.log(typeof JsonData[i].aadhar);

    if (parseInt(JsonData[i].aadhar) === parseInt(number)) {
      break;
    }
  }
  if (i < JsonData.length) {
    return (
      <div>
        <Typography style={{ fontSize: '20px', color: 'Red' }} gutterBottom>
          <p>
            Name:{' '}
            <span style={{ marginLeft: '10px', color: 'green' }}>
              {JsonData[i].name}{' '}
            </span>{' '}
          </p>
        </Typography>
        <Typography style={{ fontSize: '20px', color: 'Red' }} gutterBottom>
          <p>
            Aadhar:{' '}
            <span style={{ marginLeft: '10px', color: 'green' }}>
              {JsonData[i].aadhar}
            </span>{' '}
          </p>
        </Typography>
        <Typography style={{ fontSize: '20px', color: 'Red' }} gutterBottom>
          <p>
            Phone:{' '}
            <span span style={{ marginLeft: '10px', color: 'green' }}>
              {JsonData[i].phone}{' '}
            </span>{' '}
          </p>
        </Typography>
        <Typography style={{ fontSize: '20px', color: 'Red' }} gutterBottom>
          <p>
            Email:{' '}
            <span span style={{ marginLeft: '10px', color: 'green' }}>
              {JsonData[i].email}{' '}
            </span>{' '}
          </p>
        </Typography>
        <Typography style={{ fontSize: '20px', color: 'Red' }} gutterBottom>
          <p>
            District:{' '}
            <span span style={{ marginLeft: '10px', color: 'green' }}>
              {JsonData[i].district}{' '}
            </span>{' '}
          </p>
        </Typography>
        <Typography style={{ fontSize: '20px', color: 'Red' }} gutterBottom>
          <p>
            Username:{' '}
            <span span style={{ marginLeft: '10px', color: 'green' }}>
              {JsonData[i].username}{' '}
            </span>{' '}
          </p>
        </Typography>
      </div>
    );
  } else {
    return <Typography gutterBottom>Enter correct Number</Typography>;
  }
};
export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);
  const [element, setElement] = React.useState(<></>);
  const [number, setnumber] = React.useState(0);
  const [data, setdata] = React.useState([]);
  // const userDocRef = collection((db, 'User'));
  React.useEffect(() => {
    const getUsers = async () => {
      const j = [];
      const d = await getDocs(collection(db, 'User'));
      d.forEach((elem) => {
        j.push(elem.data());
      });
      setdata(j);
    };
    getUsers();
  }, []);

  const handleClickOpen = () => {
    setElement(check(data, number));
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <label>Aadhar :</label>
      <input
        id="aadhar2"
        type="number"
        onChange={(e) => setnumber(e.target.value)}
      />
      <Button id="but2" variant="outlined" onClick={handleClickOpen}>
        Submit
      </Button>
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

        <DialogContent dividers>{element}</DialogContent>
      </BootstrapDialog>
    </div>
  );
}
