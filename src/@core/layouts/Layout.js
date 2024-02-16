// ** React Import
import { useEffect, useRef } from 'react'

// ** Layout Components
import VerticalLayout from './VerticalLayout'
import HorizontalLayout from './HorizontalLayout'
import CustomLayout from './CustomLayout'

const Layout = props => {
  // ** Props
  const { hidden, children, settings, saveSettings } = props

  // ** Ref
  const isCollapsed = useRef(settings.navCollapsed)
  useEffect(() => {
    if (hidden) {
      if (settings.navCollapsed) {
        saveSettings({ ...settings, navCollapsed: false })
        isCollapsed.current = true
      }
    } else {
      if (isCollapsed.current) {
        saveSettings({ ...settings, navCollapsed: true, layout: settings.lastLayout })
        isCollapsed.current = false
      } else {
        if (settings.lastLayout !== settings.layout) {
          saveSettings({ ...settings, layout: settings.lastLayout })
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hidden])
  if (settings.layout === 'vertical') {
    return <VerticalLayout {...props}>{children}</VerticalLayout>
  }
  if (settings.layout === 'horizontal') {
    return <HorizontalLayout {...props}>{children}</HorizontalLayout>
  }

  return <CustomLayout {...props}>{children}</CustomLayout>
}

export default Layout
