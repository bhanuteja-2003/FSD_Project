import './form.css';
import JsonDataDisplay from './form';
import CustomizedDialogs from './modal';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import NavigationBar from '../Homeee/NavigationBar';
export default function Dash() {
  return (
    <>
      <NavigationBar admin={true} />
      <div className="adminBody">
        {/* <Link to={'/Home'}>
        <Button>Home</Button>
      </Link> */}
        <CustomizedDialogs />
        <JsonDataDisplay />
      </div>
    </>
  );
}
