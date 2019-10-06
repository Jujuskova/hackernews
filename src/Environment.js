import { Environment, Network, RecordSource, Store } from 'relay-runtime'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { GC_AUTH_TOKEN } from './constants'

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
export const fetchQuery = (operation, variables) => {
  return fetch('https://api.graph.cool/relay/v1/ck0uqlhn64ml70167nkihjuas', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem(GC_AUTH_TOKEN)}`,
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json()
  })
}

// Connect the subscriptions
const setupSubscription = (config, variables, cacheConfig, observer) => {
  const query = config.text
  const subscriptionClient = new SubscriptionClient('wss://subscriptions.graph.cool/v1/ck0uqlhn64ml70167nkihjuas', {reconnect: true})

  subscriptionClient.subscribe({query, variables}, (error, result) => {
    observer.onNext({data: result})
  })

}


// Create a network layer from the fetch function
const network = Network.create(fetchQuery, setupSubscription)
const store = new Store(new RecordSource())

// the environment will provide the core functionalities of relay at runtime. to do that it bundles all the configurations
const environment = new Environment({
  network,
  store,
})

export default environment
