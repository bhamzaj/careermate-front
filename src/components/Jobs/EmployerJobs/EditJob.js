import api, { endpoints } from '../../../lib/api'
import { Form, Button, Alert } from 'react-bootstrap'
import {  useState } from 'react'
import styles from '../Job.module.css'



const EditJob = ({token, editJob, setEditJob, setSucessfully}) => {
    const job = editJob

    const [title, setTitle] = useState(job.title);
    const [description, setDescription] = useState(job.description);
    const [category, setCategory] = useState(job.category);
    const [city, setCity] = useState(job.city);
    const [errorMessages, setErrorMessages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = []
        setErrorMessages(errors)
        
        if (!title) {
            errors.push('Please provide a title')
        }
        if (!category) {
            errors.push('Please provide a category')
        }
        if (!city) {
            errors.push('Please provide a city')
        }

        if (errors.length) {
            setErrorMessages(errors)
            return
        }
        const response = await api.call(endpoints.updateJob(job._id), { title, description, category, city }, token)
        if (!response.confirmed) {
            setErrorMessages([response.results])
            return
        }
        setEditJob(false);
        setSucessfully(true);
    }

    return (
        <>
            <h2>Edit Job</h2>
            <Form onSubmit={handleSubmit}>
                {errorMessages.length > 0 &&
                    errorMessages.map((elem, index) => (
                        <Alert key={index} variant="danger">
                            {elem}
                        </Alert>
                    ))}
                
                <Form.Group className="mb-3" controlId="formAddJob">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                        placeholder="Enter title"
                    />
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                        placeholder="Discribe the job"
                    />
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value)
                        }}
                        placeholder="Category"
                    />
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        value={city}
                        onChange={(e) => {
                            setCity(e.target.value)
                        }}
                        placeholder="City"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Save
                </Button>
                <Button className={styles.btncancel} variant="secondary" onClick={() => { setEditJob('') }}>
                    Cancel
                </Button>
            </Form></>)
}

export default EditJob;