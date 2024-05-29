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
              <p>Don't have an accout? <button onClick={() => setLoginOrSignup('signup')}>Sign up here.</button></p>
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
                    <label className='signup_labels' htmlFor='email'>Password </label>
                    <input
                        className='signup_inputs'
                        type="password"
                        id="email"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div id="su_btn_box">
                  <button id="signup_btn" type="submit" onClick={onSubmit}>Create Account</button>
                </div>
              </form>
              <p>Already have an account? <button onClick={() => setLoginOrSignup('login')}>Log in here.</button></p>
            </div>
          )
        }
      </div>
      <footer id="sign-log-footer">Welcome to Toodles</footer>
    </section>
  )
}

export default UserOptions
