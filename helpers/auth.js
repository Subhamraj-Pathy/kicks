import { firebase } from '../lib/firebase';

export const getUserId = async () => {
  let userId;

  await firebase.auth().onAuthStateChanged(user => {
    if (user) {
      userId = user.uid;
    } else {
      userId = ''
    }
  });

  return userId
};

export const getUserById = async (userId) => {
  let user = [];
  await firebase.firestore().collection('users').doc(userId).get()
    .then(doc => {
      user = doc.data();
    })
    .catch(err => {
      console.log(err);
    });
  return user;
}

export const logoutUser = async () => {
  let res;
  await firebase.auth().signOut()
    .then(() => {
      res = true;
    })
    .catch((error) => {
      console.log(error);
      res = false;
    });
  return res;
}