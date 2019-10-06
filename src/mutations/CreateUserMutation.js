import { commitMutation } from 'react-relay'
import graphql from 'babel-plugin-relay/macro'
import environment from '../Environment'

// We can create multiple mutations at once. the server will run them synchronously from top to bottom
const mutation = graphql`
  mutation CreateUserMutation(
    $createUserInput: SignupUserInput!
    $signinUserInput: SigninUserInput!
  ) {
    createUser(input: $createUserInput) {
      user {
        id
      }
    }

    signinUser(input: $signinUserInput) {
      token
      user {
        id
      }
    }
  }
`

export default (name, email, password, callback) => {
  const variables = {
    // 1
    createUserInput: {
      name,
      authProvider: {
        email: {
          email,
          password,
        },
      },
      clientMutationId: '',
    },
    // 2
    signinUserInput: {
      email: {
        email,
        password,
      },
      clientMutationId: '',
    },
  }

  // 3
  commitMutation(environment, {
    mutation,
    variables,
    //
    onCompleted: response => {
      const id = response.createUser.user.id
      const token = response.signinUser.token
      // get the id and token from the response, then pass it in our callback function to use it and access it from our component
      callback(id, token)
    },
    onError: err => console.error(err),
  })
}
