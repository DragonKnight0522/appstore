"use client"

// ** React Imports
import { useState } from 'react'

// ** Next Import
import Link from 'next/link'
import Image from 'next/image'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
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

// ** Utils Import
import Footer from 'src/@core/layouts/components/shared-components/footer'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '40rem' },
  [theme.breakpoints.up('md')]: { width: '50rem' }
}))

const schema = yup.object().shape({
  email: yup.string().email().required(),
})

const defaultValues = {
  email: '',
}

const Register = () => {
  // ** States
  const [values, setValues] = useState({
    password: '',
    confirmPassword: '',
    showPassword: false,
    loading: false
  })

  // ** Hook
  const auth = useAuth()
  const theme = useTheme()

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

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const validateCharacterLength = () => values.password.length > 9
  const validateCharacterCase = () => /[a-z]/.test(values.password) && /[A-Z]/.test(values.password);
  const validateSpecialCharacter = () => /[!@#$%^&*(),.?":{}|<>]/.test(values.password);
  const validateNumber = () => /\d/.test(values.password);
  const validateMatch = () => values.password && values.password === values.confirmPassword

  const validatePassword = () =>
    validateCharacterLength() &&
    validateCharacterCase() &&
    validateSpecialCharacter() &&
    validateNumber() &&
    validateMatch()

  const onSubmit = data => {
    if (values.loading) return;
    setValues({ ...values, loading: true })
    const { email } = data
    auth.signUp({ email, password: values.password, password2: values.confirmPassword }, () => {
      setValues({ ...values, loading: false })
      setError('email', {
        type: 'manual',
        message: 'Email or Password is invalid'
      })
    })
  }

  return (
    <Box className='content-center' flexDirection="column">
      <Box sx={{
        width: 'fit-content',
        margin: theme.spacing(0, 4, 4),
        textAlign: 'center',
      }}>
        <Image style={{ width: "5rem", height: "auto" }} alt='University of Nicosia' src={Logo} />
        <Typography variant='h1' sx={{ fontSize: "3.5rem", fontWeight: "600", textAlign: "center" }}>
          UNIC
        </Typography>
      </Box>
      <Card>
        <CardContent sx={{ p: theme => `${theme.spacing(4, 8, 8)} !important` }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: "column" }}>
            <Typography variant='h3' sx={{ ml: 2.5, fontWeight: 700 }}>
              Create an Account
            </Typography>
          </Box>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Typography sx={{ color: 'text.secondary', mr: 2 }}>Already have an account?</Typography>
            <Typography
              component={Link}
              href='/login'
              sx={{ fontSize: theme.typography.body1.fontSize }}
            >
              Sign in
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
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
                  sx={{ mb: 4 }}
                  placeholder='example@example.com'
                  InputLabelProps={{ width: '30%' }}
                  error={Boolean(errors.email)}
                  {...(errors.email && { helperText: errors.email.message })}
                />
              )}
            />
            <CustomTextField
              fullWidth
              label='Password'
              leftLabel
              value={values.password}
              id='auth-register-password'
              onChange={handleChange('password')}
              type={values.showPassword ? 'text' : 'password'}
              sx={{ mb: 4 }}
              InputLabelProps={{ width: '30%' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={e => e.preventDefault()}
                      aria-label='toggle password visibility'
                    >
                      <Icon fontSize='1.25rem' icon={values.showPassword ? 'fa-solid:eye' : 'fa-solid:eye-slash'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <CustomTextField
              fullWidth
              label='Confirm Password'
              leftLabel
              value={values.confirmPassword}
              id='auth-register-confirm-password'
              onChange={handleChange('confirmPassword')}
              type={values.showPassword ? 'text' : 'password'}
              InputLabelProps={{ width: '30%' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={e => e.preventDefault()}
                      aria-label='toggle password visibility'
                    >
                      <Icon fontSize='1.25rem' icon={values.showPassword ? 'fa-solid:eye' : 'fa-solid:eye-slash'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Box sx={{ my: 6, ml: "23%" }} >
              <Box sx={{ width: "100%" }}>
                <Typography variant='body2'>
                  Your password should:
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mr: 4, "& svg": { color: validateCharacterLength() ? "success.main" : 'error.main' } }}>
                  <Icon icon={validateCharacterLength() ? 'tabler:check' : 'mdi:close'} />
                  <Typography variant='body2'>Contain at least 10 characters</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mr: 4, "& svg": { color: validateCharacterCase() ? "success.main" : 'error.main' } }}>
                  <Icon icon={validateCharacterCase() ? 'tabler:check' : 'mdi:close'} />
                  <Typography variant='body2'>Contain both lower and upper case characters</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mr: 4, "& svg": { color: validateSpecialCharacter() ? "success.main" : 'error.main' } }}>
                  <Icon icon={validateSpecialCharacter() ? 'tabler:check' : 'mdi:close'} />
                  <Typography variant='body2'>Contain at least one special character (!, ?, etc,)</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mr: 4, "& svg": { color: validateNumber() ? "success.main" : 'error.main' } }}>
                  <Icon icon={validateNumber() ? 'tabler:check' : 'mdi:close'} />
                  <Typography variant='body2'>Contain at least one number</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mr: 4, "& svg": { color: validateMatch() ? "success.main" : 'error.main' } }}>
                  <Icon icon={validateMatch() ? 'tabler:check' : 'mdi:close'} />
                  <Typography variant='body2'>Passwords do not match</Typography>
                </Box>
              </Box>
            </Box>
            <Box textAlign="right">
              <Button type='submit' size='large' variant='contained' color="secondary" disabled={!validatePassword()} sx={{ paddingX: 20 }}>
                Continue
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
      <Footer settings={{ footer: "absolute" }} />
    </Box>
  )
}

export default Register
