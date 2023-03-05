import Footer from '../components/Footer'
import Header from '../components/Header'
import { Container } from 'react-bootstrap'
const withLayout = (Comp) => {
  
  return (props) => (
    <Container>
      <Header />
      <Comp {...props} />
      <Footer />
    </Container>
  )
}

export default withLayout
