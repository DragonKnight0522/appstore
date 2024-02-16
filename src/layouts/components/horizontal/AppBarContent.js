// ** MUI Imports
import Box from '@mui/material/Box'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'

const AppBarContent = props => {
  // ** Props
  const { settings, saveSettings, hidden } = props

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {/* <ModeToggler settings={settings} saveSettings={saveSettings} /> */}
      <UserDropdown settings={settings} hidden={hidden} />
    </Box>
  )
}

export default AppBarContent
