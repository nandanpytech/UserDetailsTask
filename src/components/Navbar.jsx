import React from 'react'
import {Box, Typography} from '@mui/material'

export default function Navbar({showCart,setShowCart}) {
  return (
    <>
        <Box display="flex" p={2} mb={2} sx={{background:"black",justifyContent:"space-between"}}>
            <Box>
                <Typography sx={{color:"white"}}>
                    Navbar
                </Typography>
            </Box>

            <Box>
                <Typography sx={{color:"white"}} onClick={()=>setShowCart(!showCart)} style={{cursor:"pointer",textDecoration:"underline"}}>
                    {!showCart?"Show Selected Users":"Back To Home"}
                </Typography>
            </Box>
        </Box>
    </>
  )
}
