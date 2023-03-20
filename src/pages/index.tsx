import Head from 'next/head'
import { useState } from 'react'
import {
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Typography,
  Select,
  SelectChangeEvent,
  MenuItem,
  Alert,
} from '@mui/material'
import chains from '@/data/chains.json'
import { getChainById } from '@/helpers'
import { getCollection } from '@/rpc'

export default function Home() {
  const [chainId, setChainId] = useState('')
  const [denomId, setDenomId] = useState('')
  const [isNotFound, setIsNotFound] = useState(false)

  const handleChain = (event: SelectChangeEvent) => {
    setChainId(event.target.value as string)
  }

  const handleDenom = (event: any) => {
    setDenomId(event.target.value as string)
  }

  const handleSearch = async (event: any) => {
    event.preventDefault()
    setIsNotFound(false)
    const chain = getChainById(chainId)

    if (chain) {
      const response = await getCollection(chain.id, chain.rpc, denomId)
      if (response) {
        console.log(response)
      } else {
        setIsNotFound(true)
      }
    } else {
      alert('Chain is undefined')
    }
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
                onChange={handleChain}
              >
                {chains.map((chain) => (
                  <MenuItem key={chain.id} value={chain.id}>
                    {chain.name}
                  </MenuItem>
                ))}
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
              onChange={handleDenom}
              value={denomId}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSearch}
            >
              Search
            </Button>
            {isNotFound ? (
              <Alert severity="error">Collection is not found!</Alert>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </main>
    </>
  )
}
