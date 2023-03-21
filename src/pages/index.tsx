import Head from 'next/head'
import { useRouter } from 'next/router'
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
import LoadingButton from '@mui/lab/LoadingButton'
import SearchIcon from '@mui/icons-material/Search'
import chains from '@/data/chains.json'
import { getChainById } from '@/helpers'
import { getCollection } from '@/rpc'

export default function Home() {
  const router = useRouter()
  const [chainId, setChainId] = useState('')
  const [denomId, setDenomId] = useState('')
  const [isNotFound, setIsNotFound] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isErrorChain, setIsErrorChain] = useState(false)
  const [isErrorDenom, setIsErrorDenom] = useState(false)
  const [msgErrorChain, setMsgErrorChain] = useState('')
  const [msgErrorDenom, setMsgErrorDenom] = useState('')

  const handleChain = (event: any) => {
    setChainId(event.target.value as string)
  }

  const handleDenom = (event: any) => {
    setDenomId(event.target.value as string)
  }

  const handleSearch = async (event: any) => {
    event.preventDefault()
    if (validate()) {
      const chain = getChainById(chainId)

      if (chain) {
        const response = await getCollection(chain.id, chain.rpc, denomId)
        if (response) {
          router.push({
            pathname: '/[chainId]/collection/[denomId]',
            query: {
              chainId: chainId,
              denomId: denomId,
            },
          })
        } else {
          setIsNotFound(true)
          setLoading(false)
        }
      }
    } else {
      setLoading(false)
    }
  }

  const validate = (): Boolean => {
    setIsNotFound(false)
    setLoading(true)
    setIsErrorChain(!chainId.length)
    setIsErrorDenom(!denomId.length)

    if (isErrorChain) {
      setMsgErrorChain('Please select chain')
    } else {
      setMsgErrorChain('')
    }

    if (isErrorDenom) {
      setMsgErrorDenom('Denom ID can not be empty')
    } else {
      setMsgErrorDenom('')
    }

    if (isErrorChain || isErrorDenom) {
      return false
    }

    return true
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
          <Box
            component="form"
            bgcolor="#f5f5f5"
            noValidate
            autoComplete="off"
            sx={{
              p: 4,
              boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
              borderRadius: 3,
              minWidth: '500px',
            }}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{
                mb: 3,
              }}
            >
              Search Collection
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              error={isErrorChain}
              select
              id="chain_id"
              value={chainId}
              label="Select Chain"
              onChange={handleChain}
              helperText={msgErrorChain}
            >
              {chains.map((chain) => (
                <MenuItem key={chain.id} value={chain.id}>
                  {chain.name}
                </MenuItem>
              ))}
            </TextField>
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
              error={isErrorDenom}
              helperText={msgErrorDenom}
            />
            <LoadingButton
              onClick={handleSearch}
              loading={loading}
              loadingPosition="start"
              startIcon={<SearchIcon />}
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                mb: 2,
              }}
            >
              <span>Search</span>
            </LoadingButton>
            {isNotFound ? (
              <Alert
                sx={{ width: '100%', textAlign: 'center' }}
                severity="error"
                variant="outlined"
              >
                Collection is not found!
              </Alert>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </main>
    </>
  )
}
