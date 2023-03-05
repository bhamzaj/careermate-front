import { Row, Col } from 'react-bootstrap';
import withLayout from '../../hoc/withLayout';
import LoginForm from '../../components/Forms/Login';
import Spacer from '../../components/Spacer';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function Login() {
  const auth = useSelector((state) => state.auth.value.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate('/profile');
    }
  }, [auth, navigate]);
  return (
    <>
      <div className="main">
        <Row>
          <Col md={{ span: 7, offset: 0 }}>
            <div className='welcome-message'>
              <p>We have 850,000 great job offers you deserve!</p>
              <h1>Find your Career <span>You deserve it</span></h1>
            </div>
          </Col>
          <Col md={{ span: 4, offset: 1 }}>
            <LoginForm />
          </Col>
        </Row>
        <Spacer height='7rem' />
      </div>
    </>
  )
}

export default withLayout(Login);
