// ** Next Import
import Link from 'next/link'
import Image from 'next/image'

// ** MUI Imports
import Box from '@mui/material/Box'
import { Tab, Typography, Avatar, IconButton } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'

// ** Theme Config Import
import themeConfig from 'src/configs/themeConfig'

// ** Custom Components Import
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'

import SVG_LOGO from '/public/images/unic-logo.svg'
import { usePathname } from 'next/navigation'
import NavDropdown from '../../shared-components/NavDropdown'
import Translations from 'src/layouts/components/Translations'

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  margin: theme.spacing(3, 8, 3, 0),
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

const renderTabs = (pathname, theme) => {
  return tabData.map((item, index) => {
    const checked = pathname.includes(item.url);
    const RenderAvatar = checked ? CustomAvatar : Avatar

    return (
      <LinkStyled
        key={index}
        href={item.url}
        sx={{
          minWidth: 110,
          height: 74,
          borderWidth: 1,
          display: 'flex',
          alignItems: 'center',
          borderRadius: '10px',
          flexDirection: 'column',
          justifyContent: 'center',
          cursor: 'pointer',
          margin: "0 0.5rem",
          "&:hover svg": {
            color: `${theme.palette.primary.main} !important`
          }
        }}
      >
        <RenderAvatar
          variant='rounded'
          {...(checked && { skin: 'light' })}
          sx={{ mb: 2, width: 34, height: 34, background: "transparent" }}
        >
          <Icon fontSize="2rem" icon={item.avatarIcon} />
        </RenderAvatar>
        <Typography sx={{ fontWeight: checked ? 600 : 500, color: 'text.primary', textTransform: 'capitalize' }}>
          <Translations text={item.title} />
        </Typography>
      </LinkStyled>
    )
  })
}

const AppBarContent = props => {
  // ** Props
  const { appBarContent: userAppBarContent, appBarBranding: userAppBarBranding, hidden } = props

  // ** Hooks
  const theme = useTheme()
  const pathname = usePathname()

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {hidden ?
        <>
          <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
            <NavDropdown settings={props.settings} />
          </Box>
          <LinkStyled href='/'>
            <Image src={SVG_LOGO} alt='University of Nicosia' />
          </LinkStyled>
        </>
        :
        <>
          <LinkStyled href='/'>
            <Image src={SVG_LOGO} alt='University of Nicosia' />
          </LinkStyled>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {renderTabs(pathname, theme)}
          </Box>
        </>
      }
      {userAppBarContent ? userAppBarContent(props) : null}
    </Box>
  )
}

export default AppBarContent
