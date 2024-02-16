"use client";

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Box } from '@mui/system';
import CustomAvatar from 'src/@core/components/mui/avatar'
import { Avatar, useTheme } from '@mui/material';
import { Icon } from '@iconify/react';

const Dashboard = () => {
  const theme = useTheme()

  return (
    <Card sx={{ border: "none" }}>
      <CardHeader title='Frequently Used Apps'></CardHeader>
      <CardContent>
        <Grid item xs={12}>
          <Grid container spacing={6}>
            <Grid item>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: "column" }}>
                <Avatar variant='rounded' sx={{ width: "7rem", height: "7rem" }} >
                  <Icon icon="tabler:message-circle-2-filled" fontSize="3rem" color={theme.palette.primary.main} />
                </Avatar>
                <Typography variant='body2' >
                  Powerflow
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: "column" }}>
                <Avatar variant='rounded' sx={{ width: "7rem", height: "7rem" }} >
                  <Icon icon="lucide:rocket" fontSize="3rem" color={theme.palette.primary.main} />
                </Avatar>
                <Typography variant='body2' >
                  Accelerate System
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: "column" }}>
                <Avatar variant='rounded' sx={{ width: "7rem", height: "7rem" }} >
                  <Icon icon="ph:graph-bold" fontSize="3rem" color={theme.palette.primary.main} />
                </Avatar>
                <Typography variant='body2' >
                  Knowledge Graph
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: "column" }}>
                <Avatar variant='rounded' sx={{ width: "7rem", height: "7rem" }} >
                  <Icon icon="solar:folder-with-files-bold" fontSize="3rem" color={theme.palette.primary.main} />
                </Avatar>
                <Typography variant='body2' >
                  My Files
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Dashboard
