export const dateFormat = 'YYYY-MM-DD HH:mm:ss'

export function makeFetch(url, method, body) {

  return fetch(url,
      {
        headers: { 'Authorization': 'whatever-you-want',
        'Content-Type': 'application/json' },
        method: method ? method : 'GET' ,
        body: body ? JSON.stringify(body) : null,
      })
}
