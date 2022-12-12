import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  ExpandMore,
  ExpandMoreOutlined,
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material';
import {
  Button,
  Checkbox,
  Collapse,
  Divider,
  Input,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import {
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore';
import { db } from '../utils/firebase/firebase.utils';
import { useRef } from 'react';
import { UserContext } from '../Context/UserProvider';

const PostComponent = ({ post }) => {
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [userPosted, setuserPosted] = useState({});
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentTyped, setCommentTyped] = useState('');
  const [comments, setComments] = useState([]);
  const userRef = doc(db, 'User', post.userId);
  const postRef = doc(db, 'Posts', post.id);
  const likeRef = doc(db, 'Like', post.id);
  const commentRef = doc(db, 'Comments', post.id);

  const context = useContext(UserContext);
  // Simpl sfd = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
  // sfd.format(new Date(timestamp));
  const likeChangeHandler = async () => {
    const docSnap = await getDoc(likeRef);
    if (!docSnap.exists()) {
      await setDoc(doc(db, 'Like', post.id), {
        usersLiked: [],
      });
    }
    if (liked) {
      await updateDoc(likeRef, {
        usersLiked: arrayRemove('2eyrsDFWyi0nDMudzxl9'),
      });
      setLiked(!liked);
      setLikeCount(likeCount - 1);
    } else {
      await updateDoc(likeRef, {
        usersLiked: arrayUnion('2eyrsDFWyi0nDMudzxl9'),
      });
      setLiked(!liked);
      setLikeCount(likeCount + 1);
    }
  };

  const handleComment = async () => {
    console.log(commentTyped, 'comment');
    if (commentTyped === '') {
      return;
    }

    const docSnap = await getDoc(commentRef);
    if (!docSnap.exists()) {
      await setDoc(commentRef, {
        postComments: [],
      });
    }
    await updateDoc(commentRef, {
      postComments: arrayUnion({
        uid: context?.uid,
        name: window.localStorage.getItem('name'),
        comment: commentTyped,
      }),
    });
    setCommentTyped('');
  };
  useEffect(() => {
    const fetchSendUser = async () => {
      const doc = await getDoc(userRef);
      setuserPosted(doc.data());
    };
    fetchSendUser();

    const likedMessage = async () => {
      const doc = await getDoc(likeRef);
      //  console.log(doc.data().usersLiked);
      let item = false;
      doc.data()?.usersLiked.forEach((element) => {
        if (element === '2eyrsDFWyi0nDMudzxl9') {
          item = true;
        }
      });
      console.log('kflfl', item);
      if (item) {
        setLiked(true);
        setLikeCount(doc.data()?.usersLiked.length);
      }
    };
    likedMessage();

    const getComments = async () => {
      const doc = await getDoc(commentRef, orderBy('createdAt'));
      const d = doc.data();
      console.log(d?.postComments);
      let com = [];

      d?.postComments?.map((e) => {
        com.push({ comment: e.comment, name: e.name });
      });
      setComments(com);
    };
    getComments();
  }, []);
  console.log(userPosted);
  console.log(post);
  console.log(post.image && post.image.includes('png'));
  // console.log(post.user.then((d) => d));
  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={userPosted?.name}
        // subheader={new Date(post?.createdAt.seconds)}
      />
      {post.image && post.image.includes('mp4') ? (
        <CardMedia
          component="video"
          height="20%"
          src={post.image}
          alt="Paella dish"
          autoPlay
          loop
          muted
          controls
        />
      ) : null}
      {post.image &&
      (post.image.includes('png') ||
        post.image.includes('jpg') ||
        post.image.includes('jpeg')) ? (
        <CardMedia
          component="img"
          height="20%"
          image={post.image}
          alt="Paella dish"
        />
      ) : null}

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: 'red' }} />}
            checked={liked}
            onChange={likeChangeHandler}
          />
          <span>{likeCount} likes</span>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      <Input
        variant="plain"
        size="sm"
        placeholder="Add a comment…"
        sx={{
          flexGrow: 5,
          m: 2,
          '--Input-focusedThickness': '0px',

          width: { xs: '40%', sm: '50%', lg: '75%' },
        }}
        onChange={(e) => setCommentTyped(e.target.value)}
        value={commentTyped}
      />
      <Button
        sx={{
          m: 2,
          borderRadius: 10,
        }}
        onClick={handleComment}
      >
        Post
      </Button>
      <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreOutlined />
      </ExpandMore>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {/* <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
        </CardContent> */}
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {comments.map((c) => {
            return (
              <ListItem
                alignItems="flex-start"
                sx={{ justifyContent: 'center', alignItems: 'center' }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://material-ui.com/static/images/avatar/3.jpg"
                  />
                </ListItemAvatar>
                <ListItemText
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body1"
                        color="text.primary"
                      >
                        {c?.user?.name}
                      </Typography>
                      {c?.comment}
                    </>
                  }
                />
              </ListItem>
            );
          })}
          {/* <ListItem
            alignItems="flex-start"
            sx={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src="https://material-ui.com/static/images/avatar/3.jpg"
              />
            </ListItemAvatar>
            <ListItemText
              secondary={
                <>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body1"
                    color="text.primary"
                  >
                    Ali Connors
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem
            alignItems="flex-start"
            sx={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src="https://material-ui.com/static/images/avatar/3.jpg"
              />
            </ListItemAvatar>
            <ListItemText
              secondary={
                <>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body1"
                    color="text.primary"
                  >
                    Ali Connors
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem
            alignItems="flex-start"
            sx={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src="https://material-ui.com/static/images/avatar/3.jpg"
              />
            </ListItemAvatar>
            <ListItemText
              secondary={
                <>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body1"
                    color="text.primary"
                  >
                    Ali Connors
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </>
              }
            />
          </ListItem> */}
        </List>
      </Collapse>
    </Card>
  );
};
export default PostComponent;
