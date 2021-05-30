import { slice } from 'lodash';
import { firebase } from '../lib/firebase';

export const getNewAdditions = async () => {
  const array = [];
  await firebase.firestore()
    .collection('Products')
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
      data.forEach(doc => {
        array.push(doc.data());
      })
    });

  return slice(array, 0, 3);
}

export const getKicks = async () => {
  const array = [];
  await firebase.firestore()
    .collection('Products')
    .get()
    .then(data => {
      data.forEach(doc => {
        array.push(doc.data());
      })
    });

  return array;
}

export const getKickById = async (id) => {
  const array = [];
  await firebase.firestore()
    .collection('Products')
    .where('id', '==', id)
    .get()
    .then(data => {
      data.forEach(doc => {
        array.push(doc.data());
      })
    });

  return array;
}