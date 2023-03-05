import withLayout from '../../hoc/withLayout'
import ResetPasswordForm from '../../components/Forms/ResetPassword'
import { Col } from 'react-bootstrap'
const ResetPassword = () => {
  return (
    <>
      <h2>ForgotPassword</h2>
      <Col md={{ span: 4 }}>
        <ResetPasswordForm />
      </Col>
    </>
  )
}
export default withLayout(ResetPassword)
