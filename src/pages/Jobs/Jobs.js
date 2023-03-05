import { useSelector } from 'react-redux';
import withLayout from '../../hoc/withLayout'
import Spacer from '../../components/Spacer';
import EmployerJobsPage from './EmployerJobsPage';
import EmployeeJobsPage from './EmployeeJobsPage';


const Jobs = () => {
    const token = useSelector((state) => state.auth.value.token);
    const user = useSelector((state) => state.auth.value.user);
    return (
        <>
            <Spacer height='3rem' />
            {user.role === 'EMPLOYER' ?
            <EmployerJobsPage user={user} token={token} />
            :
            <EmployeeJobsPage user={user} token={token} />

            }
        </>
    )
}
export default withLayout(Jobs)
