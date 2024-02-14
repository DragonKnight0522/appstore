"use client";

import Guard from "src/@core/components/auth/Guard";
import BlankLayout from "src/@core/layouts/BlankLayout";
import { defaultACLObj } from "src/configs/acl";

const Layout = ({ children }) => {
  return (
    <Guard aclAbilities={defaultACLObj} authGuard={false} guestGuard={true}>
      <BlankLayout>
        {children}
      </BlankLayout>
    </Guard>
  )
}

export default Layout;
