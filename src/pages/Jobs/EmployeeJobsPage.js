import EmployeeJobs from '../../components/Jobs/EmployeeJobs/EmployeeJobs';
import { Row, Col, Card, ListGroup, Badge } from 'react-bootstrap';
import styles from './Jobs.module.css';
import { useSelector } from 'react-redux';

const EmployeeJobsPage = ({ user, token }) => {
    const applies = useSelector((state) => state.auth.employeeAppliedJobs)

    return (
        <Row>
            <Col md={{ span: 4, offset: 0 }}>
                <Card border='success' style={{ width: '18rem' }} className={styles.statistics}>
                    <Card.Header as="h5" >Employee Account</Card.Header>
                    <Card.Body>
                        <Card.Title>{user.firstName + ' ' + user.lastName}</Card.Title>
                        <Card.Text>{user.email}</Card.Text>
                        <Card.Text>{user.organization}</Card.Text>
                    </Card.Body>
                </Card>
                <Card border='warning' className={styles.statistics} style={{ width: '18rem' }}>
                    <Card.Header as="h5">Statistics</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Number of job applications: <Badge>{applies.length}</Badge></ListGroup.Item>
                        <ListGroup.Item>Number of application reviews: <Badge bg='warning'>0</Badge> </ListGroup.Item>
                        <ListGroup.Item>Number of interview calls: <Badge bg='success'>0</Badge> </ListGroup.Item>
                        <ListGroup.Item>Number of refusations: <Badge bg='danger'>0</Badge> </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
            <Col md={{ span: 7, offset: 0 }}>
                <EmployeeJobs token={token} user={user} />
            </Col>
        </Row>
    )
}

export default EmployeeJobsPage