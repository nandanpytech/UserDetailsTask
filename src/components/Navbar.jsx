import React from 'react'
import {Box, Typography} from '@mui/material'

export default function Navbar() {
  return (
    <>
        <Box p={2} sx={{background:"black"}}>
            <Box>
                <Typography sx={{color:"white"}}>
                    Navbar
                </Typography>
            </Box>
        </Box>
    </>
  )
}
