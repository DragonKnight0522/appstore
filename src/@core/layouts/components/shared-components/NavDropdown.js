// ** React Imports
import { useState, Fragment } from 'react'

// ** Next Import
import { usePathname, useRouter } from 'next/navigation'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Context
import { useAuth } from 'src/hooks/useAuth'
import { IconButton } from '@mui/material'
import Link from 'next/link'
import Translations from 'src/layouts/components/Translations'

const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
  '&.active svg, &:hover .MuiBox-root, &:hover .MuiBox-root svg': {
    color: theme.palette.primary.main
  }
}))

const tabData = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    avatarIcon: 'tabler:home',
  },
  {
    title: 'My Apps',
    url: '/my-apps',
    avatarIcon: 'uil:apps',
  },
  {
    title: 'App Store',
    url: '/app-store',
    avatarIcon: 'bi:bag-plus',
  },
]

const NavDropdown = props => {
  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState(null)

  // ** Hooks
  const router = useRouter()
  const { logout } = useAuth()
  const pathname = usePathname()

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = url => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const styles = {
    px: 4,
    py: 1.75,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      mr: 2.5,
      fontSize: '1.5rem',
      color: 'text.secondary'
    }
  }

  return (
    <Fragment>
      <IconButton color='inherit' sx={{ ml: -2.75 }}
        onClick={handleDropdownOpen} >
        <Icon fontSize='1.5rem' icon='tabler:menu-2' />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4.75 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        {tabData.map((tab, index) => {
          const checked = pathname.includes(tab.url);

          return (
            <MenuItemStyled className={checked ? "active" : ""} key={index} sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
              <Box sx={styles} component={Link} href={tab.url} >
                <Icon icon={tab.avatarIcon} />
                <Translations text={tab.title} />
              </Box>
            </MenuItemStyled>
          )
        })}
      </Menu>
    </Fragment>
  )
}

export default NavDropdown
