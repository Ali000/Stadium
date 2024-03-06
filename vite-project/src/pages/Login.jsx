import { useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { SignIn } from "../services/Auth"
import { SignUp } from "../services/Auth"
import { useState } from "react"
import LockIcon from "@mui/icons-material/Lock"
import EmailIcon from "@mui/icons-material/Email"
import PersonIcon from "@mui/icons-material/Person"
import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
const Login = (props) => {
  let navigate = useNavigate()
  const [flipped, setFlipped] = useState(false)
  const [accountType, setAccountType] = useState("customer")
  const loginEmail = useRef(null)
  const loginPassword = useRef(null)
  const signupName = useRef(null)
  const signupEmail = useRef(null)
  const signupPassword = useRef(null)
  const handleSubmit = async (e, isSignup) => {
    e.preventDefault()

    if (isSignup) {
      const payload = await SignUp({
        name: signupName.current.value,
        password: signupPassword.current.value,
        email: signupEmail.current.value,
        role: accountType,
      })
      // console.log(payload)
      // props.setUser(payload)
      // navigate("/Login")
      setFlipped(!flipped)
    } else {
      const payload = await SignIn({
        email: loginEmail.current.value,
        password: loginPassword.current.value,
      })
      props.setUser(payload)
      navigate("/home")
    }

    loginEmail.current.value = null
    loginPassword.current.value = null
    signupName.current.value = null
    signupEmail.current.value = null
    signupPassword.current.value = null
  }

  return (
    <div className="Login-Page">
      <div className="container-login">
        <input
          type="checkbox"
          id="flip"
          checked={flipped}
          onChange={(e) => setFlipped(e.target.checked)}
          style={{ display: "none" }}
        />
        <div className="cover">
          <div className="front">
            <img
              src="https://scarletknights.com/images/2023/2/23/Fans3232_web.jpg"
              alt=""
            />
            <div className="text">
              <span className="text-1">Stadium for Sports Entertainment</span>
              <span className="text-2">Let's get connected</span>
            </div>
          </div>
          <div className="back">
            <div className="text">
              <span className="text-1">
                Complete miles of journey <br /> with one step
              </span>
              <span className="text-2">Let's get started</span>
            </div>
          </div>
        </div>
        <div className="forms">
          <div className="form-content">
            <div className="login-form">
              <div className="title">Login</div>
              <form onSubmit={(e) => handleSubmit(e, false)}>
                <div className="input-boxes">
                  <div className="input-box">
                    <i className="fas fa-envelope">
                      <EmailIcon />
                    </i>
                    <input
                      type="text"
                      placeholder="Enter your email"
                      ref={loginEmail}
                      required
                    />
                  </div>
                  <div className="input-box">
                    <i className="fas fa-lock">
                      {" "}
                      <LockIcon />
                    </i>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      ref={loginPassword}
                      required
                    />
                  </div>
                  {/* <div className="text">
                    <a href="/about">Forgot password?</a>
                  </div> */}
                  <div className="button input-box">
                    <input type="submit" value="Submit" />
                  </div>
                  <div className="text sign-up-text">
                    Don't have an account?
                    <span
                      className="Signup-link"
                      onClick={() => setFlipped(!flipped)}
                    >
                      {" "}
                      Signup now
                    </span>
                  </div>
                </div>
              </form>
            </div>
            <div className="signup-form">
              <div className="title">Signup</div>
              <form onSubmit={(e) => handleSubmit(e, true)}>
                <div className="input-boxes">
                  <div className="input-box">
                    <i className="fas fa-user">
                      <PersonIcon />
                    </i>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      required
                      ref={signupName}
                    />
                  </div>
                  <div className="input-box">
                    <i className="fas fa-envelope">
                      <EmailIcon />
                    </i>
                    <input
                      type="text"
                      placeholder="Enter your email"
                      required
                      ref={signupEmail}
                    />
                  </div>
                  <div className="input-box">
                    <i className="fas fa-lock">
                      <LockIcon />
                    </i>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      required
                      ref={signupPassword}
                    />
                  </div>
                  <div className="input-box">
                    <label>
                      <input
                        type="radio"
                        name="accountType"
                        value="customer"
                        checked={accountType === "customer"}
                        onChange={(e) => setAccountType(e.target.value)}
                      />
                      Customer
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="accountType"
                        value="enterprise"
                        checked={accountType === "enterprise"}
                        onChange={(e) => setAccountType(e.target.value)}
                      />
                      Enterprise
                    </label>
                  </div>
                  <div className="button input-box">
                    <input type="submit" value="Submit" />
                  </div>
                  <div className="text sign-up-text">
                    Already have an account?
                    <span
                      className="Signup-link"
                      onClick={() => setFlipped(!flipped)}
                    >
                      {" "}
                      Login now
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login
