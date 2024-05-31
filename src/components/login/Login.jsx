import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";


const Login = () => {

    const auth = getAuth(app);
    console.log(app);
    const googleProvider = new GoogleAuthProvider();

    const gitHubProvider = new GithubAuthProvider();

    const [user, setUser] = useState(null);

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const logedUser = result.user;
                console.log(logedUser);
                setUser(logedUser);
            })
            .catch(error => {
                console.log('error', error.message)
            })
    }

    const handleGitHubSignIn = ()=>{
        signInWithPopup(auth,gitHubProvider)
        .then(result => {
            const logedUser = result.user;
            console.log(logedUser);
            setUser(logedUser);
        })
        .catch(error => {
            console.log(error.message)
        })
    }
    const handleSignOut = () => {
        signOut(auth)
        .then(result => {
            console.log(result);
            setUser(null);
        })
        .catch(error =>{
            console.log(error);
        })
    }
    return (
        <div>
            {user ?<button onClick={handleSignOut}>sign out</button> :
                <div>
                    <button onClick={handleGoogleSignIn}>Google login</button>
                    <button onClick={handleGitHubSignIn}>git hub login</button>
                </div>
            }
            {
                user && <div>
                    <img src={user.photoURL} alt="" />
                    <h2>{user.displayName}</h2>
                    <p>{user.email}</p>
                </div>
            }
        </div>
    );
};

export default Login;