import { Tendermint34Client } from '@cosmjs/tendermint-rpc'
import { QueryClient } from '@cosmjs/stargate'
import { getIrisDenoms, getIrisCollection } from './iris'
import { getOmniflixDenoms, getOmniflixCollection } from './omniflix'
import { getUptickDenoms, getUptickCollection } from './uptick'
import { geStargazeCollection } from './stargaze'

const CHAIN = {
  IRIS: 'iris',
  OMNIFLIX: 'omniflix',
  UPTICK: 'uptick',
  STARGAZE: 'stargaze',
}

export async function getDenoms(chainId: string, rpc: string): Promise<any> {
  try {
    const tmClient = await Tendermint34Client.connect(rpc)
    const queryClient = new QueryClient(tmClient)

    let response

    switch (chainId) {
      case CHAIN.IRIS:
        response = await getIrisDenoms(queryClient)
        break

      case CHAIN.OMNIFLIX:
        response = await getOmniflixDenoms(queryClient)
        break

      case CHAIN.UPTICK:
        response = await getUptickDenoms(queryClient)
        break

      default:
        break
    }

    tmClient.disconnect()

    return response
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function getCollection(
  chainId: string,
  rpc: string,
  denomId: string,
  showTokenInfo: Boolean = false
): Promise<any> {
  try {
    const tmClient = await Tendermint34Client.connect(rpc)
    const queryClient = new QueryClient(tmClient)

    let response

    switch (chainId) {
      case CHAIN.IRIS:
        response = await getIrisCollection(queryClient, denomId)
        break

      case CHAIN.OMNIFLIX:
        response = await getOmniflixCollection(queryClient, denomId)
        break

      case CHAIN.UPTICK:
        response = await getUptickCollection(queryClient, denomId)
        break

      case CHAIN.STARGAZE:
        response = await geStargazeCollection(tmClient, denomId, showTokenInfo)
        break

      default:
        break
    }

    tmClient.disconnect()

    return response
  } catch (err) {
    console.error(err)
    return null
  }
}
