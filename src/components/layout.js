import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Header from "./header";

const Layout = ({ user, setUser, onSignOut, children }) => {
  const location = useLocation(); // ✅ Now inside <Router>

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      setUser(currentUser || null);
    });

    return () => unsubscribe();
  }, [location.pathname]); // Runs when the URL changes

  return (
    <>
      <Header user={user} onSignOut={onSignOut} />
      {children}
    </>
  );
};

export default Layout;