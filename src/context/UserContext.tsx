import React = require('react');

// import { createContext, useContext, useState } from 'react';
import { createContext, useState } from 'react';

// import axios from 'axios';

export type AuthUser = {
  id: number,
  name: string,
  googleId: string,
};

type UserContextType = {
  user: AuthUser | null,
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>
};

type UserContextProviderProps = {
  children: React.ReactNode
};

export const UserContext = createContext({} as UserContextType);

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// // export const useUser = () => useContext(UserContext);
// export function UserContextProvider({ children }: UserContextProviderProps) {
//   const [user, setUser] = useState<AuthUser | null>(null);

//   // const login = () => {
//   //   // setUser(user);
//   //   axios.get('/user')
//   //     .then(({ data }: { data: object }) => {
//   //       console.log(data);
//   //       if (typeof data === 'object') {
//   //         const curUser = { ...data };
//   //         setUser(curUser);
//   //       }
//   //       // console.log(user);
//   //     })
//   //     .catch((err: Error) => console.error('failed setting user', err));
//   // };

//   // const logout = () => {
//   //   setUser(null);
//   // };

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {/* <UserContext.Provider value={{ user, login, logout }}> */}
//       {children}
//     </UserContext.Provider>
//   );
// }