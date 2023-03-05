import { Col } from "react-bootstrap";
import EmployeeJobsCard from "./EmployeeJobsCard";

const EmployeeJobsList = ({ data, token, user }) => {
    return (
        data &&
        <>
            {data.map((item, index) => (
                <Col xs={12} sm={6} md={6} key={index} className='jobs'>
                    <EmployeeJobsCard job={item} token={token} user={user} />
                </Col>
            ))}
        </>
    )
}

export default EmployeeJobsList;