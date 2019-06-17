
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


const config = {
    apiKey: "AIzaSyCqpzA9xY-wkinchZEWeBaNQGtRrmyOgWo",
    authDomain: "leavingcertificatepredicitons.firebaseapp.com",
    databaseURL: "https://leavingcertificatepredicitons.firebaseio.com",
    projectId: "leavingcertificatepredicitons",
    storageBucket: "leavingcertificatepredicitons.appspot.com",
    messagingSenderId: "826873684898"
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = (callback) => this.auth.signOut().then(function () {
        console.log("HERE")
    });

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);


    // *** User API ***

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');

    items = () => this.db.ref('items');

    newItemList = () => {
        this.db.ref('items').push({1:1}).then((snap) => {
            const key = snap.key
            console.log("Key " + key)
            return key;
        })
    }

    removeItemList = (key) => {
        this.db.ref('items').child(key).remove();
    }

    pushData = (itemName, position) => {
        this.db.ref('items').push({
            itemName: itemName,
            position: position
        }, function (error) {
            if (error) {
                console.log(error)
            } else {
                console.log("success")
            }
        });
    }

    removeItem = (key, itemKey) => {
        this.db.ref('items').child(key).child(itemKey).remove();
    }

}


export default Firebase;