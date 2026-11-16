import { useState } from "react";
import Login from "./pages/login";
import Register from "./pages/register";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {isLogin ? <Login /> : <Register />}

      <div className="switch-auth">
        {isLogin ? (
          <p>
            Don't have an account?{" "}
            <button onClick={() => setIsLogin(false)}>
              Register
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <button onClick={() => setIsLogin(true)}>
              Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default App;