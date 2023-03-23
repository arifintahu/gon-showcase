import { QueryClient } from '@cosmjs/stargate'
import { Tendermint34Client } from '@cosmjs/tendermint-rpc'
import { setupWasmExtension, WasmExtension } from '@cosmjs/cosmwasm-stargate'
import {
  QueryCollectionResponse,
  createBaseQueryCollectionResponse,
} from '@/rpc/types/irismod/query'
import { getLastPath } from '@/helpers'
import { createBaseNFT } from '@/rpc/types/irismod/nft'

export function wasmClient(
  tmClient: Tendermint34Client
): QueryClient & WasmExtension {
  return QueryClient.withExtensions(tmClient, setupWasmExtension)
}

export function queryContractInfo(
  client: QueryClient & WasmExtension,
  denomId: string
): Promise<any> {
  const query = {
    contract_info: {},
  }

  return client.wasm.queryContractSmart(denomId, query)
}

export function queryAllTokens(
  client: QueryClient & WasmExtension,
  denomId: string
): Promise<any> {
  const query = {
    all_tokens: {},
  }

  return client.wasm.queryContractSmart(denomId, query)
}

export function queryTokenInfo(
  client: QueryClient & WasmExtension,
  denomId: string,
  tokenId: string
): Promise<any> {
  const query = {
    all_nft_info: {
      token_id: tokenId,
    },
  }

  return client.wasm.queryContractSmart(denomId, query)
}

export async function geStargazeCollection(
  tmClient: Tendermint34Client,
  denomId: string,
  showTokenInfo: Boolean = false
): Promise<QueryCollectionResponse> {
  const collection = createBaseQueryCollectionResponse()
  const client = wasmClient(tmClient)

  const responseContract = await queryContractInfo(client, denomId)
  if (responseContract) {
    collection.collection.denom.id = denomId
    collection.collection.denom.name = getLastPath(responseContract.name)
    collection.collection.denom.symbol = getLastPath(responseContract.symbol)
  }

  const responseTokens = await queryAllTokens(client, denomId)
  if (responseTokens) {
    for (const token of responseTokens.tokens) {
      const nft = createBaseNFT()
      nft.id = token
      nft.name = token

      if (showTokenInfo) {
        const responseInfo = await queryTokenInfo(client, denomId, token)
        nft.owner = responseInfo ? responseInfo.access.owner : ''
        nft.uri = responseInfo ? responseInfo.info.token_uri : ''
      }
      collection.collection.nfts.push(nft)
    }
  }

  return collection
}
