import { useEffect, useState } from 'react';

const Homes = () => {
  let o = {
    name: 'abc',
    roll: 'fghfh',
    phone: 'jdkjd',
  };

  const fun = () => {
    let o2 = { ...o, name: 'hari' };
    setObj(o2);
  };
  const [obj, setObj] = useState(o);
  console.log(obj);

  return (
    <div>
      <button onClick={fun}>b</button>
      <div>Home</div>
    </div>
  );
};
export default Homes;
