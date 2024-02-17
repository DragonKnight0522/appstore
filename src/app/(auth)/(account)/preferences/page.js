"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Box } from '@mui/system';
import { Button, List, ListItem, ListItemSecondaryAction, ListItemText, MenuItem, Switch, styled, useTheme } from '@mui/material';
import CustomTextField from 'src/@core/components/mui/text-field';

import { useSettings } from 'src/@core/hooks/useSettings';
import { updateUserInfo } from 'src/store/user';
import Translations from 'src/layouts/components/Translations';

const StyledList = styled(List)(({ theme }) => ({
  '& .MuiListItem-container': {
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.customColors.bodyBg,
    '&:first-of-type': {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius
    },
    '&:last-child': {
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius
    },
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '& .MuiListItem-root': {
      padding: theme.spacing(4, 24, 4, 4)
    },
    '& .MuiListItemText-root': {
      marginTop: 0,
      '& .MuiTypography-root': {
        fontWeight: 500
      }
    }
  }
}))

const Preferences = () => {
  // ** Hooks
  const theme = useTheme()
  const { settings, saveSettings } = useSettings()
  const dispatch = useDispatch()
  const { preferences } = useSelector(state => state.user)
  const [userData, setUserData] = useState({})

  useEffect(() => {
    setUserData(preferences);

  }, [preferences])

  const handleModeToggle = () => {
    if (settings.mode === 'light') {
      saveSettings({ ...settings, mode: 'dark' })
    } else {
      saveSettings({ ...settings, mode: 'light' })
    }
  }

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value })
  }

  const handleUpdatePreferences = () => {
    dispatch(updateUserInfo({ field: "preferences", data: userData }));
  }

  return (
    <Box sx={{ maxWidth: "lg" }}>
      <Card sx={{ border: "none" }}>
        <CardHeader title={<Translations text="General" />}></CardHeader>
        <CardContent>
          <StyledList disablePadding>
            <ListItem >
              <ListItemText primary={<Translations text="Language" />} />
              <Box sx={{ width: "50%" }}>
                <CustomTextField
                  fullWidth
                  select
                  name='language'
                  value={userData.language || ""}
                  onChange={handleChange}
                >
                  <MenuItem value='English'>English</MenuItem>
                  <MenuItem value='Greek'>Greek</MenuItem>
                  <MenuItem value='French'>French</MenuItem>
                  <MenuItem value='Arabic'>Arabic</MenuItem>
                </CustomTextField>
              </Box>
              <ListItemSecondaryAction />
            </ListItem>
            <ListItem >
              <ListItemText primary={<Translations text="Measurements" />} />
              <Box sx={{ width: "50%" }}>
                <CustomTextField
                  fullWidth
                  select
                  name='measurements'
                  value={userData.measurements || ""}
                  onChange={handleChange}
                >
                  <MenuItem value='Metric'>Metric</MenuItem>
                </CustomTextField>
              </Box>
              <ListItemSecondaryAction />
            </ListItem>
            <ListItem >
              <ListItemText primary={<Translations text="Time Zone" />} />
              <Box sx={{ width: "50%" }}>
                <CustomTextField
                  fullWidth
                  select
                  name='timezone'
                  value={userData.timezone || ""}
                  onChange={handleChange}
                >
                  <MenuItem value='Europe/Sofia'>Europe/Sofia</MenuItem>
                </CustomTextField>
              </Box>
              <ListItemSecondaryAction />
            </ListItem>
          </StyledList>
          <Box sx={{ padding: "1rem 0", display: "flex", justifyContent: "end" }}>
            <Button sx={{ border: "1px solid gray", color: "text.primary" }} onClick={() => handleUpdatePreferences()}>
              <Translations text="Apply" />
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ border: "none" }}>
        <CardHeader title={<Translations text="Accessability" />}></CardHeader>
        <CardContent>
          <StyledList disablePadding>
            <ListItem >
              <ListItemText primary={<Translations text="Mode" />} />
              <Box sx={{ width: "50%" }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography color="primary.main"><Translations text="Light" /></Typography>
                  <Switch
                    name='mode-toggler'
                    checked={settings.mode === 'light'}
                    onChange={handleModeToggle}
                  />
                  <Typography><Translations text="Dark" /></Typography>
                </Box>
              </Box>
              <ListItemSecondaryAction />
            </ListItem>
          </StyledList>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Preferences
