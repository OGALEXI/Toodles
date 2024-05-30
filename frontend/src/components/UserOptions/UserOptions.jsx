import { useState } from "react";
import './UserOptions.css';

function UserOptions({ afterLogin }) {
  const [loginOrSignup, setLoginOrSignup] = useState('signup');

  //Signup data
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //submit function
  const onSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <section id="ls-outer-container">
      <div>
        {
          loginOrSignup === 'login' ? (

            //LOGIN

            <div class="log-sign-box">
              <h1>Login</h1>
              <form>
              <div class="signup_input">
                    <label className='signup_labels' htmlFor='email'>Email </label>
                    <input
                        className='signup_inputs'
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div class="signup_input">
                    <label className='signup_labels' htmlFor='password'>Password </label>
                    <input
                        className='signup_inputs'
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div id="su_btn_box">
                  <button id="signup_btn" type="submit" onClick={onSubmit}>Log In</button>
                </div>
              </form>
              <div className="already-switch">
                <p className="su-li-already">Don't have an account? <button className="su-li-switch" onClick={() => setLoginOrSignup('signup')}>Sign up here.</button></p>
              </div>
            </div>
          ) : (

            //SIGNUP

            <div class="log-sign-box">
              <h1>Signup</h1>
              <form id="signup-form">
                <div class="signup_input">
                  <label className='signup_labels' htmlFor='firstName'>First Name </label>
                  <input
                      className='signup_inputs'
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div class="signup_input">
                    <label className='signup_labels' htmlFor='lastName'>Last Name </label>
                    <input
                        className='signup_inputs'
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div class="signup_input">
                    <label className='signup_labels' htmlFor='email'>Email </label>
                    <input
                        className='signup_inputs'
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div class="signup_input">
                    <label className='signup_labels' htmlFor='password'>Password </label>
                    <input
                        className='signup_inputs'
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div id="su_btn_box">
                  <button id="signup_btn" type="submit" onClick={onSubmit}>Create Account</button>
                </div>
              </form>
              <div className="already-switch">
              <p className="su-li-already">Already have an account? <button className="su-li-switch" onClick={() => setLoginOrSignup('login')}>Log in here.</button></p>
              </div>
            </div>
          )
        }
      </div>
      <footer id="sign-log-footer">Welcome to Toodles</footer>
    </section>
  )
}

export default UserOptions
