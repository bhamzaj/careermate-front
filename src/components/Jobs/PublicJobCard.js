import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmployeeAppliedJobs } from '../../lib/store/slices/authSlice'
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';
import api, { endpoints } from '../../lib/api'
import styles from './Job.module.css'
import ViewJob from './ViewJob';

const JobCard = ({ job, token, user }) => {
    const [hasApplied, setHasApplied] = useState(false);
    const dispatch = useDispatch();
    const appliedJobs = useSelector((state) => state.auth.employeeAppliedJobs);

    useEffect(() => {
        if (appliedJobs.some((e) => e._id === job._id))
            setHasApplied(true)

    }, [appliedJobs, job])


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
                            <p>
                                {/* // limit description length to 180 chars */}
                                {(job.description.length > 180) ? job.description.slice(0, 180 - 1) + '...' : job.description}
                            </p>
                            <footer className="blockquote-footer">
                                {job.organization} <cite title={job.city}>{job.city}</cite> <Badge bg="primary">{job.applicants.length}</Badge> people applied
                            </footer>
                            <Badge bg="primary">
                                {job.views}
                            </Badge> views

                        </blockquote>
                    </Col>
                    <Col md={{ span: 2, offset: 0 }}>
                        {user?.role === 'EMPLOYEE' ? <><Button className={styles.btnapply} variant={hasApplied ? 'danger' : 'success'} onClick={handleApply} >{hasApplied ? 'Cancel' : 'Apply Now'}</Button><ViewJob id={job._id} /></>
                            : <ViewJob id={job._id} />
                        }
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default JobCard;