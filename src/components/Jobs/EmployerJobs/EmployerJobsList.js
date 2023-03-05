import { Col } from "react-bootstrap";
import EmployerJobsCard from "./EmployerJobsCard";

const EmployerJobsList = ({ data, token, setEditJob, setSucessfully }) => {
    return (
        data &&
        <>
            {data.map((item, index) => (
                <Col xs={12} sm={6} md={6} key={index} className='jobs'>
                    <EmployerJobsCard job={item} token={token} setEditJob={setEditJob} setSucessfully={setSucessfully}/>
                </Col>
            ))}
        </>
    )
}

export default EmployerJobsList;