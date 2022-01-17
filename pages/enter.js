import { auth, googleAuthProvider } from "../lib/firebase";
import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function EnterPage({}) {

    const {user, username} = useContext(UserContext);

    /*
        User is signed out <SignInButton />
        user is signed in but missing username <UserNameFom />
        user is signed in and has username <SignOutButton />
    */

   
   return (
       <main>
       {user ?
            !username ? <UsernameFom /> : <SignOutButton />
            : <SignInButton />
            }
        </main>
    )
}
function SignInButton() {


    const signInWithGoogle = async () => {
        try {
            await auth.signInWithPopup(googleAuthProvider);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <button className="btn-google" onClick={signInWithGoogle}>
            <img src={'/google.png'}/> Sign In with Google
        </button>
    )
}

function SignOutButton() {
    return (
        <button onClick={() => auth.signOut()}>Sign Out</button>
    )
}

function UsernameFom(){
    return (
        <form>
            <label>
                <input type="text" placeholder="Username" />
            </label>
        </form>
    )
}