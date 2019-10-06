import { commitMutation } from 'react-relay'
import graphql from 'babel-plugin-relay/macro'
import environment from '../Environment'

// 1
const mutation = graphql`
  mutation CreateLinkMutation($input: CreateLinkInput!) {
    createLink(input: $input) {
      link {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
      }
    }
  }
`

// 2
export default (postedById, description, url, callback) => {
  // 3
  const variables = {
    input: {
      postedById,
      description,
      url,
      clientMutationId: '',
    },
  }

  // 4
  commitMutation(environment, {
    mutation,
    variables,
    // 5
    onCompleted: () => {
      callback()
    },
    onError: err => console.error(err),
  })
}
