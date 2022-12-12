import { Fragment, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  createTheme,
  InputBase,
  alpha,
  Avatar,
  Badge,
  Menu,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Notifications, Search } from '@mui/icons-material';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import { Box } from '@mui/material';

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

const SearchBar = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  padding: '0 10px',
  borderRadius: theme.shape.borderRadius,
  width: '40%',
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

export default function NavBar() {
  const [openProfile, setOpenProfile] = useState(false);
  return (
    // <AppBar position="fixed">
    //   <Toolbar style={styles.toolbar}>
    //     <Logo1 variant="h6">TweetERR</Logo1>
    //     <Logo2 variant="h6">tweet</Logo2>
    //     <div className="search"></div>
    //     <div style={styles.search}>
    //       <Search />
    //       <InputBase placeholder="Search..." />
    //     </div>
    //     <div style={styles.icons}>
    //       <Avatar
    //         alt="Remy"
    //         src="https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg"
    //       />
    //     </div>
    //   </Toolbar>
    // </AppBar>

    <AppBar style={{ backgroundColor: 'orange' }} position="sticky">
      <CustomToolbar>
        <Typography variant="h6" sx={{ display: { xs: 'none', sm: 'block' } }}>
          DemoCracy
        </Typography>
        <AssuredWorkloadIcon sx={{ display: { xs: 'block', sm: 'none' } }} />
        <SearchBar>
          <InputBase placeholder="Search..." />
        </SearchBar>
        <IconContainer>
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
