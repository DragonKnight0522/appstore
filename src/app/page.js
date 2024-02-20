"use client";

import Guard from "src/@core/components/auth/Guard"
import { defaultACLObj } from "src/configs/acl";

const Home = () => {
  return (
    <Guard aclAbilities={defaultACLObj} authGuard={true} guestGuard={false}>
    </Guard>
  )
}

export default Home
