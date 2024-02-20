// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/navigation'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import { isEmpty } from 'src/@core/utils/is-empty'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  forgetPassword: () => Promise.resolve(),
}
const AuthContext = createContext(defaultProvider)

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (!isEmpty(storedToken)) {
        setLoading(true)
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        const userData = JSON.parse(window.localStorage.getItem("userData"))
        setUser({ ...userData })

        // await axios
        //   .get(authConfig.meEndpoint)
        //   .then(async response => {
        setLoading(false)

        //     setUser({ ...response.data })
        //   })
        //   .catch(() => {
        //     localStorage.removeItem('userData')
        //     localStorage.removeItem('refreshToken')
        //     localStorage.removeItem(authConfig.storageTokenKeyName)
        //     axios.defaults.headers.delete('Authorization');
        //     setUser(null)
        //     setLoading(false)
        //     if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
        //       router.replace('/login')
        //     }
        //   })
      } else {
        setLoading(false)
      }
    }
    initAuth()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params, errorCallback) => {
    axios
      .post(authConfig.loginEndpoint, params)
      .then(async response => {
        window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
        window.localStorage.setItem(authConfig.onTokenExpiration, response.data.refreshToken)
        window.localStorage.setItem('userData', JSON.stringify(response.data))
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
        setUser({ ...response.data })
        router.replace("/dashboard")
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    axios.defaults.headers.delete['Authorization'];
    router.push('/login')
  }

  const handleSignUp = (params, errorCallback) => {
    axios
      .post(authConfig.signUpEndpoint, params)
      .then(() => {
        router.replace("/login")
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleForgetPassword = (params, errorCallback) => {
    axios
      .post(authConfig.forgetPasswordEndpoint, params)
      .then(() => {
        router.replace("/login")
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    signUp: handleSignUp,
    forgetPassword: handleForgetPassword,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
