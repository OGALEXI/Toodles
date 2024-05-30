import { useState } from "react";
import './UserOptions.css';

function UserOptions({ afterLogin }) {
  const [loginOrSignup, setLoginOrSignup] = useState('login');

  //Signup data
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //submit signup function
  const submitSignUp = async (e) => {
    e.preventDefault();

    const newUser = {
      firstName,
      lastName,
      email,
      password
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    }

    try {
      const res = await fetch('http://localhost:8000/new-user', options);
      if (res.status !== 201) {
        const data = await res.json();
        alert(data.message)
      } else {
        //LOGIN USER
        let user = await res.json();
        afterLogin(user);
      }
    } catch(e) {
      console.log("An error occured", e)
    }

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  }

  //submit login function
  const submitLogin = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }

    try {
      let res = await fetch('http://localhost:8000/login', options);
      if (res.status !== 200) {
        let data = await res.json();
        alert(data.message)
      } else {
        //LOGIN USER
        let user = await res.json();
        afterLogin(user);
      }
    } catch (e) {
      console.log("An error occured.", e)
    }

    setEmail('');
    setPassword('');
  }

  return (
    <section id="ls-outer-container">
      <div>
        {
          loginOrSignup === 'login' ? (

            //LOGIN

            <div className="log-sign-box">
              <h1>Login</h1>
              <form>
              <div className="signup_input">
                    <label className='signup_labels' htmlFor='email'>Email </label>
                    <input
                        className='signup_inputs'
                        required
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="signup_input">
                    <label className='signup_labels' htmlFor='password'>Password </label>
                    <input
                        className='signup_inputs'
                        required
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div id="su_btn_box">
                  <button id="signup_btn" type="submit" onClick={submitLogin}>Log In</button>
                </div>
              </form>
              <div className="already-switch">
                <p className="su-li-already">Don't have an account? <button className="su-li-switch" onClick={() => setLoginOrSignup('signup')}>Sign up here.</button></p>
              </div>
            </div>
          ) : (

            //SIGNUP

            <div className="log-sign-box">
              <h1>Signup</h1>
              <form id="signup-form">
                <div className="signup_input">
                  <label className='signup_labels' htmlFor='firstName'>First Name </label>
                  <input
                      className='signup_inputs'
                      required
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="signup_input">
                    <label className='signup_labels' htmlFor='lastName'>Last Name </label>
                    <input
                        className='signup_inputs'
                        required
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="signup_input">
                    <label className='signup_labels' htmlFor='email'>Email </label>
                    <input
                        className='signup_inputs'
                        required
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="signup_input">
                    <label className='signup_labels' htmlFor='password'>Password </label>
                    <input
                        className='signup_inputs'
                        required
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div id="su_btn_box">
                  <button id="signup_btn" type="submit" onClick={submitSignUp}>Create Account</button>
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
