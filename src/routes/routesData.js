import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ForgotPassword from '../pages/ForgotPassword'
import Profile from '../pages/Profile'
import VerifyAccount from '../pages/VerifyAccount'
import ResetPassword from '../pages/ForgotPassword/ResetPassword'
import Jobs from '../pages/Jobs/Jobs';

const publicStyle = (element) => {
  return <div id='public_app'>{element}</div>
}
const privateStyle = (element) => {
  return <div id='private_app'>{element}</div>
}

const routesData = {
  publicRoutes: [
    {
      path: '/',
      element: publicStyle(<Home />),
    },
    {
      path: '/login',
      element: publicStyle(<Login />),
    },
    {
      path: '/register',
      element: publicStyle(<Register />),
    },
    {
      path: '/forgot-password',
      element: publicStyle(<ForgotPassword />),
    },
    {
      path: '/reset-password',
      element: publicStyle(<ResetPassword />),
    },
    {
      path: '/verify-account',
      element: publicStyle(<VerifyAccount />),
    },
  ],
  privateRoutes: [
    {
      path: '/profile',
      element: privateStyle(<Profile />),
    },
    {
      path: '/jobs',
      element: privateStyle(<Jobs />),
    },
  ],
}


export default routesData
