import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
   const navigate = useNavigate();


  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      let loginObj = { email, password };
      let res = await axios.post("http://localhost:2025/login/user-login", loginObj);
      try {
        console.log(res)
        localStorage.setItem('token', res.data.data);
        console.log('Login Response Data: ',res.config.data);
        console.log(`Backend Response: ${res.data.message}`)
        navigate('/dashboard')
      } catch (error) {}
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <div>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        {/* Email */}
        <form onSubmit={handleLogin}>
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="you@site.com"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />

          {/* Email */}

          {/* Password */}

          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />

          {/* Password */}

          {/* Submit btn */}

          <button
            className="btn btn-neutral mt-4"
            type="submit"
          >
            Login
          </button>
        </form>
        {/* Submit btn */}
      </fieldset>
    </div>
    </>
  );
};

export default Login;
