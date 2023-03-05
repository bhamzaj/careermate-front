import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const PrivateRouter = ({ children }) => {
  const auth = useSelector((state) => state.auth.value.token)
  const navigate = useNavigate() 

  useEffect(() => {
    if(!auth) {
      navigate('/login')
    }
  }, [auth, navigate])
  
  return <>{children}</>
}

export default PrivateRouter
