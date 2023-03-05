import withLayout from '../../hoc/withLayout'
import  ForgotPasswordForm from '../../components/Forms/ForgotPassword'
import {Col} from 'react-bootstrap'
import Spacer from '../../components/Spacer';

const ForgotPassword = () => {
  return (
    <div className="main">
      
      <Col md={{ span: 4 , offset: 1 }}>
      <h2>ForgotPassword</h2>
      <ForgotPasswordForm />
      </Col>
      <Spacer height='9rem' />

    </div>
  )
}
export default withLayout(ForgotPassword)
