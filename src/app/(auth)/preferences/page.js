"use client";

import { useState } from 'react';

// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Box } from '@mui/system';
import { Button, List, ListItem, ListItemSecondaryAction, ListItemText, MenuItem, Switch, styled, useTheme } from '@mui/material';
import CustomTextField from 'src/@core/components/mui/text-field';

import { useSettings } from 'src/@core/hooks/useSettings';

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
  const theme = useTheme()

  // ** Hook
  const { settings, saveSettings } = useSettings()

  const handleModeToggle = () => {
    if (settings.mode === 'light') {
      saveSettings({ ...settings, mode: 'dark' })
    } else {
      saveSettings({ ...settings, mode: 'light' })
    }
  }

  return (
    <Box sx={{ maxWidth: "lg" }}>
      <Card sx={{ border: "none" }}>
        <CardHeader title='General'></CardHeader>
        <CardContent>
          <StyledList disablePadding>
            <ListItem >
              <ListItemText primary="Language" />
              <Box sx={{ width: "50%" }}>
                <CustomTextField fullWidth select id='language' defaultValue='Greek'>
                  <MenuItem value='English'>English</MenuItem>
                  <MenuItem value='Greek'>Greek</MenuItem>
                  <MenuItem value='French'>French</MenuItem>
                  <MenuItem value='Arabic'>Arabic</MenuItem>
                </CustomTextField>
              </Box>
              <ListItemSecondaryAction />
            </ListItem>
            <ListItem >
              <ListItemText primary="Measurements" />
              <Box sx={{ width: "50%" }}>
                <CustomTextField fullWidth select id='measurements' defaultValue='Metric'>
                  <MenuItem value='Metric'>Metric</MenuItem>
                </CustomTextField>
              </Box>
              <ListItemSecondaryAction />
            </ListItem>
            <ListItem >
              <ListItemText primary="Time Zone" />
              <Box sx={{ width: "50%" }}>
                <CustomTextField fullWidth select id='language' defaultValue='Europe/Sofia'>
                  <MenuItem value='Europe/Sofia'>Europe/Sofia</MenuItem>
                </CustomTextField>
              </Box>
              <ListItemSecondaryAction />
            </ListItem>
          </StyledList>
          <Box sx={{ padding: "1rem 0", display: "flex", justifyContent: "end" }}>
            <Button sx={{ border: "1px solid gray", color: "text.primary" }}>
              Apply
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ border: "none" }}>
        <CardHeader title='Accessability'></CardHeader>
        <CardContent>
          <StyledList disablePadding>
            <ListItem >
              <ListItemText primary="Mode" />
              <Box sx={{ width: "50%" }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography color="primary.main">Light</Typography>
                  <Switch
                    name='mode-toggler'
                    checked={settings.mode === 'light'}
                    onChange={handleModeToggle}
                  />
                  <Typography>Dark</Typography>
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
