import { Col } from "react-bootstrap";
import PublicJobCard from "./PublicJobCard";
import { useSelector } from 'react-redux';


const JobsList = ({ data }) => {
    const token = useSelector((state) => state.auth.value.token);
    const user = useSelector((state) => state.auth.value.user);

    return (
        data &&
        <>
            {data.map((item, index) => (
                <Col xs={12} sm={6} md={12} key={index} className='jobs'>
                    <PublicJobCard job={item} user={user} token={token}/>
                </Col>
            ))}
        </>
    )
}

export default JobsList;