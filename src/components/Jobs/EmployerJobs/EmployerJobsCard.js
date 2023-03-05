import { useState } from 'react';
import { Row, Col, Card, Button, Badge, ListGroup } from 'react-bootstrap';
import api, { endpoints } from '../../../lib/api'
import styles from '../Job.module.css'


const EmployerJobsCard = ({ job, token, setEditJob }) => {
    const [isDeleted, setIsDeleted] = useState(false);

    const handleEdit = async (e) => {
        setEditJob(job);
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        const response = await api.call(endpoints.deleteJobById(job._id), {}, token)
        if (response.confirmed) {
            setIsDeleted(true)
        }
    }
    return (
        !isDeleted &&
        <Card>
            <Card.Header as="h6" >{job.title}</Card.Header>
            <Card.Body>
                <Card.Title>{job.category}</Card.Title>
                <Card.Subtitle>{job.applicants.length > 0 ? 'Applicants: ' : job.city}</Card.Subtitle>
                <Row>
                    <Col md={{ span: 12, offset: 0 }}>
                        {job.applicants.length > 0 ?
                            <ListGroup variant="flush" as='ol' numbered>
                                {job.applicants.map((e, index) => {
                                  return <ListGroup.Item as='li' key={index}>{e.firstName+' '+e.lastName}</ListGroup.Item>
                                }) }
                            </ListGroup>
                            : <><Badge bg="primary">{job.applicants.length}</Badge> people applied</>
                        }
                    </Col>
                    <Col>
                        <Button className={styles.btn} variant="primary" onClick={handleEdit}>Edit</Button>
                        <Button className={styles.btn} variant="danger" onClick={handleDelete}>Delete</Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default EmployerJobsCard;