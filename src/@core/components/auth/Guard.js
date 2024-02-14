import AclGuard from "./AclGuard"
import AuthGuard from "./AuthGuard"
import GuestGuard from "./GuestGuard"

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

const Guard = ({ children, authGuard, guestGuard, aclAbilities }) => {
  const AclGuardChildren = <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard} authGuard={authGuard}>{children}</AclGuard>

  if (guestGuard) {
    return (<GuestGuard fallback={<Spinner />}>{AclGuardChildren}</GuestGuard>)
  } else if (!guestGuard && !authGuard) {
    return <>{AclGuardChildren}</>
  } else {
    return <AuthGuard fallback={<Spinner />}>{AclGuardChildren}</AuthGuard>
  }
}

export default Guard
