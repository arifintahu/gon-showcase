import Head from 'next/head'
import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

export default function Home() {
  const [chainId, setChainId] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setChainId(event.target.value as string)
  }

  return (
    <>
      <Head>
        <title>GoN Showcase</title>
        <meta name="description" content="GoN Showcase - Search Collection" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Search Collection
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{
              p: 2,
              mt: 1,
              boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
            }}
          >
            <FormControl variant="outlined" fullWidth sx={{ minWidth: 200 }}>
              <InputLabel id="chainid-label">Select Chain</InputLabel>
              <Select
                labelId="chainid-label"
                id="chainid-select"
                value={chainId}
                label="Chain ID"
                onChange={handleChange}
              >
                <MenuItem value={10}>Irishub</MenuItem>
                <MenuItem value={20}>Stargaze</MenuItem>
                <MenuItem value={30}>Juno</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              id="denom_id"
              label="Denom ID"
              name="denom_id"
              autoComplete="off"
              autoFocus
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Search
            </Button>
          </Box>
        </Box>
      </main>
    </>
  )
}
