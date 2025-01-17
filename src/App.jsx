import { useState } from "react";
import reactLogo from "./assets/react.svg";
import profile from "/profile.jpg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Chat from "./components/Chat";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./config/firebase";

function App() {
  const [user, setUser] = useState(null);

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => setUser(result.user)) // Accessing user info correctly
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      {user ? (
        <Chat user={user} />
      ) : (
        <div className="p-5 text-center">
          <div>
            <img
              src={profile}
              alt="profile"
              width={400}
              height={400}
              className="pr-2"
              style={{ borderRadius: "200px" }}
            />
          </div>
          <div>
            <button
              className="btn btn-primary"
              style={{ marginTop: "50px" }}
              onClick={handleSignIn}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
