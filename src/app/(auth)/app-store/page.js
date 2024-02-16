"use client";

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Box } from '@mui/system';
import { Avatar, Button, useTheme } from '@mui/material';
import { Icon } from '@iconify/react';

const AppStore = () => {
  const theme = useTheme()

  const apps = [
    { title: "Accelerate System", desc: "Accelerate system", icon: "lucide:rocket" },
    { title: "Powerflow", desc: "An advanced AI assistant", icon: "tabler:message-circle-2-filled" },
    { title: "My Files", desc: "A simple file manager", icon: "solar:folder-with-files-bold" },
    { title: "Knowledge Graph", desc: "Knowledge graph viewer", icon: "ph:graph-bold" },
    { title: "Tenants App", desc: "Tenants application", icon: "tabler:user" },
    { title: "Access Control", desc: "Access control app for Accelerate", icon: "cbi:adgaurd" },
    { title: "Audit Logs", desc: "Manage Audit Logs", icon: "ri:menu-search-line" },
    { title: "User Management", desc: "Effortlessly manage user accounts", icon: "tabler:user-cog" },
    { title: "Workgroup Management", desc: "Easily assign users to specific workgroup", icon: "fa-solid:users" },
  ];


  return (
    <Card sx={{ border: "none" }}>
      <CardHeader title='Available Apps'></CardHeader>
      <CardContent>
        <Grid item xs={12}>
          <Grid container spacing={6}>
            {apps.map((app, index) => (
              <Grid item xs={12} lg={6} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: `1px solid ${theme.palette.text.secondary}`, pb: "0.3rem" }}>
                  <Avatar variant='rounded' sx={{ width: "4rem", height: "4rem", marginRight: "1rem" }} >
                    <Icon icon={app.icon} fontSize="2rem" color={theme.palette.primary.main} />
                  </Avatar>
                  <Box sx={{ width: "100%" }}>
                    <Typography variant='h4' >{app.title}</Typography>
                    <Typography variant='body2' >{app.desc}</Typography>
                  </Box>
                  <Button variant='tonal' color='secondary' sx={{ border: "1px solid", fontWeight: "bold" }}>Install</Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AppStore
