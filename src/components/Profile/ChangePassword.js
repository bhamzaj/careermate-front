import React, { useState } from 'react'
import { Row, Col, Alert, Spinner, Button, Offcanvas, Form } from 'react-bootstrap'
import api, { endpoints } from '../../lib/api'

function ChangePassword({ token }) {
    const [show, setShow] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const [errorMessages, setErrorMessages] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        const errors = []
        setErrorMessages(errors)
        if (!password) {
            errors.push('Please provide current password!')
        }
        if (!newPassword) {
            errors.push('Please provide new password!')
        }
        if (!passwordRepeat) {
            errors.push('Please provide password repeat!')
        }
        if (newPassword !== passwordRepeat) {
            errors.push('New password and password repeat did not match!')
        }
        if (errors.length) {
            setErrorMessages(errors)
            setIsLoading(false)
            return
        }

        const response = await api.call(endpoints.changePassword, { password, newPassword }, token)
        console.log(response)
        if (!response.confirmed) {
            setErrorMessages([response.results])
            setIsLoading(false)
            return
        }
        setIsLoading(false)
        setSuccess(true)

    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Change Password
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Change password</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                {success&&<Alert  variant='success'>Password changed successfully</Alert>}
                    {errorMessages.length > 0 &&
                        errorMessages.map((elem, index) => (
                            <Alert key={index} variant='danger'>
                                {elem}
                            </Alert>
                        ))}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-4" controlId="passChange">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                placeholder="Current Password"
                            />
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="newPass" >
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={newPassword}
                                onChange={(e) => {
                                    setNewPassword(e.target.value)
                                }}
                                placeholder="New Password"
                            />
                        
                            <Form.Label></Form.Label>
                            <Form.Control
                                type="password"
                                value={passwordRepeat}
                                onChange={(e) => {
                                    setPasswordRepeat(e.target.value)
                                }}
                                placeholder="Repeat password"
                            />
                        </Form.Group>
                        {isLoading &&
                            <Row>
                                <Col xs={12} className="text-center">
                                    <Spinner animation='border' />
                                </Col>
                            </Row>}
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>

                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}


export default ChangePassword