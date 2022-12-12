import React, { useContext, useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import './Login.css';
import { Navigate } from 'react-router-dom';
import { signInAuthUserWithEmailAndPassword } from '../utils/firebase/firebase.utils';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../Context/UserProvider';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();
  // const { setCurrentUser } = useContext(UserContext);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
      // setCurrentUser(response);
      setAadhar('');
      setUsername('');
      setPassword('');
      setEmail('');
      window.localStorage.setItem('name', username);
      history.push('/Home');
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;
        default:
          console.log(error);
      }
    }
  };

  console.log(username); //usestate check//

  return (
    <div className="bodyregister">
      <div className="container8">
        <div className="title">Login</div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="user-details">
              <div className="input-box">
                <span className="details" id="username">
                  Username
                </span>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  required
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div className="input-box">
                <span className="details" id="username">
                  Email
                </span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className="input-box">
                <span className="details" id="password">
                  Password
                </span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  id="passwordId"
                  value={password}
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="input-box">
                <span className="details" id="aadhar">
                  Aadhar
                </span>
                <input
                  type="number"
                  id="aadharId"
                  placeholder="Enter aadhar"
                  value={aadhar}
                  onChange={(e) => {
                    setAadhar(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="button" id="but">
              <input id="submitBut" type="submit" value="Login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
