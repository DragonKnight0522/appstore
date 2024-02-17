"use client";

import { useDispatch, useSelector } from 'react-redux';

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Box } from '@mui/system';
import { Avatar, Button, useTheme } from '@mui/material';
import { Icon } from '@iconify/react';
import { installApp, uninstallApp } from 'src/store/apps';
import Translations from 'src/layouts/components/Translations';

const AppStore = () => {
  // ** Hooks
  const theme = useTheme()
  const dispatch = useDispatch()
  const { allData, installedApps } = useSelector(state => state.apps)

  const handleAppInstall = (app, isInstalled) => {
    if (isInstalled) {
      dispatch(uninstallApp(app.id))
    } else {
      dispatch(installApp(app.id))
    }
  }


  return (
    <Card sx={{ border: "none" }}>
      <CardHeader title={<Translations text='Available Apps' />}></CardHeader>
      <CardContent>
        <Grid item xs={12}>
          <Grid container spacing={6}>
            {allData.map((app, index) => {
              const isInstalled = installedApps.includes(app.id)

              return (
                <Grid item xs={12} lg={6} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: `1px solid ${theme.palette.text.secondary}`, pb: "0.3rem" }}>
                    <Avatar variant='rounded' sx={{ width: "4rem", height: "4rem", marginRight: "1rem" }} >
                      <Icon icon={app.icon} fontSize="2rem" color={theme.palette.primary.main} />
                    </Avatar>
                    <Box sx={{ width: "100%" }}>
                      <Typography variant='h4' >
                        <Translations text={app.title} />
                      </Typography>
                      <Typography variant='body2' >
                        <Translations text={app.desc} />
                      </Typography>
                    </Box>
                    <Button
                      variant='tonal'
                      color='secondary'
                      sx={{ border: "1px solid", fontWeight: "bold" }}
                      onClick={() => handleAppInstall(app, isInstalled)}
                    >
                      <Translations text={isInstalled ? "Uninstall" : "Install"} />
                    </Button>
                  </Box>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AppStore
