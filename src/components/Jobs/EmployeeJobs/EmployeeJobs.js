import { useEffect, useState } from 'react';
import api, { endpoints } from '../../../lib/api';
import EmployeeJobsList from './EmployeeJobsList';
import { Row, Col, Spinner } from 'react-bootstrap';
import Spacer from '../../Spacer';
import { Link } from 'react-router-dom';


const EmployeeJobs = ({ user, token }) => {
    const [data, setData] = useState([]);
    const [isEmptyData, setIsEmptyData] = useState(true)
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const getData = async () => {
            const response = await api.call(endpoints.getAppliedJobsByUserId(user._id), {}, token);

            if (response.confirmed) {
                setData(response.results)
                response.results.length === 0 ? setIsEmptyData(true) : setIsEmptyData(false)
                setIsLoading(false);
            }
        }
        getData();
    }, [token, user._id])

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
                    {isEmptyData && <><Spacer height='6rem' /><p>You haven't applied for any job yet! </p>
                        <Link to="/">Find your dream job now!</Link>
                    </>}
                    <EmployeeJobsList data={data} token={token} user={user} md={6} />
                </Row>
            </>
    )
}

export default EmployeeJobs;