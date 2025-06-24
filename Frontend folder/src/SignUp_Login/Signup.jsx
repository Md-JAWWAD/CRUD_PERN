import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [role, setrole] = useState("user");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    try {
      e.preventDefault();
      if (name == "" && email == "" && password == "" && role == "") {
        console.log("Kindly fill all required fields");
      }
      let signupObj = { name, email, role, password };
      const res = await axios.post("http://localhost:2025/signup", signupObj, {
        headers: { "Content-Type": "application/json" },
      });
      try {
        localStorage.setItem("signup data", JSON.stringify(signupObj));
        console.log("Signup Response Data: ", res.config.data);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(`Message: ${error.message}`);
      console.log(`Backend Response: ${error.response.data.message}`);
    }
  };

  return (
    <>
      <div>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Sign up</legend>
          <form onSubmit={handleSignup}>
            {/* Name */}

            <label className="label">Name</label>
            <input
              type="text"
              className="input"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />

            {/* Name */}

            {/* Email */}

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

            {/* Role */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Role</legend>
              <select
                // defaultValue="Pick a browser"
                className="select"
                value={role}
                onChange={(e) => {
                  setrole(e.target.value);
                }}
                required
              >
                <option value="" disabled>
                  Pick a Role
                </option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </fieldset>
            {/* Role */}

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

            <button className="btn btn-neutral mt-4" type="submit">
              Sign up
            </button>

            {/* Submit btn */}
          </form>
        </fieldset>
      </div>
    </>
  );
};

export default Signup;
