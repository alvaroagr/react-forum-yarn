import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCdMMXBjykg-rbamB4ESvO81C2cyEQqhGg",
    authDomain: "react-forum-73e8a.firebaseapp.com",
    databaseURL: "https://react-forum-73e8a.firebaseio.com",
    projectId: "react-forum-73e8a",
    storageBucket: "react-forum-73e8a.appspot.com",
    messagingSenderId: "598601410239",
    appId: "1:598601410239:web:40596151db33aca083880a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

export default {


    getMessage(id) {
        return db.collection('messages').doc(id).get()
    },

    getChildrenByParent(id) {
        return db.collection('messages').where('parent', '==', id).get()
    },

    getParentByChildren(id) {
        return db.collection('messages').where('children', 'array-contains', id).get()
    },

    getMessages() {
        return db.collection('messages').where('parent', '==', null).get()
    },

    submitMessage(msg) {
        return db.collection("messages").doc(msg.id).set(msg, { merge: true })
    },

    deleteMessage(msg) {
        if (msg.parent !== undefined) {
            let parent = {
                children: []
            }
            this.getMessage(msg.parent).then(doc => {
                parent = doc.data();
                parent.children.splice(parent.children.indexOf(msg.id), 1);
                this.submitMessage(parent)
            })
        }
        return db.collection("messages").doc(msg.id).delete()
    },

    getUsers() {
        return db.collection("users").get()
    },

    submitUser(user) {
        return db.collection("users").doc(user.id).set(user, { merge: true })
    },

    deleteUser(user) {
        return db.collection("users").doc(user.id).delete()
    }
}