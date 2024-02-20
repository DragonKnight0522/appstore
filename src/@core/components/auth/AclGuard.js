// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import { usePathname, useRouter } from 'next/navigation'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Config Import
import { buildAbilityFor } from 'src/configs/acl'

// ** Component Import
import NotAuthorized from 'src/app/401'
import Spinner from 'src/@core/components/spinner'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Util Import
import getHomeRoute from 'src/layouts/components/acl/getHomeRoute'

const AclGuard = props => {
  // ** Props
  const { aclAbilities, children, guestGuard = false, authGuard = true } = props

  // ** Hooks
  const auth = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // ** Vars
  let ability
  useEffect(() => {
    if (auth && pathname === '/') {
      const homeRoute = getHomeRoute(auth.user)
      router.replace(homeRoute)
    }

  }, [auth, guestGuard, router])

  // // User is logged in, build ability for the user based on his role
  // if (auth.user && !ability) {
  //   ability = buildAbilityFor(auth.user.role, aclAbilities.subject)
  //   if (pathname === '/') {
  //     return <Spinner />
  //   }
  // }

  // // If guest guard or no guard is true or any error page
  // if (guestGuard || pathname === '/404' || pathname === '/500' || !authGuard) {
  //   // If user is logged in and his ability is built
  //   if (auth.user && ability) {
  //     return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  //   } else {
  //     // If user is not logged in (render pages like login, register etc..)
  //     return <>{children}</>
  //   }
  // }

  // // Check the access of current user and render pages
  // if (ability && auth.user && ability.can(aclAbilities.action, aclAbilities.subject)) {
  //   if (pathname === '/') {
  //     return <Spinner />
  //   }

  //   return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  // }

  if (auth) {
    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  }

  // Render Not Authorized component if the current user has limited access
  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  )
}

export default AclGuard
