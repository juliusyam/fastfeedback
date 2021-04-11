import React, {useState, useEffect, useContext, createContext} from 'react';
import firebase from './firebase';
import 'firebase/auth';
import { createUser } from './database';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';

const authContext = createContext();

export default function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  function handleUser(rawUser) {
    if (rawUser) {
      const user = formatUser(rawUser);
      const { token, ...userWithoutToken } = user;
      // console.log(rawUser);

      createUser(user.uid, userWithoutToken);
      setUser(user);

      cookie.set('fast-feedback-auth', true, {
        expires: 1
      })
      return user;
    } else {

      setUser(false);
      cookie.remove('fast-feedback-auth');
      return false;
    }
  }

  function signinWithGoogle() {
    
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        router.push('/dashboard');
        handleUser(response.user);
      });
  }

  function signinWithGithub() {
    
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => {
        router.push('/dashboard');
        handleUser(response.user);
      });
  };

  function signout() {
    
    return firebase
      .auth()
      .signOut()
      .then(() => {
        router.push('/');
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
    signinWithGoogle,
    signout
  };
}

function formatUser(user) {
  // console.log(user);

  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: user.za,
    provider: user.providerData[0].providerId,
    photoURL: user.photoURL
  }
}