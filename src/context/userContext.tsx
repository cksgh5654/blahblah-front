import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { User } from "../types/user.type";

interface UserProviderProps extends PropsWithChildren {}
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
const DEFAULT_USER = {
  email: "",
  nickname: "",
  image: "",
  createdAt: "",
  _id: "",
};

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(DEFAULT_USER);
  const updateUser = (data: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...data }));
  };
  const context = {
    user,
    updateUser,
  };
  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
