// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { usePathname } from 'next/navigation'

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery(theme => theme.breakpoints.down('md'))
  const pathname = usePathname();

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
      <Typography sx={{ mr: 2, display: 'flex', color: 'text.secondary' }}>
        Copyright © University of Nicosia. All rights reserved.
      </Typography>
      {hidden ? null : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          {pathname !== "/login/" && <>
            <Typography target='_blank' component={Link} href='https://www.unic.ac.cy/'>
              Terms & Conditions
            </Typography>
            &nbsp;|&nbsp;
            <Typography target='_blank' component={Link} href='https://www.unic.ac.cy/'>
              Privacy Policy
            </Typography>
            &nbsp;|&nbsp;
          </>}
          <Typography target='_blank' component={Link} href='https://www.unic.ac.cy/'>
            Cookie Policy
          </Typography>
          &nbsp;|&nbsp;
          <Typography target='_blank' component={Link} href='https://www.unic.ac.cy/'>
            Contact us
          </Typography>
          &nbsp;|&nbsp;
          <Typography target='_blank' component={Link} href='https://www.unic.ac.cy/'>
            Status
          </Typography>
          &nbsp;|&nbsp;
          <Typography target='_blank' component={Link} href='https://www.unic.ac.cy/'>
            Release
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default FooterContent
