import chains from '@/data/chains.json'

interface Chain {
  id: string
  name: string
  rpc: string
}

export function getChainById(chainId: string): Chain | undefined {
  return chains.find((chain) => chain.id == chainId)
}
