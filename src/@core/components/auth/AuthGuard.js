// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/navigation'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'
import { isEmpty } from 'src/@core/utils/is-empty'

const AuthGuard = props => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()

  useEffect(
    () => {
      if (isEmpty(auth.user) && !window.localStorage.getItem('userData')) {
        router.replace('/login')
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router]
  )
  if (auth.loading || isEmpty(auth.user)) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
