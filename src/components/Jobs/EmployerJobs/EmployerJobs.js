import { useEffect, useState } from 'react';
import api, { endpoints } from '../../../lib/api';
import { Row, Col, Spinner, Button, Alert } from 'react-bootstrap';
import EmployerJobsList from './EmployerJobsList';
import AddJob from './AddJob';
import EditJob from './EditJob'
import Spacer from '../../Spacer';

const EmployerJobs = ({ user, token }) => {
    const [data, setData] = useState([]);
    const [isEmptyData, setIsEmptyData] = useState(true)
    const [isLoading, setIsLoading] = useState(true);
    const [addNew, setAddNew] = useState(false);
    const [editJob, setEditJob] = useState(null)
    const [sucessfully, setSucessfully] = useState(false)
    useEffect(() => {
        const getData = async () => {
            const response = await api.call(endpoints.getJobsByUserId(user._id), {}, token);
            
            if (response.confirmed) {
                setData(response.results);
                response.results.length === 0 ? setIsEmptyData(true) : setIsEmptyData(false)
                setIsLoading(false);
            }
        }
        getData();
    }, [token, sucessfully, user._id, editJob])

    return (
        <Row>
            {isLoading ?
                <Col xs={12} className="text-center">
                    <Spinner animation="border" />
                </Col>
                :
                <>
                    {sucessfully && <Alert variant="success">Saved</Alert>}
                    {addNew ? <AddJob token={token} setAddNew={setAddNew} setSucessfully={setSucessfully} />
                        : editJob ? <EditJob token={token} editJob={editJob} setEditJob={setEditJob} setSucessfully={setSucessfully}/>
                        :
                        <>
                            <Button onClick={() => { setAddNew(true); setSucessfully(false) }} variant="success">Add new Job</Button>
                            <EmployerJobsList  data={data} user={user} token={token} setEditJob={setEditJob} setSucessfully={setSucessfully} />
                            {isEmptyData && <><Spacer height='6rem' /><p>You didn't post any job yet!</p></>}
                        </>
                    }
                </>
            }
        </Row>
    )
}

export default EmployerJobs;