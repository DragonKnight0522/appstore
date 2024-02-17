// ** React Imports
import { useState, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import { StyledEngineProvider, styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Context
import { useAuth } from 'src/hooks/useAuth'
import { useSelector } from 'react-redux'
import Translations from 'src/layouts/components/Translations'

const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
  '&:hover .MuiBox-root, &:hover .MuiBox-root svg': {
    color: theme.palette.primary.main
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  marginRight: theme.spacing(8)
}))

const UserDropdown = props => {
  // ** Props
  const { settings, hidden } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState(null)

  // ** Hooks
  const router = useRouter()
  const { logout } = useAuth()
  const { organization } = useSelector(state => state.user)

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

  const handleLogout = () => {
    // logout()
    handleDropdownClose()
    router.replace("/login")
  }

  return (
    <Fragment>
      <Box onClick={handleDropdownOpen} sx={{ display: "flex", cursor: 'pointer' }}>
        <Badge
          overlap='circular'
          sx={{ ml: 2, background: "text.primary" }}
          badgeContent={<Icon fontSize="0.9rem" icon='tabler:circle-check-filled' />}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
        >
          <Avatar
            onClick={handleDropdownOpen}
            sx={{ width: 38, height: 38 }}
          />
        </Badge>
        {!hidden && <Box sx={{ display: 'flex', ml: 2.5, alignItems: 'flex-start', flexDirection: 'column', minWidth: "10rem" }}>
          <Typography sx={{ fontWeight: 500 }}>
            <Translations text={organization.department} />
          </Typography>
          <Typography variant='body2'>
            <Translations text={organization.role} />
          </Typography>
        </Box>}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4.75 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <Box sx={{ py: 1.75, px: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', ml: 2.5, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 500 }}>
                <Translations text={organization.department} />
              </Typography>
              <Typography variant='body2'>
                <Translations text={organization.role} />
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: theme => `${theme.spacing(2)} !important` }} />
        <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <LinkStyled href="/profile" sx={styles}>
            <Icon icon='tabler:user-check' />
            <Translations text="Profile" />
          </LinkStyled>
        </MenuItemStyled>
        <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <LinkStyled href="/preferences" sx={styles}>
            <Icon icon='tabler:settings' />
            <Translations text="Preferences" />
          </LinkStyled>
        </MenuItemStyled>
        <Divider sx={{ my: theme => `${theme.spacing(2)} !important` }} />
        <MenuItemStyled sx={{ p: 0 }} onClick={handleLogout}>
          <Box sx={styles}>
            <Icon icon='tabler:logout' />
            <Translations text="Log Out" />
          </Box>
        </MenuItemStyled>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
