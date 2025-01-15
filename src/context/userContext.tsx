import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/user.type";
import { getSigninStatus } from "@apis/auth.api";

interface UserProviderProps {
  children: React.ReactNode;
}
interface UserContextProps {
  user: User;
  updateUser: (data: Partial<User>) => void;
}

const UserContext = createContext<UserContextProps | null>(null);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUserContext should be used within UserContext.Provider"
    );
  }
  return context;
};
const DEFAULT_USER: User = {
  email: "",
  nickname: "",
  image: "",
  createdAt: "",
  _id: "",
  role: "USER",
};

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState(DEFAULT_USER);
  const [isLoading, setIsLoading] = useState(true);

  const updateUser = (data: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  useEffect(() => {
    getSigninStatus() //
      .then(({ user, signinStatus }) => {
        setUser(user);
        localStorage.signinStatus = signinStatus;
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-solid border-gray-200"></div>
      </div>
    );
  }
  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
