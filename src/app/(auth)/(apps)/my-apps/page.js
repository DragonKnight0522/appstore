"use client";

import { useDispatch, useSelector } from 'react-redux';
import { handleAddFrequentlyUsedApp } from 'src/store/apps';

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Box } from '@mui/system';
import { Avatar, useTheme } from '@mui/material';
import { Icon } from '@iconify/react';
import Translations from 'src/layouts/components/Translations';


const MyApps = () => {
  // ** Hooks
  const theme = useTheme()
  const dispatch = useDispatch()
  const { allData, installedApps } = useSelector(state => state.apps)
  const installedAppsData = allData.filter(app => installedApps.includes(app.id))

  const addFrequentlyUsedApps = (app) => {
    dispatch(handleAddFrequentlyUsedApp(app.id))
  }

  return (
    <Card sx={{ border: "none" }}>
      <CardHeader title={<Translations text='Available Apps' />}></CardHeader>
      <CardContent>
        <Grid item xs={12}>
          <Grid container spacing={6}>
            {installedAppsData.map((app, index) => (
              <Grid item key={index}>
                <Box onClick={() => addFrequentlyUsedApps(app)} sx={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: "column", cursor: "pointer" }}>
                  <Avatar variant='rounded' sx={{ width: "7rem", height: "7rem" }} >
                    <Icon icon={app.icon} fontSize="3rem" color={theme.palette.primary.main} />
                  </Avatar>
                  <Typography variant='body2' >
                    <Translations text={app.title} />
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default MyApps
