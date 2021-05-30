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

export const registerUser = async (name, email, password) => {
  let res;
  await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(async (userCredential) => {
      await firebase.firestore().collection('users')
        .doc(userCredential.user.uid)
        .set({
          id: userCredential.user.uid,
          name,
          email,
          createdAt: Date.now(),
          address: [],
          orderHistory: [],
          wishlist: [],
          bag: []
        })
      res = { success: true, message: '',  userId: userCredential.user.uid };
    })
    .catch((error) => {
      res = { success: false, message: error.message, userId: '' };
    });
  return res
}

export const loginUser = async (email, password) => {
  let res;
  await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(data => {
      res = { success: true, message: '',  userId: data.user.uid };
    })
    .catch((error) => {
      console.log(error);
      if (error.code === 'auth/user-not-found') {
        res = { success: false, message: 'User Doesn Not Exist', userId: '' };
      } else {
        res = { success: false, message: error.message, userId: '' };
      }
    });
  return res
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