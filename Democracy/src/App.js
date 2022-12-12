import { Routes, Switch, Route, Outlet, Redirect } from 'react-router-dom';
import Homes from './Components/Home';
import NavBar from './Components/NavBar';
import Tweets from './Components/PostsListComponent';
import SignIn from './Components/signIn';
import PostPage from './Components/PostsPage';
import Register from './Components/Register';
import Login from './Components/Login';
import Complaint from './Components/complaintsFolder/complaint';
import Dash from './Components/Admin/dash';
import Homee from './Components/Homeee/Homee';

function App() {
  return (
    // <Routes>
    //   <Route path="/" element={<NavBar />}>
    //     <Route index element={<Home />} />
    //     <Route path="/signIn" element={<SignIn />} />
    //     <Route path="/tweets" element={<PostPage />} />
    //   </Route>
    // </Routes>

    <Switch>
      <Route path="/Login" exact>
        <Login />
      </Route>
      <Route path="/Register" exact>
        <Register />
      </Route>
      <Route path="/" exact>
        <Redirect to="/Home" />
      </Route>
      <Route path="/Home" exact>
        <Homee />
      </Route>
      <Route path="/tweets" exact>
        {' '}
        <PostPage />{' '}
      </Route>
      <Route path="/complaints" exact>
        {' '}
        <Complaint />{' '}
      </Route>
      <Route path="/admin" exact>
        {' '}
        <Dash />{' '}
      </Route>
    </Switch>
  );
}

export default App;
