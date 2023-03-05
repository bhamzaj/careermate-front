import { useState } from 'react'
import { Form, Alert, Button } from 'react-bootstrap'
import { passwordRegex } from '../../../lib/constants'
import { useLocation } from 'react-router-dom'
import api, { endpoints } from '../../../lib/api'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [errorMessages, setErrorMessages] = useState([])

  const { search } = useLocation()
  const [query] = useState(new URLSearchParams(search))


  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = []

    if (!passwordRegex.test(password)) {
      errors.push('Password must be minimum eight characters, at least one letter and one number')
    }

    if (errors.length) {
      setErrorMessages(errors)
      return
    }

    const response = await api.call(endpoints.resetPassword, {
      token: query.get('token'),
      password
    })
    console.log(response)

  }

  return (
    <Form onSubmit={handleSubmit}>
      {errorMessages.length > 0 &&
        errorMessages.map((elem, index) => (
          <Alert key={index} variant="danger">
            {elem}
          </Alert>
        ))}

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          placeholder="Password"
        />
      </Form.Group>

      <Button type="submit">Submit</Button>
    </Form>
  )
}

export default ResetPassword
