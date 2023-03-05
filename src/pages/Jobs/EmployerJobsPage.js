import EmployerJobs from '../../components/Jobs/EmployerJobs/EmployerJobs';
import { Row, Col, Card, ListGroup, Badge } from 'react-bootstrap';
import styles from './Jobs.module.css';

const EmployerJobsPage = ({ user, token }) => {

    return (
        <Row>
            <Col md={{ span: 4, offset: 0 }}>
                <Card border='primary' style={{ width: '18rem' }} className={styles.statistics}>
                    <Card.Header as="h5" >Employer Account</Card.Header>
                    <Card.Body>
                        <Card.Title>{user.firstName + ' ' + user.lastName}</Card.Title>
                        <Card.Text>{user.email}</Card.Text>
                        <Card.Text>{user.organization}</Card.Text>
                    </Card.Body>
                </Card>
                <Card border='warning' style={{ width: '18rem' }}>
                    <Card.Header as="h5">Statistics</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Number of jobs published: <Badge>0</Badge></ListGroup.Item>
                        <ListGroup.Item>Number of job applications: <Badge>0</Badge> </ListGroup.Item>
                        <ListGroup.Item>Number of job views: <Badge>0</Badge> </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
            <Col md={{ span: 7, offset: 0 }}>
                <EmployerJobs token={token} user={user} />
            </Col>
        </Row>
    )
}

export default EmployerJobsPage