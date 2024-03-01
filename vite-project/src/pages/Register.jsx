import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { SignUp } from '../services/Auth'

const Register = () => {

  const nameRef = useRef(null);
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const passwordComRef = useRef(null)
  const SignupRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await SignUp({
      name: "no name",
      email: emailRef.current.value,
      password: passwordRef.current.value,
      role: "Admin"
    });
    console.log({
      email: emailRef.current.value,
      password: passwordRef.current.value,
      ComparePassword: passwordComRef.current.value 
    })
    emailRef.current.value = null
    passwordRef.current.value = null
  }

  return (
    <section className="container forms">
      <div className="form signup" ref={SignupRef}>
        <div className="form-content">
          <header>Signup</header>
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
                placeholder="Create password"
                className="password"
                ref={passwordRef}
              />
            </div>
            <div className="field input-field">
              <input
                type="password"
                placeholder="Confirm password"
                className="password"
                ref={passwordComRef}
              />
              <i className="bx bx-hide eye-icon"></i>
            </div>
            <div className="field button-field">
              <button>Signup</button>
            </div>
          </form>
          <div className="form-link">
            <span>
              Already have an account?{' '}
              <Link to="/login" className="link login-link">
                Login
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
export default Register
