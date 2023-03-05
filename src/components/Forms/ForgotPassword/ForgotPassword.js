import { useState } from 'react'
import { Form, Alert, Button } from 'react-bootstrap'
import api, { endpoints } from '../../../lib/api'
import { emailRegex } from '../../../lib/constants'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [errorMessages, setErrorMessages] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const errors = []
    setErrorMessages(errors)
    if (!emailRegex.test(email)) {
      errors.push('Please provide a valid email address')
    }

    if (errorMessages.length) {
      setErrorMessages(errors)
      return
    }

    const response = await api.call(endpoints.requestPasswordReset, { email })
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
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          placeholder="Enter email"
        />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  )
}
export default ForgotPassword
