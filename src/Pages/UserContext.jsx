import React, { createContext, useState, useContext, useEffect } from "react";

// Create User Context
const UserContext = createContext();

// Custom hook to use the context
export const useUser = () => useContext(UserContext);

// Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  // Store user in localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Function to login user
  const loginUser = (userData) => {
    console.log("User logged in:", userData);  // Debugging
    setUser(userData);
  };

  // Function to logout user
  const logoutUser = () => {
    console.log("User logged out");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
