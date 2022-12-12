import React from 'react';
//"task-holder"
import './com.css';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const Card = ({ complaintObj, index, deleteTask }) => {
  const colors = [
    {
      primaryColor: '#5D93E1',
      secondaryColor: '#ECF3FC',
    },
    {
      primaryColor: '#F9D288',
      secondaryColor: '#FEFAF1',
    },
    {
      primaryColor: '#5DC250',
      secondaryColor: '#F2FAF1',
    },
    {
      primaryColor: '#F48687',
      secondaryColor: '#FDF1F1',
    },
    {
      primaryColor: '#B964F7',
      secondaryColor: '#F3F0FD',
    },
  ];

  const handleDelete = () => {
    deleteTask(index);
    // e.preventDefault()
  };

  return (
    <div class="card-wrapper mr-5">
      <div
        class="card-top"
        style={{ 'background-color': colors[2].primaryColor }}
      ></div>
      <div class="complaint-holder">
        <span
          class="card-header"
          style={{
            'background-color': colors[2].secondaryColor,
            'border-radius': '10px',
          }}
        >
          {complaintObj.Name}
        </span>
        <br></br>
        <hr></hr>

        <p className="mt-3">{complaintObj.Description}</p>

        <div style={{ position: 'absolute', right: '20px', bottom: '20px' }}>
          <DeleteOutlineIcon
            sx={{ color: colors[2].primaryColor, cursor: 'pointer' }}
            onClick={handleDelete}
          ></DeleteOutlineIcon>
          {/* <i
            class="fas fa-trash-alt"
            style={{ color: colors[2].primaryColor, cursor: 'pointer' }}
            onClick={handleDelete}
          ></i> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
