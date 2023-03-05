import { Form, Button, Spinner, Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import api, { endpoints } from '../../../lib/api'
import { useDispatch } from 'react-redux'
import { login } from '../../../lib/store/slices/authSlice'
const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessages, setErrorMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault()
    const errors = []
    setErrorMessages(errors)
    if (!email) {
      errors.push('Please provide an email!')
    }
    if (!password) {
      errors.push('Please provide an password!')
    }
    if (errors.length) {
      setErrorMessages(errors)
      setIsLoading(false)
      return
    }

    const response = await api.call(endpoints.login, { email, password })
    if (!response.confirmed) {
      setErrorMessages([response.results])
      setIsLoading(false)
      return
    }
    const user = await api.call(endpoints.me, {}, response.results);
    dispatch(login({token: response.results, user: user.results}));
    setIsLoading(false)
  }

  return (
    <>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        {errorMessages.length > 0 &&
          errorMessages.map((elem, index) => (
            <Alert key={index} variant="danger">
              {elem}
            </Alert>
          ))}

        <Form.Group className="mb-3">
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

        <Form.Group className="mb-3" >
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
        {isLoading&&
        <Row>
            <Col xs={12} className="text-center">
                <Spinner animation="border" />
            </Col>
        </Row>}
        <div>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </Form>
    </>
  )
}
export default LoginForm
