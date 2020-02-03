var firebase = require('firebase');
let admin = require('firebase-admin');
var db = firebase.firestore();

exports.getAllContacts = async function getAllContacts(userId) {
  // console.log(session);
  try {
    var contactQueryRef = db.collection('Contact').where("userId", "==", userId);
    var contactQuerySnapshot = await contactQueryRef.get();
    var contactDocs = contactQuerySnapshot.docs;

    if (contactDocs.length == 0) {
      return [];
    }

    var contacts = [];

    contactDocs.forEach((docSnapshot) => {
      contacts.push(docSnapshot.data())
    })

    return contacts;
  } catch (error) {
    console.log(`error getting all contacts: ${error}`);
    return error
  }
};

exports.getUser = async function getUser(userId) {
  try {
    let userRef = db.collection('User').doc(userId);
    let userDoc = await userRef.get();
    let user = userDoc.data();
    return user
  } catch (e) {
    console.log(`Error getting user: ${e}`);
    return e
  }
}

exports.getContactById = async function getContactById(userId, contactId) {
  try {
    let contactRef = db.collection('Contact').doc(contactId);
    let contactDoc = await contactRef.get();
    let contact = contactDoc.data();
    return contact
  } catch (e) {
    console.log(`Error getting user: ${e}`);
    return e
  }
}
