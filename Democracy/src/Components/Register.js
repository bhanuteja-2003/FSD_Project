import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './Register.css';
import { UserContext } from '../Context/UserProvider';
import {
  makeUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';
function Register() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(0);
  const [password, setPassword] = useState();
  const [aadhar, setAadhar] = useState(0);
  const [district, setDistrict] = useState('');
  // const { setCurrentUser } = useContext(UserContext);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await makeUserWithEmailAndPassword(email, password);
      console.log(user);
      // setCurrentUser(user);
      await createUserDocumentFromAuth(user, {
        name,
        username,
        phone,
        aadhar,
        district,
      });
      setName('');
      setAadhar(0);
      setPhone(0);
      setEmail('');
      setUsername('');
      setPassword('');
      setDistrict('');
      window.localStorage.setItem('name', username);
      history.push('/Home');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log('user creation encountered an error', error);
      }
    }
  };

  console.log(name, username, email, phone, password, aadhar, district);

  return (
    <div className="bodyregister">
      <div className="container8">
        <div className="content">
          {' '}
          <div className="title">Registration</div>
          <form onSubmit={handleSubmit}>
            <div className="user-details">
              <div className="input-box">
                <span className="details" id="name">
                  Full Name
                </span>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  id="nameId"
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="input-box">
                <span className="details" id="username">
                  Username
                </span>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  id="usernameId"
                  required
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div className="input-box">
                <span className="details" id="eamil">
                  Email
                </span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  id="emailId"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="input-box">
                <span className="details" id="phone">
                  Phone Number
                </span>
                <input
                  type="number"
                  placeholder="Enter your number"
                  value={phone}
                  id="phoneId"
                  required
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
              <div className="input-box">
                <span className="details" id="password">
                  Password(min length 6)
                </span>
                <input
                  type="password"
                  min="6"
                  placeholder="Enter your password"
                  value={password}
                  required
                  id="passwordId"
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
                  placeholder="Enter aadhar"
                  value={aadhar}
                  id="aadharId"
                  required
                  onChange={(e) => {
                    setAadhar(e.target.value);
                  }}
                />
              </div>

              <div className="input-box">
                <span className="details" id="district">
                  District
                </span>
                <input
                  type="text"
                  placeholder="Enter District"
                  value={district}
                  id="districtId"
                  required
                  onChange={(e) => {
                    setDistrict(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="button" id="but">
              <input id="submitBut" type="submit" value="Register" />
            </div>

            <p className="para-2">
              Already have an have an account?{' '}
              <a href="http://localhost:3000/login">login Here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
