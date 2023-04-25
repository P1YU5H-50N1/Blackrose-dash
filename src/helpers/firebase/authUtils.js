import "firebase/auth";
// import "firebase/firestore";
import store from "../../state/store";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    GoogleAuthProvider,
    signOut,
    signInWithPopup
} from 'firebase/auth'

class FirebaseAuthBackend {
    constructor(firebaseConfig) {
        this.firebase = null
        this.auth = null
        this.googleProvider = null
        if (firebaseConfig) {
            // Initialize Firebase
            this.firebase = initializeApp(firebaseConfig);
            this.auth = getAuth(this.firebase)
            this.googleProvider = new GoogleAuthProvider()

            this.auth.onAuthStateChanged((user) => {
                if (user) {
                    if (user.emailVerified) {
                        sessionStorage.setItem("authUser", JSON.stringify(user));
                    } else {
                        signOut(this.auth)
                            .then().catch(err => console.log(err))
                    }
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
            createUserWithEmailAndPassword(this.auth, email, password).then((user) => {
                // eslint-disable-next-line no-redeclare
                sendEmailVerification(this.auth.currentUser)
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
                resolve(user);
            }, (error) => {
                reject(this._handleError(error));
            });
        });
    }
    loginWithGoogle = () => {
        return new Promise((resolve, reject) => {
            signInWithPopup(this.auth, this.googleProvider).then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user
                user['credentialAccessToken'] = token
                resolve(user)
                console.log(user, token, "OAUTH GOOGLE")
            }, err => reject(this._handleError(err)))
        })
    }

    /**
     * forget Password user with given details
     */
    forgetPassword = (email) => {
        return new Promise((resolve, reject) => {
            sendPasswordResetEmail(this.auth, email, { url: window.location.protocol + "//" + window.location.host + "/login" }).then(() => {
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

    // setLoggeedInUser = (user) => {
    //     sessionStorage.setItem("authUser", JSON.stringify(user));
    // }

    /**
     * Returns the authenticated user
     */
    getAuthenticatedUser = () => {
        if (!sessionStorage.getItem('authUser'))
            return null;
        const user_data = sessionStorage.getItem('authUser');
        return user_data;
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