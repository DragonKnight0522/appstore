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
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'

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

const ForgotPassword = () => {
  // ** States
  const [loading, setLoading] = useState(false)

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

  const onSubmit = data => {
    if (loading) return;
    setLoading(true)
    const { email } = data
    auth.signUp({ email }, () => {
      setLoading(false)
      setError('email', {
        type: 'manual',
        message: 'Email is invalid'
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
      <Card sx={{ mb: 16 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(4, 16, 8)} !important` }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: "column" }}>
            <Typography variant='h3' sx={{ ml: 2.5, fontWeight: 700 }}>
              Forget your password?
            </Typography>
          </Box>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Typography sx={{ color: 'text.secondary', mr: 2 }}>Enter your email address below and we will send you a link to reset your password.</Typography>
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
            <Box textAlign="right">
              <Button type='submit' size='large' variant='contained' color="secondary" sx={{ paddingX: 20 }}>
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

export default ForgotPassword
