import { useState } from 'react';
import { setEmployeeAppliedJobs } from '../../../lib/store/slices/authSlice'
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';
import api, { endpoints } from '../../../lib/api'
import styles from './../Job.module.css'
import { useDispatch } from 'react-redux';

const EmployeeJobCard = ({ job, token, user }) => {
    const dispatch = useDispatch()
    const [hasApplied, setHasApplied] = useState(false)

    const handleApply = async (e) => {
        e.preventDefault()
        const jobId = job._id;
        const response = await api.call(endpoints.applyToJob, { jobId }, token);
        if (response.confirmed) {
            dispatch(setEmployeeAppliedJobs(response.results))
            setHasApplied(!hasApplied);
        }
    }
    return (
        <Card>
            <Card.Body>
                <Card.Title>{job.title}</Card.Title>
                <Card.Subtitle>{job.category}</Card.Subtitle>
                <Row>
                    <Col md={{ span: 10, offset: 0 }}>
                        <blockquote className="blockquote mb-0">
                            <p> {''} </p>
                            <footer className="blockquote-footer">
                                {job.organization} <cite title={job.city}>{job.city}</cite> {' >    ' + job.views} views
                            </footer>
                            <h6>You and <Badge bg="primary">
                                     {job.applicants.length - 1 }
                                </Badge> others applied.
                            </h6>
                        </blockquote>
                    </Col>
                    <Col md={{ span: 8, offset: 0 }}>
                        {!hasApplied ?
                            <Button className={styles.btnapply} variant='danger' onClick={handleApply} > Candel</Button>
                            :
                            <Button disabled className={styles.btnapply} variant='secondary' onClick={handleApply} >Canceled</Button>
                        }
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default EmployeeJobCard;