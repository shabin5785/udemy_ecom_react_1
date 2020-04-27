import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA2fl3g7svmdSFH89AbFUai0KwVGVbGCsE",
  authDomain: "crwn-db-d094c.firebaseapp.com",
  databaseURL: "https://crwn-db-d094c.firebaseio.com",
  projectId: "crwn-db-d094c",
  storageBucket: "crwn-db-d094c.appspot.com",
  messagingSenderId: "344003121787",
  appId: "1:344003121787:web:7cb2028a0c441379dc88de"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  //check if logged in user exists in our db by querying using his id
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return userRef;
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const addCollectionItems = async (collectionKey, objectsToAdd) => {
  // const collectionRef = firestore.collection(collectionKey);
  // const batch = firestore.batch();
  // objectsToAdd.forEach(obj => {
  //   const newDocRef = collectionRef.doc();
  //   batch.set(newDocRef, obj);
  // });
  // return await batch.commit();
  return "";
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title: title,
      items: items
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
