import PostComponent from './PostComponent';
import Container from '@mui/material/Container';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material';

const Tweets = ({ posts }) => {
  return (
    <Box flex={4} p={2}>
      {posts.map((post) => {
        return <PostComponent post={post} />;
      })}
    </Box>
  );
};

export default Tweets;
