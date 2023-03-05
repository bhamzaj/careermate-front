import withLayout from '../../hoc/withLayout';
import { Row, Col, Alert } from 'react-bootstrap';
import RegisterForm from '../../components/Forms/Register';
import Spacer from '../../components/Spacer';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const Register = () => {
  const auth = useSelector((state) => state.auth.value.token);
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate('/profile')
    }
  }, [auth, navigate])

  return (
    <div className="main">

      <Row>
        <Col md={{ span: 4, offset: 1 }}>{!isRegistered ? <RegisterForm setRegistered={setIsRegistered} /> : <><Alert variant={'primary'}>Please verify your account</Alert><Spacer height='9rem' /></>}</Col>
        <Col md={{ span: 7, offset: 0 }}>
          <Spacer height='3rem' />
          <div className='welcome-message'>
            <p>We have 850,000 great job offers you deserve!</p>
            <h1>Find your Career <span>You deserve it</span></h1>
          </div>
        </Col>
        
      </Row>
    </div>
  )
}
export default withLayout(Register);
