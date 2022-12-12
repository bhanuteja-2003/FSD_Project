import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../com.css';

const CreateComplaint = ({ modal, toggle, save }) => {
  const [complaintName, setComplaintName] = useState('');
  const [description, setDescription] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target; // we are extracting name(what we type into) and value(what we type) from target value

    if (name === 'complaintName') {
      setComplaintName(value);
    } else {
      setDescription(value);
    }
  };

  const handleSave = () => {
    let complaintObj = {};
    complaintObj['Name'] = complaintName;
    complaintObj['Description'] = description;
    save(complaintObj); // it will push the comlaint obj into the array/complaint list
    setDescription('');
    setComplaintName('');
  };

  return (
    //modal will open only when modl is true isOpen={modal} , so on click we need to set modal to true
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Drop your complaint here .....</ModalHeader>
      <ModalBody>
        <form>
          <div className="form-group">
            <label>Reason for Complaint</label>
            <input
              type="text"
              className="form-control"
              value={complaintName}
              onChange={handleChange}
              name="complaintName"
            />
          </div>
          <br></br>
          <div className="form-group">
            <label>The issue</label>
            <textarea
              rows="8"
              className="form-control"
              value={description}
              onChange={handleChange}
              name="description"
            />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={handleSave}>
          Post
        </Button>{' '}
      </ModalFooter>
    </Modal>
  );
};

export default CreateComplaint;
