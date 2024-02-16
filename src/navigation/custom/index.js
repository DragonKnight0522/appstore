import { usePathname } from "next/navigation"

const Navigation = () => {
  const pathname = usePathname();

  const profileNavItems = [
    {
      title: 'Personal Info',
      path: '/profile/',
      icon: 'mdi:card-account-details-outline',
    },
    {
      title: 'Sign In & Security',
      path: '/security/',
      icon: 'cib:adgaurd',
    },
    {
      title: 'Preferences',
      path: '/preferences/',
      icon: 'tabler:settings',
    }
  ]

  return profileNavItems.map(navItem => navItem.path).includes(pathname) ? profileNavItems : [];
}

export default Navigation
