import { useEffect } from 'react';
import { createContext, useState } from 'react';

import { auth } from '../utils/firebase/firebase.utils';
// export const UserContext = createContext({
//   setCurrentUser: () => null,
//   currentUser: null,
// });
export const UserContext = createContext(null);
export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);
  // const value = { currentUser, setCurrentUser };

  // return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
  const [user, setuser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);

    auth.onAuthStateChanged((firebaseUser) => {
      setuser(firebaseUser);
      setLoading(false);
    });
  }, []);
  return (
    <>
      {isLoading && <p>Loading</p>}
      {!isLoading && (
        <UserContext.Provider value={user}>{children}</UserContext.Provider>
      )}
    </>
  );
};
