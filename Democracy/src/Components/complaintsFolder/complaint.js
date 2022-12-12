import React, { useEffect, useState } from 'react';
import CreateComplaint from './modals/createComplaint';
import Card from './Card';
import './com.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
const Complaint = () => {
  const [modal, setModal] = useState(false);
  const [complaintList, setComplaintList] = useState([]);

  useEffect(() => {
    console.log('in use efect');
    let arr = localStorage.getItem('complaintList');

    if (arr) {
      // chec whether obj is undefined or not , if not undefined then update our complaint list
      let obj = JSON.parse(arr); // convert JSON string to array object
      setComplaintList(obj);
    }
  }, []); // we are writing the empty array bcoz the useEffect has to run once when the page is reloaded

  const deleteTask = (index) => {
    let tempList = [...complaintList];
    console.log(tempList);
    tempList.splice(index, 1);
    localStorage.setItem('complaintList', JSON.stringify(tempList));
    console.log(tempList);
    setComplaintList(tempList);
  };

  const toggle = () => {
    setModal(!modal);
  };

  // This code block will push the inputs to a list
  const saveComplaint = (complaintObj) => {
    let tempList = complaintList;
    tempList.push(complaintObj);
    localStorage.setItem('complaintList', JSON.stringify(tempList));
    setComplaintList(tempList);
    setModal(false);
  };
  console.log('render');
  return (
    <>
      {/* div 1*/}
      <div className="header text-center">
        <Link to={'/Home'}>
          <Button>Home</Button>
        </Link>
        <h3 className="title">Make your voice heard</h3>
        <button className="btn btn-success mt-2" onClick={() => setModal(true)}>
          click here
        </button>
      </div>

      {/* div 2*/}
      <div className="complaint-container">
        {complaintList &&
          complaintList.map((obj, index) => (
            <Card complaintObj={obj} index={index} deleteTask={deleteTask} />
          ))}
      </div>

      <CreateComplaint toggle={toggle} modal={modal} save={saveComplaint} />
    </>
  );
};

export default Complaint;
