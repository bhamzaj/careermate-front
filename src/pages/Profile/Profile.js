import { useSelector } from 'react-redux';
import SuperAdminProfile from '../../components/Profile/SuperAdminProfile';
import EmployeeProfile from '../../components/Profile/EmployeeProfile';
import EmployerProfile from '../../components/Profile/EmployerProfile';
import withLayout from '../../hoc/withLayout'
import { Row, Col, Card } from 'react-bootstrap';
import Spacer from '../../components/Spacer';
import ChangePassword from '../../components/Profile/ChangePassword';

const Profile = () => {
  const token = useSelector((state) => state.auth.value.token);
  const user = useSelector((state) => state.auth.value.user);
  
  return (
    <>
      <Spacer height='3rem' />
      <Row>
        <Col md={{ span: 4, offset: 0 }}>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="profile.png" />
            <Card.Body>
              <Card.Title>{user.firstName+' '+user.lastName}</Card.Title>
              <Card.Text>
               {user.email}
               {'\n'}
               {user.organization}

              </Card.Text>
              <ChangePassword token={token}/>
            </Card.Body>
          </Card>
        </Col>
        <Col md={{ span: 7, offset: 0 }}>
          {user.role === 'EMPLOYEE' ? <EmployeeProfile token={token} user={user} />:
          user.role ==='EMPLOYER' ? <EmployerProfile token={token} user={user} />
          : <SuperAdminProfile />}
        </Col>
      </Row>
    </>
  )
}
export default withLayout(Profile)
