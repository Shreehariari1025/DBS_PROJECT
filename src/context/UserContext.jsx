import React, { createContext, useState, useContext} from "react";

// Create User Context
const UserContext = createContext();

export const useUser = () => useContext(UserContext);
// Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  // Function to set user and save in localStorage
  const loginUser = (userData) => {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout function
  const logoutUser = () => {
      setUser(null);
      localStorage.removeItem("user");
  };

const value={user, loginUser,logoutUser}


  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
