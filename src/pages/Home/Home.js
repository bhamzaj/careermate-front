import { useEffect, useState } from 'react';
import withLayout from '../../hoc/withLayout';
import api, { endpoints } from '../../lib/api';
import PublicJobsList from '../../components/Jobs/PublicJobsList';
import { Row, Col, Tab, Tabs, Spinner, FloatingLabel, Form, Button } from 'react-bootstrap';
import Spacer from '../../components/Spacer';
import './Home.css';

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const response = await api.call(endpoints.getAllJobs);
      setData(response.results);
      setIsLoading(false);
    }
    getData();
  }, [])

  return (
    isLoading ?
      <Row>
        <Col xs={12} className="text-center">
          <Spinner animation="border" />
        </Col>
      </Row>
      :
      <>
        <Row>
          <Col md={{ span: 5, offset: 1 }}>
            <Spacer height='3rem' />

            <div className='welcome-message'>
              <p>We have 850,000 great job offers you deserve!</p>
              <h1>Your Dream <span>Job is Waiting</span></h1>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <Spacer height='4rem' />
            <Tabs
              defaultActiveKey="findjob"
              id="uncontrolled-tab-example"
              className="findjobtab"
            >
              <Tab className='findjobtab' eventKey="findjob" title="Find a Job">
                <Row className="g-2">
                  <Col md>
                    <FloatingLabel controlId="floatingInputGrid" label="eg. Programmer">
                      <Form.Control type="rext" placeholder="Job title..." />
                    </FloatingLabel>
                  </Col>
                  <Col md>
                    <FloatingLabel
                      controlId="floatingSelectGrid"
                      label="Job arrangement"
                    >
                      <Form.Select aria-label="Floating label select example">
                        <option>Choose</option>
                        <option value="1">Fulltime</option>
                        <option value="2">Partime</option>
                        <option value="3">Internship</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                  <Col md>
                    <FloatingLabel controlId="floatingInputGrid2" label="Location">
                      <Form.Control type="text" placeholder="Location" />
                    </FloatingLabel>
                  </Col>
                  <Col md={{ span: 2, offset: 0 }}>
                    <Button className='search-button' variant='primary' size='lg'>
                      Search
                    </Button>
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey="findcandidate" title="Find a Candidate">
                <Row className="g-2">
                  <Col md>
                    <FloatingLabel controlId="floatingInputGrid" label="eg. Programmer">
                      <Form.Control type="rext" placeholder="Job title..." />
                    </FloatingLabel>
                  </Col>
                  <Col md>
                    <FloatingLabel
                      controlId="floatingSelectGrid"
                      label="Job arrangement"
                    >
                      <Form.Select aria-label="Floating label select example">
                        <option>Choose</option>
                        <option value="1">Fulltime</option>
                        <option value="2">Partime</option>
                        <option value="3">Internship</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                  <Col md>
                    <FloatingLabel controlId="floatingInputGrid2" label="Location">
                      <Form.Control type="text" placeholder="Location" />
                    </FloatingLabel>
                  </Col>
                  <Col md={{ span: 2, offset: 0 }}>
                    <Button className='search-button' variant='primary' size='lg'>
                      Search
                    </Button>
                  </Col>
                </Row>
              </Tab>

            </Tabs>
            <Spacer height='5rem' />
          </Col>

        </Row>
        <Row>
          <PublicJobsList data={data} />
        </Row>
      </>
  )
}

export default withLayout(Home);
