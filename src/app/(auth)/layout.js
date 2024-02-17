"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "src/store/user";

import Guard from 'src/@core/components/auth/Guard';
import { defaultACLObj } from 'src/configs/acl';
import UserLayout from 'src/layouts/UserLayout'

const Layout = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUserInfo())

  }, [dispatch])

  return (
    <Guard aclAbilities={defaultACLObj} authGuard={false} guestGuard={true}>
      <UserLayout>
        {children}
      </UserLayout>
    </Guard>
  )
}

export default Layout;
