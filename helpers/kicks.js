import { filter, forEach, slice } from 'lodash';
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

export const getKicksByIds = async (ids) => {
  const array = [];
  await firebase.firestore()
  .collection('Products')
  .where('id', 'in', ids)
  .get()
  .then(docs => {
    docs.forEach(doc => array.push(doc.data()));
  });

  return array;
}

export const isShoeBought = async (orderHistory, shoeId) => {
  let isMatched = false;
  forEach(orderHistory, (order)=> {
    forEach(order.productIds, (id) => {
      if (id === shoeId) {
        isMatched = true;
      }
    })
  });
  return isMatched;
}

export const findRating = async (ratersArray, userId) => {
  const filteredArray = filter(ratersArray, (item) => item.ratedBy === userId);
  if (filteredArray.length === 0) {
    return 0
  } else {
    return filteredArray[0].rating;
  }
}

export const getOrderDetailsByOrderId = async (orderIds) => {
  const array = [];
  await firebase.firestore()
  .collection('orders')
  .where('id', 'in', orderIds)
  .get()
  .then(docs => {
    docs.forEach(doc => array.push(doc.data()));
  });

  return array;
}
