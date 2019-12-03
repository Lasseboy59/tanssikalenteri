import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'  // Redirect
import loginService from './services/login'
import { useField } from './hooks'
import './App.css'


const LoginPage = ({ handleSubmit, username, password }) => {
  const [login, setLogin] = useState(false)
  const [register, setRegister] = useState(false)
  const [user, setUser] = useState(null)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBallroomappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const loginButton = () => {
    console.log('login button ------------')
    setLogin(true)
    console.log('login:', login)
  }

  const registrationButton = () => {
    console.log('register button ------------')
    setRegister(true)
    console.log('registration:', register)
  }


  if (user === null && login === false && register === false) {
    return (
      <div>
        <br /><br />
        <button onClick={() => loginButton()}>login</button>
        <button onClick={() => registrationButton()}>register</button>
      </div>
    )
  }

  console.log('login', login)
  console.log('register', register)

  if (user === null && login === true) {
    return (
      <div>
        <button onClick={() => loginButton()}>login</button>
        <button>register</button>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>

          <div>
            username
            <input {...username} />
          </div>

          <div>
            password
            <input {...password} />
          </div>

          <button type="submit">login</button>
        </form>
      </div>
    )
  }
  if (user === null && register === true)
    return (
      <div>
        <button onClick={() => registrationButton()}>register</button>
        <button>register</button>
        <h2>Registration</h2>
        Give you credentials<br /><br />
        <form onSubmit={handleSubmit}>

          <div>
            username
          <input {...username} />
          </div>

          <div>
            password
          <input {...password} />
          </div>

          <button type="submit">register</button>
        </form>
      </div>
    )
}

const Tanssikalenteri = () => {
  return (
    <div>
      <h2>Tanssikalenteri</h2>
    </div>
  );
}

const Tanssipaikat = () => {
  return (
    <div>
      <h2>Tanssipaikat</h2>
    </div>
  );
}

const Tanssikoulut = () => {
  return (
    <div>
      <h2>Tanssikoulut</h2>
    </div>
  );
}

const Kalenteri = () => {
  return (
    <div>
      <h2>Kalenteri</h2>
    </div>
  );
}

const Videolinkit = ({ match }) => {
  return (
    <div>
      <h2>Tanssivideot</h2>
      <a target='_blank' rel="noopener noreferrer" href="https://www.youtube.com/watch?v=2iR_XlfBPpI">"arg. tango"</a>
    </div>
  )
}


// ****************** App **************************

const App = () => {
  const username = useField('username')
  const password = useField('password')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBallroomappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    const credentials = {
      username: username.value,
      password: password.value
    }

    try {
      // console.log('credentials', credentials)
      const user = await loginService.login(
        credentials
      )
      window.localStorage.setItem('loggedBallroomappUser', JSON.stringify(user))

      setUser(user)
      username.reset('')
      password.reset('')
    } catch (exception) {
      console.log('käyttäjätunnus tai salasana virheellinen')
    }
  }

  const omitReset = (hook) => {
    let { reset, ...hookWithoutReset } = hook
    // console.log('hookWitoutReset', JSON.stringify(hookWithoutReset))
    return hookWithoutReset
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBallroomappUser')
    // notify(`${user.username} logged out`, false)
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <div>
          <LoginPage className='loginform'
            username={omitReset(username)}
            password={omitReset(password)}
            handleSubmit={handleLogin}
            toggleButton
          />
        </div>
      </div>
    )
  }

  return (
    <div>
      <Router>
        <div>
          <ul>
            <Link className="link" to="/">Tanssikalenteri</Link>
            <Link className="link" to="/tanssipaikat">Tanssipaikat</Link>
            <Link className="link" to="/tanssikoulut">Tanssikoulut</Link>
            <Link className="link" to="/kalenteri">Kalenteri</Link>
            <Link className="link2" to="/videolinkit">Videolinkit</Link>
            {`Logged in as ${user.name}`} <button onClick={() => handleLogout()}>logout</button>
          </ul>
          <hr />
          <Route exact path="/" component={Tanssikalenteri} />
          <Route exact path="/tanssipaikat" component={Tanssipaikat} />
          <Route exact path="/tanssikoulut" component={Tanssikoulut} />
          <Route exact path="/kalenteri" component={Kalenteri} />
          <Route path="/videolinkit" component={Videolinkit} />
        </div>
      </Router>
    </div>
  )
}

export default App;