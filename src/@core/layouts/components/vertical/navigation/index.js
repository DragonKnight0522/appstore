// ** React Import
import { useRef, useState } from 'react'

// ** MUI Imports
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import { createTheme, responsiveFontSizes, styled, ThemeProvider } from '@mui/material/styles'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Theme Config
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import Drawer from './Drawer'
import VerticalNavItems from './VerticalNavItems'
import VerticalNavHeader from './VerticalNavHeader'

// ** Theme Options
import themeOptions from 'src/@core/theme/ThemeOptions'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { IconButton } from '@mui/material'
import { Icon } from '@iconify/react'
import VerticalNavFooter from './VerticalNavFooter'

const StyledBoxForShadow = styled(Box)(({ theme }) => ({
  top: 60,
  left: -8,
  zIndex: 2,
  opacity: 0,
  position: 'absolute',
  pointerEvents: 'none',
  width: 'calc(100% + 15px)',
  height: theme.mixins.toolbar.minHeight,
  transition: 'opacity .15s ease-in-out',
  background: `linear-gradient(${theme.palette.background.paper} ${theme.direction === 'rtl' ? '95%' : '5%'
    },${hexToRGBA(theme.palette.background.paper, 0.85)} 30%,${hexToRGBA(
      theme.palette.background.paper,
      0.5
    )} 65%,${hexToRGBA(theme.palette.background.paper, 0.3)} 75%,transparent)`,
  '&.scrolled': {
    opacity: 1
  }
}))

const Navigation = props => {
  // ** Props
  const {
    hidden,
    settings,
    saveSettings,
    afterNavMenuContent,
    beforeNavMenuContent,
    navigationBorderWidth,
    toggleNavVisibility,
    navMenuContent: userNavMenuContent
  } = props

  // ** States
  const [navHover, setNavHover] = useState(false)
  const [groupActive, setGroupActive] = useState([])
  const [currentActiveGroup, setCurrentActiveGroup] = useState([])

  // ** Ref
  const shadowRef = useRef(null)

  // ** Var
  const { afterVerticalNavMenuContentPosition, beforeVerticalNavMenuContentPosition } = themeConfig

  const navMenuContentProps = {
    ...props,
    navHover,
    groupActive,
    setGroupActive,
    currentActiveGroup,
    setCurrentActiveGroup
  }

  // ** Create new theme for the navigation menu when mode is `semi-dark`
  let darkTheme = createTheme(themeOptions(settings, 'dark'))

  // ** Set responsive font sizes to true
  if (themeConfig.responsiveFontSizes) {
    darkTheme = responsiveFontSizes(darkTheme)
  }

  // ** Fixes Navigation InfiniteScroll
  const handleInfiniteScroll = ref => {
    if (ref) {
      // @ts-ignore
      ref._getBoundingClientRect = ref.getBoundingClientRect
      ref.getBoundingClientRect = () => {
        // @ts-ignore
        const original = ref._getBoundingClientRect()

        return { ...original, height: Math.floor(original.height) }
      }
    }
  }

  // ** Scroll Menu
  const scrollMenu = container => {
    if (beforeVerticalNavMenuContentPosition === 'static' || !beforeNavMenuContent) {
      container = hidden ? container.target : container
      if (shadowRef && container.scrollTop > 0) {
        // @ts-ignore
        if (!shadowRef.current.classList.contains('scrolled')) {
          // @ts-ignore
          shadowRef.current.classList.add('scrolled')
        }
      } else {
        // @ts-ignore
        shadowRef.current.classList.remove('scrolled')
      }
    }
  }
  const ScrollWrapper = hidden ? Box : PerfectScrollbar

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ position: "relative" }}>
        <Drawer {...props} navHover={navHover} setNavHover={setNavHover} navigationBorderWidth={navigationBorderWidth}>
          {/* <VerticalNavHeader {...props} navHover={navHover} /> */}
          {beforeNavMenuContent && beforeVerticalNavMenuContentPosition === 'fixed'
            ? beforeNavMenuContent(navMenuContentProps)
            : null}
          {(beforeVerticalNavMenuContentPosition === 'static' || !beforeNavMenuContent) && (
            <StyledBoxForShadow ref={shadowRef} />
          )}
          <Box sx={{ position: 'relative', overflow: 'hidden', paddingTop: "2rem" }}>
            {/* @ts-ignore */}
            <ScrollWrapper
              {...(hidden
                ? {
                  onScroll: container => scrollMenu(container),
                  sx: { height: '100%', overflowY: 'auto', overflowX: 'hidden' }
                }
                : {
                  options: { wheelPropagation: false },
                  onScrollY: container => scrollMenu(container),
                  containerRef: ref => handleInfiniteScroll(ref)
                })}
            >
              {beforeNavMenuContent && beforeVerticalNavMenuContentPosition === 'static'
                ? beforeNavMenuContent(navMenuContentProps)
                : null}
              {userNavMenuContent ? (
                userNavMenuContent(navMenuContentProps)
              ) : (
                <List className='nav-items' sx={{ pt: 0, '& > :first-of-child': { mt: '0' } }}>
                  <VerticalNavItems
                    navHover={navHover}
                    groupActive={groupActive}
                    setGroupActive={setGroupActive}
                    currentActiveGroup={currentActiveGroup}
                    setCurrentActiveGroup={setCurrentActiveGroup}
                    {...props}
                  />
                </List>
              )}
              {afterNavMenuContent && afterVerticalNavMenuContentPosition === 'static'
                ? afterNavMenuContent(navMenuContentProps)
                : null}
            </ScrollWrapper>
          </Box>
          {afterNavMenuContent && afterVerticalNavMenuContentPosition === 'fixed'
            ? afterNavMenuContent(navMenuContentProps)
            : null}
          <VerticalNavFooter {...props} navHover={navHover} />
        </Drawer>
        <IconButton
          size="large"
          onClick={() => hidden ? toggleNavVisibility() : saveSettings({ ...settings, navCollapsed: !settings.navCollapsed })}
          sx={{
            p: "0.3rem",
            color: 'text.secondary',
            backgroundColor: `${darkTheme.palette.customColors.bodyBg} !important`,
            position: 'absolute',
            top: 0,
            zIndex: 1100,
            right: "-1.8rem",
            borderRadius: "0 0.5rem 0.5rem 0",
          }}
        >
          <Icon icon={`fluent:arrow-export${settings.navCollapsed || hidden ? "" : "-rtl"}-24-filled`} fontSize='1.25rem' />
        </IconButton></Box>
    </ThemeProvider >
  )
}

export default Navigation
