import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks'
import loginService from '../services/login'

const LoginForm = () => {

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

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>

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

//       <button type="submit">login</button>
//         <button type="submit" onClick={event => window.location.href = '/login'}>Login</button>

LoginForm.propTypes = {
  // handleSubmit: PropTypes.func.isRequired,
  // username: PropTypes.object.isRequired,
  // password: PropTypes.object.isRequired
}

export default LoginForm