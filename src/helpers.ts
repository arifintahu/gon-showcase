import chains from '@/data/chains.json'

interface Chain {
  id: string
  name: string
  rpc: string
}

export function getChainById(chainId: string): Chain | undefined {
  return chains.find((chain) => chain.id == chainId)
}

export function checkURL(url: string | undefined): Boolean {
  if (url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null
  } else {
    return false
  }
}

export function getLastPath(path: string): string {
  const items = path.split('/')

  if (!items.length) {
    return ''
  }

  return items[items.length - 1]
}
