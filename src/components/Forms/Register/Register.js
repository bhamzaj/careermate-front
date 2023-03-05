import { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import api, { endpoints } from '../../../lib/api'
import { emailRegex, passwordRegex } from '../../../lib/constants'

const RegisterForm = ({ setRegistered }) => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const errors = []
    setErrorMessages(errors)
    if (!emailRegex.test(email)) {
      errors.push('Please provide a valid email address')
    }
    if (!passwordRegex.test(password)) {
      errors.push('Password must be minimumc eight characters, at least one letter and one number')
    }
    if (!firstName) {
      errors.push('Please provide a first name')
    }
    if (!lastName) {
      errors.push('Please provide a last name')
    }

    if (errors.length) {
      setErrorMessages(errors)
      return
    }
    const response = await api.call(endpoints.register, { role, email, password, firstName, lastName })
    console.log(role);
    if (!response.confirmed) {
      setErrorMessages([response.results])
      return
    }
    setRegistered(true)
  }

  return (
    <>
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
        {errorMessages.length > 0 &&
          errorMessages.map((elem, index) => (
            <Alert key={index} variant="danger">
              {elem}
            </Alert>
          ))}

        <Form.Group controlId="formControlsSelect">
          <Form.Label>You are an:</Form.Label>
          <Form.Control
            as="select"
            value={role}
            onChange={(e) => {
              setRole(e.target.value)
            }}
          >
            <option value="EMPLOYEE">Emplyee</option>
            <option value="EMPLOYER">Employer</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            placeholder="Enter email"
          />
        </Form.Group>

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

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value)
            }}
            placeholder="First Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value)
            }}
            placeholder="Last Name"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form></>
  )
}
export default RegisterForm
