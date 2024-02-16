"use client";

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Box } from '@mui/system';
import CustomAvatar from 'src/@core/components/mui/avatar'
import { Avatar, Button, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, styled, useTheme } from '@mui/material';
import { Icon } from '@iconify/react';
import CustomTextField from 'src/@core/components/mui/text-field';
import { useState } from 'react';

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

const accountInfoList = [
  { attr: "firstName", title: "First Name" },
  { attr: "middleName", title: "Middle Name" },
  { attr: "lastName", title: "Last Name" },
  { attr: "displayName", title: "Display Name" },
  { attr: "userHandle", title: "User Handle" },
]

const organizationList = [
  { depart: "University of Nicosia", role: "System Administrator" },
  { depart: "University of Nicosia", role: "Student" },
  { depart: "University of Nicosia", role: "User" },
  { depart: "System", role: "System Administrator" },
  { depart: "Ledra Capital", role: "System Administrator" },
]

const Security = () => {
  const theme = useTheme()
  const [currentAttr, setCurrentAttr] = useState("")
  const [accountInfo, setAccountInfo] = useState({})

  const handleChange = prop => event => {
    setAccountInfo({ ...accountInfo, [prop]: event.target.value })
  }

  return (
    <Box sx={{ maxWidth: "lg" }}>
      <Card sx={{ border: "none" }}>
        <CardHeader title='Sign In'></CardHeader>
        <CardContent>
          <StyledList disablePadding>
            {accountInfoList.map((accountItem, index) => (
              <ListItem key={index} >
                <ListItemText secondary={accountItem.title} />
                <Box sx={{ width: "70%" }}>
                  {accountItem.attr === currentAttr ?
                    <CustomTextField
                      fullWidth
                      autoFocus
                      value={accountInfo[accountItem.attr]}
                      onBlur={() => setCurrentAttr("")}
                      onChange={handleChange(accountItem.attr)}
                    />
                    :
                    <ListItemText primary={accountItem.attr} />
                  }
                </Box>
                <ListItemSecondaryAction>
                  <IconButton sx={{ border: "1px solid gray" }} onClick={() => setCurrentAttr(accountItem.attr)}>
                    <Icon icon="tabler:pencil" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </StyledList>
        </CardContent>
      </Card>
      <Card sx={{ border: "none" }}>
        <CardHeader title='Organizations'></CardHeader>
        <CardContent>
          <StyledList disablePadding>
            {organizationList.map((org, index) => {
              const selected = org.depart === accountInfo.depart && org.role === accountInfo.role;

              return (
                <ListItem key={index} >
                  <ListItemText secondary={org.depart} />
                  <Box sx={{ width: "70%" }}>
                    <ListItemText primary={org.role} />
                  </Box>
                  <ListItemSecondaryAction>
                    <Button disabled={selected} sx={{ border: "1px solid gray", color: "text.primary" }} onClick={() => setAccountInfo({ ...org })}>
                      {selected ? "Selected" : "Switch"}
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })}
          </StyledList>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Security
