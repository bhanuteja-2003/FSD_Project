import { Box, createTheme, Stack, ThemeProvider } from '@mui/material';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../utils/firebase/firebase.utils';
import LeftBar from './LeftBar';
import NavBar from './NavBar';
import Tweets from './PostsListComponent';
import RightBar from './RightBar';

import { useContext } from 'react';
import { UserContext } from '../Context/UserProvider';
import AddPost from './AddPost';

const PostPage = () => {
  const [mode, setMode] = useState('light');
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const [posts, setPosts] = useState([]);
  const context = useContext(UserContext);
  useEffect(() => {
    const fetchingAllPosts = async () => {
      const collectionRef = collection(db, 'Posts');
      const q = query(collectionRef, orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const allPosts = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setPosts(allPosts);
      });
      return unsubscribe;
    };
    fetchingAllPosts();
    return () => {
      console.log('cleanup');
    };
  }, []);

  const addPostToFirestore = ({ message, imageUrl }) => {
    const docRef = collection(db, 'Posts');
    addDoc(docRef, {
      message: message,
      image: imageUrl,
      userId: context?.uid,
      createdAt: serverTimestamp(),
    });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      {context?.uid ? (
        <Box bgcolor={'background.default'} color={'text.primary'}>
          <NavBar />
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <LeftBar mode={mode} setMode={setMode} />
            {posts.length > 0 ? <Tweets posts={posts} /> : null}
            <RightBar />
          </Stack>
          <AddPost savePost={addPostToFirestore} />
        </Box>
      ) : (
        <p>You do not have access to this page please login first</p>
      )}
    </ThemeProvider>
  );
};

export default PostPage;
