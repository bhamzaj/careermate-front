import axios from 'axios'

export const endpoints = {
  login: {
    url: '/auth/login',
    method: 'POST',
  },
  register: {
    url: '/auth/register',
    method: 'POST',
  },
  updateProfile: (id) => {
    return {
      url: '/users/update/' + id,
      method: 'PUT'
    }
  },
  addJob: {
    url: '/jobs',
    method: 'POST'
  },
  updateJob: (id) => {
    return {
      url: '/jobs/update/' + id,
      method: 'PUT'
    }
  },
  applyToJob: {
    url: '/jobs/apply',
    method: 'PUT'
  },
  getAppliedJobsByUserId: (id) => {
    return {
      url: '/jobs/applied/' + id,
      method: 'GET'
    }
  }
  ,
  getJobsByUserId: (id) => {
    return {
      url: '/jobs/user/' + id,
      method: 'GET',
    }
  },
  getOneJobById: (id) => {
    return {
      url: '/jobs/' + id,
      method: 'GET',
    }
  },
  deleteJobById: (id) => {
    return {
      url: 'jobs/' + id,
      method: 'DELETE',
    }
  },
  verifyAccount: {
    url: '/auth/verify-account',
    method: 'GET',
  },
  me: {
    url: '/users/me',
    method: 'GET',
  },
  requestPasswordReset: {
    url: 'auth/request-password-reset',
    method: 'POST',
  },
  resetPassword: {
    url: 'auth/reset-password',
    method: 'POST'
  },
  changePassword: {
    url: '/auth/change-password',
    method: 'PUT'
  },
  getAllJobs: {
    url: '/jobs',
    method: 'GET'
  },
}

const api = {
  call: async (endpoint, data = {}, token = null) => {
    try {
      const axiosConfig = token
        ? {
          baseURL: process.env.REACT_APP_BASE_URL,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        : { baseURL: process.env.REACT_APP_BASE_URL }

      const axiosInstance = axios.create(axiosConfig)
      const config = {
        ...endpoint,
        data: { ...data },
      }
      const result = await axiosInstance(config)
      return result.data
    } catch (err) {
      console.log(err)
      return err.response.data
    }
  },
}

export default api
