"use client";

import Guard from 'src/@core/components/auth/Guard';
import { defaultACLObj } from 'src/configs/acl';
import UserLayout from 'src/layouts/UserLayout'

const Layout = ({ children }) => {
  return (
    <Guard aclAbilities={defaultACLObj} authGuard={false} guestGuard={true}>
      <UserLayout>
        {children}
      </UserLayout>
    </Guard>
  )
}

export default Layout;
