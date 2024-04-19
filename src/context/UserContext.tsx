// import React = require('react');

// import axios from 'axios';

import React, { createContext, useState, useMemo } from 'react';

export type AuthUser = {
  id: number,
  name: string,
  googleId: string,
  emConNum: string,
  emConName: string,
  emConRelationship: String,
  currMood: String,
  agee: String,
  myLocation: String,
  myPhoneNumber: String,
  preferredName: String,
  // buddies: Buddy[];
};

// export type Buddy = {
//   id: number;
//   name: string;
// };

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

  // useEffect(() => {
  //   axios.get('/user')
  //     .then(({ data }) => {
  //       setUser(data);
  //     })
  //     .catch((err) => console.error('failed getting user', err));
  // }, [setUser]);

  const userState = useMemo(() => ({ user, setUser }), [user]);
  return (
    <UserContext.Provider value={userState}>
      {children}
    </UserContext.Provider>
  );
}
