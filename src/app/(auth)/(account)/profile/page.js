"use client";

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Box } from '@mui/system';
import { Button, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, styled, useTheme } from '@mui/material';
import { Icon } from '@iconify/react';
import CustomTextField from 'src/@core/components/mui/text-field';
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

const accountInfoList = [
  { attr: "firstName", title: "First Name" },
  { attr: "middleName", title: "Middle Name" },
  { attr: "lastName", title: "Last Name" },
  { attr: "displayName", title: "Display Name" },
  { attr: "userHandle", title: "User Handle" },
]

const organizationList = [
  { department: "University of Nicosia", role: "System Administrator" },
  { department: "University of Nicosia", role: "Student" },
  { department: "University of Nicosia", role: "User" },
  { department: "System", role: "System Administrator" },
  { department: "Ledra Capital", role: "System Administrator" },
]

const Security = () => {
  const [currentAttr, setCurrentAttr] = useState("")

  // ** Hooks
  const theme = useTheme()
  const dispatch = useDispatch()
  const { personalInfo, organization } = useSelector(state => state.user)

  const handleChange = prop => event => {
    dispatch(updateUserInfo({ field: "personalInfo", data: { [prop]: event.target.value } }))
  }

  const handleUpdateOrganization = data => {
    dispatch(updateUserInfo({ field: "organization", data }))
  }

  return (
    <Box sx={{ maxWidth: "lg" }}>
      <Card sx={{ border: "none" }}>
        <CardHeader title={<Translations text='Account Info' />}></CardHeader>
        <CardContent>
          <StyledList disablePadding>
            {accountInfoList.map((accountItem, index) => (
              <ListItem key={index} >
                <ListItemText secondary={<Translations text={accountItem.title} />} />
                <Box sx={{ width: "70%" }}>
                  {accountItem.attr === currentAttr ?
                    <CustomTextField
                      fullWidth
                      autoFocus
                      value={personalInfo[accountItem.attr]}
                      onBlur={() => setCurrentAttr("")}
                      onChange={handleChange(accountItem.attr)}
                    />
                    :
                    <ListItemText primary={personalInfo[accountItem.attr]} />
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
              const selected = org.department === organization.department && org.role === organization.role;

              return (
                <ListItem key={index} >
                  <ListItemText secondary={<Translations text={org.department} />} />
                  <Box sx={{ width: "70%" }}>
                    <ListItemText primary={<Translations text={org.role} />} />
                  </Box>
                  <ListItemSecondaryAction>
                    <Button
                      disabled={selected}
                      sx={{ border: "1px solid gray", color: "text.primary" }}
                      onClick={() => handleUpdateOrganization(org)}
                    >
                      <Translations text={selected ? "Selected" : "Switch"} />
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
