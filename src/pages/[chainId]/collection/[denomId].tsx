import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Typography,
  Grid,
  Divider,
  Table,
  TableHead,
  TableBody,
  TableContainer,
  TableCell,
  TableRow,
  Paper,
} from '@mui/material'
import { Collection } from '@/rpc/types/irismod/nft'
import { getChainById } from '@/helpers'
import { getCollection } from '@/rpc'

export default function CollectionDetail() {
  const router = useRouter()
  const { chainId, denomId } = router.query

  const [collection, setCollection] = useState({} as Collection)

  useEffect(() => {
    const fetchData = async () => {
      const chain = getChainById(String(chainId))
      if (chain) {
        const response = await getCollection(
          chain.id,
          chain.rpc,
          String(denomId)
        )
        if (response) {
          setCollection(response.collection)
        } else {
          alert('Collection is not found')
        }
      } else {
        alert('Chain is not found')
      }
    }

    if (!Object.keys(collection).length) {
      fetchData().catch(console.error)
    }
  }, [chainId, denomId, collection])

  return (
    <>
      <Head>
        <title>GoN Collection | {denomId}</title>
        <meta name="description" content="GoN Showcase - Collection" />
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
          <Typography component="h1" variant="h4">
            Detail Collection
          </Typography>
          {collection.denom ? (
            <Box
              sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}
            >
              <Box sx={{ my: 3, mx: 2 }}>
                <Grid container alignItems="center">
                  <Typography gutterBottom variant="h5" component="div">
                    {collection.denom.name}
                  </Typography>
                </Grid>
                <Typography color="text.secondary" variant="body2">
                  {collection.denom.description}
                </Typography>
              </Box>
              <Divider variant="middle" />
              <Box sx={{ m: 2 }}>
                <Grid container alignItems="center">
                  <Grid item xs>
                    <Typography gutterBottom variant="body1" component="div">
                      Creator
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography gutterBottom variant="body2">
                      {collection.denom.creator}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item xs>
                    <Typography gutterBottom variant="body1" component="div">
                      Symbol
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography gutterBottom variant="body2">
                      {collection.denom.symbol}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item xs>
                    <Typography gutterBottom variant="body1" component="div">
                      URI
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography gutterBottom variant="body2">
                      {collection.denom.uri}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          ) : (
            <></>
          )}

          <Typography sx={{ marginTop: 4 }} component="h1" variant="h5">
            List NFTs
          </Typography>

          {collection.nfts ? (
            <TableContainer
              component={Paper}
              sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>NFT ID</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Owner</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {collection.nfts.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.owner}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <></>
          )}
        </Box>
      </main>
    </>
  )
}
