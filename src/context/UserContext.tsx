import React = require('react');

import { createContext, useState, useMemo } from 'react';

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

  const userState = useMemo(() => ({ user, setUser }), [user]);
  return (
    <UserContext.Provider value={userState}>
      {children}
    </UserContext.Provider>
  );
}
