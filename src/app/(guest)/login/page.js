"use client";

// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Image from 'next/image'
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import Logo from "public/images/UNIC-logo.png"

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import Footer from 'src/@core/layouts/components/shared-components/footer';
import { useRouter } from 'next/navigation';

// ** Styled Components

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    maxWidth: '50%'
  },
}))

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})

const defaultValues = {
  password: '',
  email: ''
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // ** Hooks
  const router = useRouter()
  const auth = useAuth()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    if (loading) return;
    setLoading(true)
    const { email, password } = data
    auth.login({ email, password }, (err) => {
      setLoading(false);
      setError('email', {
        type: 'manual',
        message: err?.response?.data?.error ? err.response.data.error : 'Email or Password is invalid'
      })
      router.replace("/dashboard")
    })
  }

  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            position: 'relative',
            background: "url(/images/pages/login-left.png) no-repeat 100% 100%",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Box sx={{
            width: 'fit-content',
            margin: '5rem 3rem',
            textAlign: 'center',
          }}>
            <Image style={{ width: "5rem", height: "auto" }} alt='unic' src={Logo} />
            <Typography variant='h1' sx={{ fontSize: "3.5rem", fontWeight: "600", textAlign: "center" }}>
              UNIC
            </Typography>
          </Box>
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Box sx={{ my: 6 }}>
              <Typography variant='h3' sx={{ mb: 8, fontWeight: 'bold' }}>
                Log in
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', mb: 40 }}>
              <Typography sx={{ color: 'text.secondary', mr: 2 }}>New user?</Typography>
              <Typography sx={{ color: 'text.secondary' }} href='/register' component={Link}>
                Create an account
              </Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ ml: 10, mb: 4 }}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      autoFocus
                      label='Email address'
                      leftLabel
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder='example@example.com'
                      error={Boolean(errors.email)}
                      {...(errors.email && { helperText: errors.email.message })}
                      InputLabelProps={{ width: '30%' }}
                    />
                  )}
                />
              </Box>
              <Box sx={{ ml: 10, mb: 1.5 }}>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      onBlur={onBlur}
                      label='Password'
                      leftLabel
                      onChange={onChange}
                      id='auth-login-v2-password'
                      error={Boolean(errors.password)}
                      {...(errors.password && { helperText: errors.password.message })}
                      type={showPassword ? 'text' : 'password'}
                      InputLabelProps={{ width: '30%' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onMouseDown={e => e.preventDefault()}
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <Icon fontSize='1.25rem' icon={showPassword ? 'fa6-solid:eye' : 'fa6-solid:eye-slash'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              </Box>
              <Box
                sx={{
                  ml: 10,
                  my: 8,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography sx={{ color: 'text.secondary' }} component={Link} href='/forgot-password'>
                  Forgot Password?
                </Typography>
                <Button type='submit' size='large' variant='contained' color="secondary" sx={{ paddingX: 20 }}>
                  Continue
                </Button>
              </Box>
            </form>
            <Box sx={{ mt: 40 }}>
              <Typography sx={{ color: 'text.secondary' }}>
                By logging in you agree with the&nbsp;
                <Typography href='./#' component={Link}>
                  Terms & Conditions
                </Typography>
                &nbsp;and&nbsp;
                <Typography href='./#' component={Link}>
                  Privacy Policy
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
        <Footer settings={{ footer: "absolute" }} />
      </RightWrapper>
    </Box>
  )
}

LoginPage.guestGuard = true

export default LoginPage
