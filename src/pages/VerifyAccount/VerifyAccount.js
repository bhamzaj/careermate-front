import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import api, { endpoints } from '../../lib/api'

const VerifiedSuccess = () => {
  return (
    <div>
      <h1>Account Verified Successfully</h1>
      <Link to="/login">Go to login</Link>
    </div>
  )
}

const VerifyAccount = () => {
  const { search } = useLocation()
  const [query] = useState(new URLSearchParams(search))
  const [verified, setVerified] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const token = query.get('token')
      endpoints.verifyAccount.url += `?token=${token}`
      const response = await api.call(endpoints.verifyAccount)
      console.log(response)
      if (!response.confirm) {
        setVerified(false)
        return
      }
      setVerified(true)
    }
    getData()
  }, [])

  return <>{verified !== null ? verified ? <VerifiedSuccess /> : 'Something went wrong!' : null}</>
}

export default VerifyAccount
