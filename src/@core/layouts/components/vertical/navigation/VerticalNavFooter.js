// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Custom Icon Import
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'
import LanguageDropdown from '../../shared-components/LanguageDropdown'

// ** Styled Components
const MenuFooterWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(3.5),
  transition: 'all .25s ease-in-out',
  position: "absolute",
  bottom: `calc(${theme.mixins.toolbar.minHeight}px + ${theme.spacing(6)})`,
  left: 0,
  width: '100%',
  minHeight: theme.mixins.toolbar.minHeight
}))

const VerticalNavFooter = props => {
  // ** Props
  const {
    hidden,
    navHover,
    settings,
    saveSettings,
    collapsedNavWidth,
    toggleNavVisibility,
    navigationBorderWidth,
    menuLockedIcon: userMenuLockedIcon,
    navMenuBranding: userNavMenuBranding,
    menuUnlockedIcon: userMenuUnlockedIcon
  } = props

  // ** Hooks & Vars
  const theme = useTheme()
  const { navCollapsed } = settings
  const menuCollapsedStyles = navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 }

  const menuHeaderPaddingLeft = () => {
    if (navCollapsed && !navHover) {
      if (userNavMenuBranding) {
        return 0
      } else {
        return (collapsedNavWidth - navigationBorderWidth - 34) / 8
      }
    } else {
      return 6
    }
  }

  return (
    <MenuFooterWrapper className='nav-header' sx={{ pl: menuHeaderPaddingLeft(), ...menuCollapsedStyles }}>
      <LanguageDropdown settings={settings} saveSettings={saveSettings} />
    </MenuFooterWrapper>
  )
}

export default VerticalNavFooter
