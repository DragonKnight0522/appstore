"use client";

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from 'src/store/user';

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Box } from '@mui/system';
import { Button, IconButton, InputAdornment, List, ListItem, ListItemSecondaryAction, ListItemText, Switch, styled, useTheme } from '@mui/material';
import { Icon } from '@iconify/react';
import CustomTextField from 'src/@core/components/mui/text-field';
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

const StyledListItem = styled(ListItemText)(({ theme }) => ({
  width: "30%",
  wordBreak: "break-all",
  "& span": {
    color: `${theme.palette.customColors.lightPaperBg} !important`
  }
}))

const Profile = () => {
  const [passwordChange, setPasswordChange] = useState(false)
  const [passwordShow, setPasswordShow] = useState(false)

  // ** Hooks
  const theme = useTheme()
  const dispatch = useDispatch()
  const { user, sessions } = useSelector(state => state.user)

  const handleUserInfoChange = event => {
    dispatch(updateUserInfo({ field: "user", data: { "password": event.target.value } }))
  }

  const handleAuthenticatorChange = () => {
    dispatch(updateUserInfo({ field: "user", data: { authenticator: !user.authenticator } }))
  }

  return (
    <Box sx={{ maxWidth: "lg" }}>
      <Card sx={{ border: "none" }}>
        <CardHeader title={<Translations text='Sign In' />}></CardHeader>
        <CardContent>
          <StyledList disablePadding>
            <ListItem >
              <ListItemText secondary={<Translations text="Email" />} />
              <Box sx={{ width: "70%" }}>
                <ListItemText primary={user.email} />
              </Box>
              <ListItemSecondaryAction>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem >
              <ListItemText secondary={<Translations text="Password" />} />
              <Box sx={{ width: "70%" }}>
                {passwordChange ?
                  <CustomTextField
                    fullWidth
                    value={user.password}
                    onBlur={() => setPasswordChange(false)}
                    onChange={handleUserInfoChange}
                    type={passwordShow ? 'text' : 'password'}
                    InputLabelProps={{ width: '30%' }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={() => setPasswordShow(!passwordShow)}
                            onMouseDown={e => e.preventDefault()}
                            aria-label='toggle password visibility'
                          >
                            <Icon fontSize='1.25rem' icon={passwordShow ? 'fa-solid:eye' : 'fa-solid:eye-slash'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  :
                  <ListItemText primary="*****" />
                }
              </Box>
              <ListItemSecondaryAction>
                <IconButton sx={{ border: "1px solid gray" }} onClick={() => setPasswordChange(true)}>
                  <Icon icon="tabler:pencil" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </StyledList>
        </CardContent>
      </Card>
      <Card sx={{ border: "none" }}>
        <CardHeader title={<Translations text='Multi Factor Authentication' />} ></CardHeader>
        <CardContent>
          <StyledList disablePadding>
            <ListItem >
              <Box sx={{ width: "70%" }}>
                <ListItemText primary={<Translations text="Authenticator App" />} />
                <ListItemText secondary={<Translations text="Set up your account to receive auth code via a mobile application" />} />
              </Box>
              <ListItemSecondaryAction>
                <Switch name='auth-app-toggler' checked={user.authenticator || true} onClick={() => handleAuthenticatorChange()} />
              </ListItemSecondaryAction>
            </ListItem>
          </StyledList>
        </CardContent>
      </Card>
      <Card sx={{ border: "none" }}>
        <CardHeader title={<Translations text='Active Sessions' />} ></CardHeader>
        <CardContent>
          <StyledList disablePadding>
            <ListItem sx={{
              background: theme.palette.customColors.darkPaperBg,

              borderTopLeftRadius: theme.shape.borderRadius,
              borderTopRightRadius: theme.shape.borderRadius
            }}>
              <StyledListItem primary={<Translations text="Created" />} />
              <StyledListItem primary={<Translations text="IP Address" />} />
              <StyledListItem primary={<Translations text="User Email" />} />
              <ListItemSecondaryAction />
            </ListItem>
            {sessions.map((session, index) => (
              <ListItem key={index}>
                <ListItemText primary={session.created} sx={{ width: "30%", wordBreak: "break-all" }} />
                <ListItemText primary={session.ip_address} sx={{ width: "30%", wordBreak: "break-all" }} />
                <ListItemText primary={session.email} sx={{ width: "30%", wordBreak: "break-all" }} />
                <ListItemSecondaryAction>
                  <Button sx={{ border: "1px solid gray", color: "text.primary" }}>
                    {session.active ? "Log Out" : "Revoke"}
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </StyledList>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Profile
