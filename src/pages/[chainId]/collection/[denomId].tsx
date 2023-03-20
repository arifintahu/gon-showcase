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

export default function CollectionDetail() {
  const [collection, setCollection] = useState({} as Collection)
  const router = useRouter()
  const { chainId, denomId } = router.query

  useEffect(() => {
    if (!Object.keys(collection).length) {
      setCollection({
        denom: {
          id: 'arkprotocol002',
          name: 'Ark Protocol - building multichain utilities',
          schema: '',
          creator: 'iaa183e7ccwsnngj2q8lfxnmekunspnfxs6qxd4v3f',
          symbol: 'arkprotocol_symbol',
          mint_restricted: true,
          update_restricted: true,
          description:
            "Ark Protocol's mission: build multi-chain NFT utilities, allowing NFTs to move between chains & enabling utilities across multiple chains.",
          uri: 'https://arkprotocol.io',
          uri_hash: '',
          data: '{"github_username": "taitruong", "discord_handle": "mr_t|Ark Protocol#2337", "team_name": "Ark Protocol", "community": "All Cosmos chains ;)"}',
        },
        nfts: [
          {
            id: 'ark001',
            name: '',
            uri: '',
            data: '',
            owner: 'iaa1cg0fcp6t974lanxa2rypl2a4epshw36z0mal7j',
            uri_hash: '',
          },
          {
            id: 'arkNFT003',
            name: 'Follow us on Twitter',
            uri: 'https://twitter.com/arkprotocol',
            data: '{"description":"LFGoooooooooooo interchain!","discord_invite":"https://discord.gg/fVv6Mf9Wr8","team_name":"Ark Protocol","twitter":"arkprotocol","uptickd:name":{"value":""},"uptickd:uri_hash":{"value":""}}',
            owner: 'iaa183e7ccwsnngj2q8lfxnmekunspnfxs6qxd4v3f',
            uri_hash: '',
          },
        ],
      })
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
