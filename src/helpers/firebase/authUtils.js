import "firebase/auth";
// import "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut
} from 'firebase/auth'

class FirebaseAuthBackend {
    constructor(firebaseConfig) {
        this.firebase = null
        this.auth = null
        if (firebaseConfig) {
            // Initialize Firebase
            this.firebase = initializeApp(firebaseConfig);
            this.auth = getAuth(this.firebase)
            this.auth.onAuthStateChanged((user) => {
                if (user) {
                    sessionStorage.setItem("authUser", JSON.stringify(user));
                } else {
                    sessionStorage.removeItem('authUser');
                }
            });
        }
    }

    /**
     * Registers the user with given details
     */
    registerUser = (email, password) => {
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(this.auth,email, password).then((user) => {
                // eslint-disable-next-line no-redeclare
                var user = this.auth.currentUser;
                resolve(user);
            }, (error) => {
                reject(this._handleError(error));
            });
        });
    }

    /**
     * Login user with given details
     */
    loginUser = (email, password) => {
        return new Promise((resolve, reject) => {
            
            signInWithEmailAndPassword(this.auth, email, password).then((user) => {
                // eslint-disable-next-line no-redeclare
                var user = this.auth.currentUser;
                console.log(user)
                resolve(user);
            }, (error) => {
                reject(this._handleError(error));
            });
        });
    }

    /**
     * forget Password user with given details
     */
    forgetPassword = (email) => {
        return new Promise((resolve, reject) => {
            sendPasswordResetEmail(this.auth,email, { url: window.location.protocol + "//" + window.location.host + "/login" }).then(() => {
                resolve(true);
            }).catch((error) => {
                reject(this._handleError(error));
            })
        });
    }

    /**
     * Logout the user
     */
    logout = () => {
        return new Promise((resolve, reject) => {
            signOut(this.auth).then(() => {
                resolve(true);
            }).catch((error) => {
                reject(this._handleError(error));
            })
        });
    }

    setLoggeedInUser = (user) => {
        sessionStorage.setItem("authUser", JSON.stringify(user));
    }

    /**
     * Returns the authenticated user
     */
    getAuthenticatedUser = () => {
        if (!sessionStorage.getItem('authUser'))
            return null;
        return JSON.parse(sessionStorage.getItem('authUser'));
    }

    /**
     * Handle the error
     * @param {*} error 
     */
    _handleError(error) {
        var errorMessage = error.message;
        return errorMessage;
    }
}

let _fireBaseBackend = null;

/**
 * Initilize the backend
 * @param {*} config 
 */
const initFirebaseBackend = (config) => {
    if (!_fireBaseBackend) {
        _fireBaseBackend = new FirebaseAuthBackend(config);
    }
    return _fireBaseBackend;
}

/**
 * Returns the firebase backend
 */
const getFirebaseBackend = () => {
    return _fireBaseBackend;
}

export { initFirebaseBackend, getFirebaseBackend };