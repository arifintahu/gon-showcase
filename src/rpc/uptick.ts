import { QueryClient } from '@cosmjs/stargate'
import { PageRequest } from 'cosmjs-types/cosmos/base/query/v1beta1/pagination'
import {
  QueryDenomsRequest,
  QueryDenomsResponse,
  QueryCollectionRequest,
  QueryCollectionResponse,
} from '@/rpc/types/irismod/query'

export async function getUptickDenoms(
  queryClient: QueryClient
): Promise<QueryDenomsResponse> {
  const requestData = QueryDenomsRequest.encode({
    pagination: PageRequest.fromJSON({
      countTotal: true,
    }),
  }).finish()
  const { value } = await queryClient.queryAbci(
    '/uptick.collection.v1.Query/Denoms',
    requestData
  )

  return QueryDenomsResponse.decode(value)
}

export async function getUptickCollection(
  queryClient: QueryClient,
  denomId: string
): Promise<QueryCollectionResponse> {
  const requestData = QueryCollectionRequest.encode({
    denom_id: denomId,
  }).finish()
  const { value } = await queryClient.queryAbci(
    '/uptick.collection.v1.Query/Collection',
    requestData
  )

  return QueryCollectionResponse.decode(value)
}
