import { Tendermint34Client } from '@cosmjs/tendermint-rpc'
import { QueryClient } from '@cosmjs/stargate'
import { getIrisDenoms, getIrisCollection } from './iris'

const CHAIN = {
  IRIS: 'iris',
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

      case CHAIN.STARGAZE:
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
  denomId: string
): Promise<any> {
  try {
    const tmClient = await Tendermint34Client.connect(rpc)
    const queryClient = new QueryClient(tmClient)

    let response

    switch (chainId) {
      case CHAIN.IRIS:
        response = await getIrisCollection(queryClient, denomId)
        break

      case CHAIN.STARGAZE:
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
