import React, {useState, useEffect, useContext, createContext} from 'react';
import firebase from './firebase';
import 'firebase/auth';
import { createUser } from './database';

const authContext = createContext();

export default function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  function handleUser(rawUser) {
    if (rawUser) {
      const user = formatUser(rawUser);
      // console.log(rawUser);

      createUser(user.uid, user);
      setUser(user);
      return user;
    } else {
      setUser(false);

      return false;
    }
  }

  const signinWithGithub = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => {
          handleUser(response.user);
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
          handleUser(false);
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          handleUser(user);
      } else {
          handleUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGithub,
    signout
  };
}

function formatUser(user) {
  // console.log(user);

  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoURL: user.photoURL
  }
}