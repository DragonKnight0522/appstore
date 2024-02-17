"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchApps } from "src/store/apps";

const Layout = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchApps())

  }, [dispatch])

  return (
    <>
      {children}
    </>
  )
}

export default Layout;
