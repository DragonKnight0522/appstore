// ** MUI Imports
import Fab from '@mui/material/Fab'
import AppBar from '@mui/material/AppBar'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiToolbar from '@mui/material/Toolbar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Theme Config Import
import themeConfig from 'src/configs/themeConfig'

// ** Components
import Customizer from 'src/@core/components/customizer'
import Footer from './components/shared-components/footer'
import Navigation from './components/vertical/navigation'
import ScrollToTop from 'src/@core/components/scroll-to-top'
import AppBarContent from './components/horizontal/app-bar-content'

// ** Util Import
import { hexToRGBA } from '../utils/hex-to-rgba'
import { useState } from 'react'

const HorizontalLayoutWrapper = styled('div')({
  height: '100%',
  display: 'flex',
  ...(themeConfig.horizontalMenuAnimation && { overflow: 'clip' })
})

const VerticalLayoutWrapper = styled('div')({
  height: '100%',
  display: 'flex'
})

const MainContentWrapper = styled(Box)({
  flexGrow: 1,
  minWidth: 0,
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column'
})

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  width: '100%',
  padding: `${theme.spacing(0, 6)} !important`,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(4)
  },
  [theme.breakpoints.down('xs')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}))

const ContentWrapper = styled('main')(({ theme }) => ({
  flexGrow: 1,
  width: '100%',
  padding: theme.spacing(6, 12),
  transition: 'padding .25s ease-in-out',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}))

const CustomLayout = props => {
  // ** Props
  const {
    hidden,
    children,
    settings,
    scrollToTop,
    footerProps,
    saveSettings,
    contentHeightFixed,
    customLayoutProps
  } = props

  // ** Vars
  const { skin, appBar, navHidden, appBarBlur, contentWidth } = settings
  const appBarProps = customLayoutProps?.appBar?.componentProps
  const userNavMenuContent = customLayoutProps?.navMenu?.content
  let userAppBarStyle = {}
  if (appBarProps && appBarProps.sx) {
    userAppBarStyle = appBarProps.sx
  }
  const userAppBarProps = Object.assign({}, appBarProps)
  delete userAppBarProps.sx

  const navigationBorderWidth = skin === 'bordered' ? 1 : 0
  const { navigationSize, disableCustomizer, collapsedNavigationSize } = themeConfig
  const navWidth = navigationSize
  const collapsedNavWidth = collapsedNavigationSize

  // ** States
  const [navVisible, setNavVisible] = useState(false)

  // ** Toggle Functions
  const toggleNavVisibility = () => setNavVisible(!navVisible)

  return (
    <HorizontalLayoutWrapper className='layout-wrapper'>
      <MainContentWrapper className='layout-content-wrapper' sx={{ ...(contentHeightFixed && { maxHeight: '100vh' }) }}>
        {/* Navbar (or AppBar) and Navigation Menu Wrapper */}
        <AppBar
          color='default'
          elevation={skin === 'bordered' ? 0 : 2}
          className='layout-navbar-and-nav-container'
          position={appBar === 'fixed' ? 'sticky' : 'static'}
          sx={{
            alignItems: 'center',
            color: 'text.primary',
            justifyContent: 'center',
            ...(appBar === 'static' && { zIndex: 13 }),
            transition: 'border-bottom 0.2s ease-in-out',
            ...(appBarBlur && { backdropFilter: 'blur(6px)' }),
            backgroundColor: theme => hexToRGBA(theme.palette.background.paper, appBarBlur ? 0.95 : 1),
            ...userAppBarStyle
          }}
          {...userAppBarProps}
        >
          {/* Navbar / AppBar */}
          <Box
            className='layout-navbar'
            sx={{ width: '100%' }}
          >
            <Toolbar
              className='navbar-content-container'
              sx={{
                mx: 'auto',
                ...(contentWidth === 'boxed' && { '@media (min-width:1440px)': { maxWidth: 1440 } }),
                minHeight: theme => `${theme.mixins.toolbar.minHeight - 2}px !important`
              }}
            >
              <AppBarContent
                {...props}
                hidden={hidden}
                settings={settings}
                saveSettings={saveSettings}
                appBarContent={customLayoutProps?.appBar?.content}
                appBarBranding={customLayoutProps?.appBar?.branding}
              />
            </Toolbar>
          </Box>
        </AppBar>
        {/* Content */}
        <VerticalLayoutWrapper className='layout-wrapper'>
          {navHidden ? null : (
            <Navigation
              navWidth={navWidth}
              navVisible={navVisible}
              setNavVisible={setNavVisible}
              collapsedNavWidth={collapsedNavWidth}
              toggleNavVisibility={toggleNavVisibility}
              navigationBorderWidth={navigationBorderWidth}
              navMenuContent={customLayoutProps.navMenu.content}
              navMenuBranding={customLayoutProps.navMenu.branding}
              menuLockedIcon={customLayoutProps.navMenu.lockedIcon}
              verticalNavItems={customLayoutProps.navMenu.navItems}
              navMenuProps={customLayoutProps.navMenu.componentProps}
              menuUnlockedIcon={customLayoutProps.navMenu.unlockedIcon}
              afterNavMenuContent={customLayoutProps.navMenu.afterContent}
              beforeNavMenuContent={customLayoutProps.navMenu.beforeContent}
              {...props}
            />

          )}
          <MainContentWrapper
            className='layout-content-wrapper'
            sx={{ ...(contentHeightFixed && { maxHeight: '100vh' }), minHeight: "auto" }}
          >
            <ContentWrapper
              className='layout-page-content'
              sx={{
                ...(contentHeightFixed && { display: 'flex', overflow: 'hidden' }),
                ...(contentWidth === 'boxed' && {
                  mx: 'auto',
                  '@media (min-width:1440px)': { maxWidth: 1440 },
                  '@media (min-width:1200px)': { maxWidth: '100%' }
                })
              }}
            >
              {children}
            </ContentWrapper>
            <Footer {...props} footerStyles={footerProps?.sx} footerContent={footerProps?.content} />
          </MainContentWrapper>
        </VerticalLayoutWrapper>
        {/* Footer */}
        {/* Customizer */}
        {themeConfig.disableCustomizer || hidden ? null : <Customizer />}
        {/* Scroll to top button */}
        {scrollToTop ? (
          scrollToTop(props)
        ) : (
          <ScrollToTop className='mui-fixed'>
            <Fab color='primary' size='small' aria-label='scroll back to top'>
              <Icon icon='tabler:arrow-up' />
            </Fab>
          </ScrollToTop>
        )}
      </MainContentWrapper>
    </HorizontalLayoutWrapper>
  )
}

export default CustomLayout
