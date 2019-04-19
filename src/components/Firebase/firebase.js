
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

    item = iid => this.db.ref(`items/${iid}`);

    items = () => this.db.ref('items');

    pushData = function (item) {
        this.db.ref('items').push({
            item: item
        }, function (error) {
            if (error) {
                console.log(error)
            } else {
                console.log("success")
            }
        });
    }
}


export default Firebase;