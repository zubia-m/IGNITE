// src/context/wishlistcontext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);

  // Listen for auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const docRef = doc(db, "wishlists", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setWishlist(docSnap.data().items || []);
        } else {
          await setDoc(docRef, { items: [] });
          setWishlist([]);
        }
      } else {
        setWishlist([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Save to Firestore on change
  useEffect(() => {
    if (user) {
      const docRef = doc(db, "wishlists", user.uid);
      setDoc(docRef, { items: wishlist });
    }
  }, [wishlist, user]);

  const addToWishlist = (house) => {
    setWishlist((prev) =>
      prev.some((item) => item.address === house.address) ? prev : [...prev, house]
    );
  };

  const removeFromWishlist = (address) => {
    setWishlist((prev) => prev.filter((item) => item.address !== address));
  };

  const isWishlisted = (address) => {
    return wishlist.some((item) => item.address === address);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);