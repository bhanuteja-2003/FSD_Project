import { styled } from '@mui/material/styles';
import {
  Avatar,
  AvatarGroup,
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from '@mui/material';

const RightBar = () => {
  return (
    <Box flex={2} p={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
      <Box position="fixed">
        <Typography variant="h6" fontWeight={100}>
          Connections
        </Typography>
        <AvatarGroup max={5}>
          <Avatar
            alt="Navan"
            src="https://material-ui.com/static/images/avatar/1.jpg"
          />
          <Avatar
            alt="Navan"
            src="https://material-ui.com/static/images/avatar/1.jpg"
          />
          <Avatar
            alt="Navan"
            src="https://material-ui.com/static/images/avatar/1.jpg"
          />
          <Avatar
            alt="Navan"
            src="https://material-ui.com/static/images/avatar/1.jpg"
          />
          <Avatar
            alt="Navan"
            src="https://material-ui.com/static/images/avatar/1.jpg"
          />
          <Avatar
            alt="Navan"
            src="https://material-ui.com/static/images/avatar/1.jpg"
          />
        </AvatarGroup>

        <Typography variant="h6" fontWeight={100} mt={2} mb={2}>
          Latest Conversations
        </Typography>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt="Remy"
                src="https://material-ui.com/static/images/avatar/7.jpg"
              />
            </ListItemAvatar>
            <ListItemText
              primary="Hello"
              secondary={
                <>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Ali Connors
                  </Typography>
                  {' — hi guys'}
                </>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="ray"
              secondary={
                <>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    to Scott, Alex, Jennifer
                  </Typography>
                  {' —iam busy'}
                </>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/8.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="he Oui"
              secondary={
                <>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Sandra Adams
                  </Typography>
                  {' — lorem epsummm'}
                </>
              }
            />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};
export default RightBar;
