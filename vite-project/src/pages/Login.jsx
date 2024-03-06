import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SignIn } from '../services/Auth'
import { useState } from 'react'
import LockIcon from '@mui/icons-material/Lock'
import EmailIcon from '@mui/icons-material/Email'
import PersonIcon from '@mui/icons-material/Person'
const Login = (props) => {
  const [flipped, setFlipped] = useState(false)
  const [accountType, setAccountType] = useState('customer')
  const loginEmail = useRef(null)
  const loginPassword = useRef(null)
  const signupName= useRef(null)
  const signupEmail= useRef(null)
  const signupPassword= useRef(null)
  const handleSubmit = async (e, isSignup) => {
    e.preventDefault()

    if (isSignup) {
      console.log('Signup:', {
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        type: accountType
      })
    } else {
      const payload = await SignIn({
        email: loginEmail.current.value,
        password: loginPassword.current.value
      })
      props.setUser(payload)
    }

    loginEmail.current.value=null
    loginPassword.current.value=null
    signupName.current.value=null
 SignupEmail('')
    setSignupPassword('')
  }

  return (
    <div className="Login-Page">
      <div className="container-login">
        <input
          type="checkbox"
          id="flip"
          checked={flipped}
          onChange={(e) => setFlipped(e.target.checked)}
          style={{ display: 'none' }}
        />
        <div className="cover">
          <div className="front">
            <img
              src="https://scarletknights.com/images/2023/2/23/Fans3232_web.jpg"
              alt=""
            />
            <div className="text">
              <span className="text-1">
                Every new friend is a <br /> new adventure
              </span>
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
              <form action={handleSubmit}>
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
                      {' '}
                      <LockIcon />
                    </i>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      ref={loginPassword}
                      required
                    />
                  </div>
                  <div className="text">
                    <a href="/about">Forgot password?</a>
                  </div>
                  <div className="button input-box">
                    <input type="submit" value="Submit" />
                  </div>
                  <div className="text sign-up-text">
                    Don't have an account?
                    <span
                      className="Signup-link"
                      onClick={() => setFlipped(!flipped)}
                    >
                      {' '}
                      Signup now
                    </span>
                  </div>
                </div>
              </form>
            </div>
            <div className="signup-form">
              <div className="title">Signup</div>
              <form action="#">
                <div className="input-boxes">
                  <div className="input-box">
                    <i className="fas fa-user">
                      <PersonIcon />
                    </i>
                    <input type="text" placeholder="Enter your name" required />
                  </div>
                  <div className="input-box">
                    <i className="fas fa-envelope">
                      <EmailIcon />
                    </i>
                    <input
                      type="text"
                      placeholder="Enter your email"
                      required
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
                    />
                  </div>
                  <div className="button input-box">
                    <button type="submit" value="Submit" />
                  </div>
                  <div className="text sign-up-text">
                    Already have an account?
                    <span
                      className="Signup-link"
                      onClick={() => setFlipped(!flipped)}
                    >
                      {' '}
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
