import api, { endpoints } from '../../lib/api'
import { emailRegex } from '../../lib/constants';
import { Form, Button, Alert, Badge } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { login } from '../../lib/store/slices/authSlice';
import { useDispatch } from 'react-redux'


const EmployerProfile = ({ user, token }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState()
    const [saved, setSaved] = useState(false);

    const [email, setEmail] = useState(user.email);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [organization, setOrganization] = useState(user.organization);
    const [errorMessages, setErrorMessages] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await api.call(endpoints.me, {}, token)
            setData(response.results)
        }
        getData()
    }, [token])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const errors = []
        setErrorMessages(errors)
        if (!emailRegex.test(email)) {
            errors.push('Please provide a valid email address')
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
        const response = await api.call(endpoints.updateProfile(user._id), { email, firstName, lastName, organization }, token)
        if (!response.confirmed) {
            setErrorMessages([response.results])
            return
        }
        dispatch(login({ token, user: response.results }))
        setSaved(true);
    }

    return (data &&
        <>
            <h2>Profile</h2>
            <Form onSubmit={handleSubmit}>
                {errorMessages.length > 0 &&
                    errorMessages.map((elem, index) => (
                        <Alert key={index} variant="danger">
                            {elem}
                        </Alert>
                    ))}
                <h5>
                Account type: <Badge bg="primary">{user.role}</Badge>
                </h5>
                <Form.Group className="mb-3" >
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

                <Form.Group className="mb-3" >
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

                <Form.Group className="mb-3" >
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

                <Form.Group className="mb-3" >
                    <Form.Label>Organization</Form.Label>
                    <Form.Control
                        type="text"
                        value={organization}
                        onChange={(e) => {
                            setOrganization(e.target.value)
                        }}
                        placeholder="Organization"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Save
                </Button>
                {saved && <Alert variant="success">Saved</Alert>}
            </Form></>)
}

export default EmployerProfile;