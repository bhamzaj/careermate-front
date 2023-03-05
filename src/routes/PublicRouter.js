import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PublicRouter = ({ children }) => {
  const auth = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    // if (auth) {
    //   navigate('/profile');
    // }
  }, [auth, navigate]);

  return <>{children}</>
}
export default PublicRouter;
