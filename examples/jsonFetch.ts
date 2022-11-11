import type { APIPaths, APIRequests, APIResponse } from '../openapi'

const baseURL = 'http://jsonplaceholder.typicode.com/'

type DefaultToGet<T extends string | undefined> = T extends string ? T : 'get'

export async function jsonFetch<
  Path extends APIPaths,
  Options extends APIRequests<Path>
> (path: Path, options: Options): Promise<APIResponse<Path, DefaultToGet<Options['method']>>> {
  const fetchOptions: RequestInit = {
    headers: {
      'Accept': 'application/json'
    }
  }

  // Request body
  const body = 'body' in options ? options['body'] : null
  if (
    body &&
    typeof body !== 'string' &&
    !(body as any instanceof FormData)
  ) {
    fetchOptions.body = JSON.stringify(body)
  } else if ('body' in options) {
    fetchOptions.body = body
  }


  // Replace url parameters (for instance "/path/{id}"
  let urlPath: string = path
  if ('urlParams' in options) {
    for (const [name, value] of Object.entries(options.urlParams)) {
      urlPath = urlPath.replace(`{${name}}`, value.toString())
    }
  }

  const url = new URL(urlPath, baseURL);

  // Add query parameters
  if ('query' in options) {
    for (const [name, value] of Object.entries(options['query'])) {
      url.searchParams.set(name, typeof value === 'object' ? JSON.stringify(value) : (value as any).toString())
    }
  }

  const response = await fetch(url.toString(), fetchOptions)
  if (!response.headers.get('content-type')?.includes('application/json')) {
    throw new APIError({
      message: await response.text()
    }, response.status)
  }
  if (response.status === 204) {
    return null as any
  }
  const data = await response.json()
  if (response.ok) {
    return data
  }
  throw new APIError(data, response.status)
}

export class APIError extends Error {

  constructor (public data: object, public status: number) {
    super()
  }

}
