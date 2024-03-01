import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
const Login = () => {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const LoginRef = useRef(null)
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({
      email: emailRef.current.value,
      password: passwordRef.current.value
    })
    emailRef.current.value = null
    passwordRef.current.value = null
  }
  return (
    <section className="container forms">
      <div className="form login" ref={LoginRef}>
        <div className="form-content">
          <header>Login</header>
          <form onSubmit={handleSubmit}>
            <div className="field input-field">
              <input
                type="email"
                placeholder="Email"
                className="input"
                ref={emailRef}
              />
            </div>
            <div className="field input-field">
              <input
                type="password"
                placeholder="Password"
                className="password"
                ref={passwordRef}
              />
              <i className="bx bx-hide eye-icon"></i>
            </div>
            <div className="form-link">
              <a href="#" className="forgot-pass">
                Forgot password?
              </a>
            </div>
            <div className="field button-field">
              <button type="submit">Login</button>
            </div>
          </form>
          <div className="form-link">
            <span>
              Don't have an account?{' '}
              <Link to="/register" className="link signup-link">
                Signup
              </Link>
            </span>
          </div>
        </div>
        <div className="line"></div>
        <div className="media-options">
          <a href="#" className="field google">
            <img
              src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png"
              alt=""
              className="google-img"
            />
            <span>Login with Google</span>
          </a>
        </div>
      </div>
    </section>
  )
}
export default Login
