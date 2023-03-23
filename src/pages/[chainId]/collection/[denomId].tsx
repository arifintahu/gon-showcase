import Head from 'next/head'
import { useState, useEffect, SyntheticEvent } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Typography,
  Grid,
  Skeleton,
  Tabs,
  Tab,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from '@mui/material'
import { Collection } from '@/rpc/types/irismod/nft'
import { getChainById, checkURL } from '@/helpers'
import { getCollection } from '@/rpc'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function CollectionDetail() {
  const router = useRouter()
  const { chainId, denomId } = router.query

  const [collection, setCollection] = useState({} as Collection)
  const [value, setValue] = useState(0)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  useEffect(() => {
    const fetchData = async () => {
      const chain = getChainById(String(chainId))
      if (chain) {
        const response = await getCollection(
          chain.id,
          chain.rpc,
          String(denomId),
          true
        )
        if (response) {
          setCollection(response.collection)
        } else {
          alert('Collection is not found')
        }
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
          component="div"
          sx={{
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
            minWidth: '600px',
            maxWidth: '80%',
            alignContent: 'center',
            boxShadow:
              'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
          }}
          bgcolor="#f5f5f5"
        >
          {collection.denom ? (
            <>
              <img
                src="/ambient.png"
                alt="cover"
                loading="lazy"
                width={'100%'}
                height={'200px'}
              />
              <Box sx={{ width: '100%', p: 4 }} component="div">
                <Grid container alignItems="start" flexDirection="column">
                  <Typography gutterBottom variant="h5" component="h1">
                    <strong>{collection.denom.name}</strong>
                  </Typography>
                  <Typography gutterBottom variant="body1" component="p">
                    By <strong>{collection.denom.creator}</strong>
                  </Typography>
                  <Typography gutterBottom variant="body1" component="p">
                    Items <strong>{collection.nfts.length} ·</strong> Symbol{' '}
                    <strong>{collection.denom.symbol}</strong>
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body1"
                    component="p"
                    sx={{ mt: 2 }}
                  >
                    Description :
                  </Typography>
                  <Typography gutterBottom variant="body1" component="p">
                    {collection.denom.description}
                  </Typography>

                  <Typography
                    gutterBottom
                    variant="body1"
                    component="p"
                    sx={{ mt: 2 }}
                  >
                    URI :
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body1"
                    component="a"
                    href={collection.denom.uri}
                  >
                    {collection.denom.uri}
                  </Typography>
                </Grid>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3 }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="NFTs" {...a11yProps(0)} />
                    <Tab label="Recent Txs" {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  {collection.nfts ? (
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      {collection.nfts.map((item) => (
                        <Grid item xs={2} sm={4} md={4} key={item.id}>
                          <Card sx={{ maxWidth: 300 }}>
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                height="140"
                                image={
                                  checkURL(item.uri) ? item.uri : '/noimage.png'
                                }
                                alt="green iguana"
                              />
                              <CardContent>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="div"
                                >
                                  {item.name}
                                </Typography>
                                <Typography variant="subtitle1">
                                  NFT ID
                                </Typography>
                                <Typography
                                  variant="body1"
                                  color="text.secondary"
                                >
                                  {item.id}
                                </Typography>
                                <Typography variant="subtitle1">
                                  Owner
                                </Typography>
                                <Typography
                                  variant="body1"
                                  color="text.secondary"
                                  sx={{
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                  }}
                                >
                                  {item.owner}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <></>
                  )}
                </TabPanel>
                <TabPanel value={value} index={1}>
                  Coming Soon
                </TabPanel>
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ width: '100%', p: 5 }}>
                <Typography variant="h1">
                  <Skeleton />
                </Typography>
                <Typography variant="h2">
                  <Skeleton animation="wave" />
                </Typography>
                <Typography variant="h3">
                  <Skeleton animation={false} />
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </main>
    </>
  )
}
