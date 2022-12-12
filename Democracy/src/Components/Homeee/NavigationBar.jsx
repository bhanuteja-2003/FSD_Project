import { useState, useContext } from 'react';

import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Avatar,
  Badge,
  Menu,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Notifications, Search } from '@mui/icons-material';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { UserContext } from '../../Context/UserProvider';
import { db, signOutUser } from '../../utils/firebase/firebase.utils';
import { collection, onSnapshot, query } from 'firebase/firestore';

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',

  backgroundColor: 'orange',
}));

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'orange',
}));

const IconContainer = styled(Box)(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  gap: '20px',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

const logoutHandler = async () => {
  await signOutUser();
};

function NavigationBar({ admin }) {
  const [openProfile, setOpenProfile] = useState(false);
  const context = useContext(UserContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  console.log(context);
  const submitHandler = (e) => {
    e.preventDefault();
    const adminRef = collection(db, 'admin');
    const q = query(adminRef);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allAdmins = querySnapshot.docs.forEach((doc) => {
        if (doc.data().Name === name && doc.data().Password === password) {
          window.location.replace('/admin');
        }
      });
    });
    return unsubscribe;
  };
  return (
    <AppBar position="sticky">
      <CustomToolbar>
        <Typography variant="h6" sx={{ display: { xs: 'none', sm: 'block' } }}>
          DEMOCRACY
        </Typography>
        <AssuredWorkloadIcon sx={{ display: { xs: 'block', sm: 'none' } }} />
        <IconContainer>
          {context?.uid ? (
            <Link to={'/tweets'}>
              <CustomButton>Tweet</CustomButton>
            </Link>
          ) : null}
          {!context?.uid ? (
            <Link to={'/register'}>
              <CustomButton>SignUp</CustomButton>
            </Link>
          ) : null}
          {!context?.uid ? (
            <Link to={'/login'} sx={{ backgroundColor: 'orange' }}>
              <CustomButton>Login</CustomButton>
            </Link>
          ) : null}
          {!admin ? (
            <div>
              <div>
                <CustomButton
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#myModal"
                  variant="outlined"
                >
                  Admin
                </CustomButton>
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
                          <label class="form-label required">Password</label>
                          <input
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
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
          ) : (
            <Link to={'/Home'}>
              <CustomButton>Home</CustomButton>
            </Link>
          )}
          <Link to={'/complaints'}>
            <CustomButton>Complaint</CustomButton>
          </Link>
          {context?.uid ? (
            <CustomButton onClick={logoutHandler}>Logout</CustomButton>
          ) : null}
          <Badge badgeContent={2} color="error">
            <Notifications />
          </Badge>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            onClick={(e) => setOpenProfile(true)}
          />
        </IconContainer>
        <UserBox onClick={(e) => setOpenProfile(true)}>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <Typography variant="span">JohnSena</Typography>
        </UserBox>
      </CustomToolbar>
      <Menu
        id="basic-menu"
        open={openProfile}
        onClose={(e) => setOpenProfile(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
}
export default NavigationBar;
