import React, { Component } from 'react'
import { createFragmentContainer } from 'react-relay'
import graphql from 'babel-plugin-relay/macro'

import { fetchQuery } from '../Environment'
import CreateVoteMutation from '../mutations/CreateVoteMutation'
import { GC_USER_ID } from '../constants'
import { timeDifferenceForDate } from '../utils'

class Link extends Component {
  _voteForLink = async () => {
    const userId = localStorage.getItem(GC_USER_ID)
    if (!userId) {
      console.log(`Can't vote without user ID`)
      return
    }

    const linkId = this.props.link.id

    const canUserVoteOnLink = await this._userCanVoteOnLink(userId, linkId)
    if (canUserVoteOnLink) {
      CreateVoteMutation(userId, linkId)
    } else {
      console.log(`Current already voted for that link`)
    }
  }

  _userCanVoteOnLink = async (userId, linkId) => {
    const checkVoteQueryText = `
    query CheckVoteQuery($userId: ID!, $linkId: ID!) {
      viewer {
        allVotes(filter: {
          user: { id: $userId },
          link: { id: $linkId }
        }) {
          edges {
            node {
              id
            }
          }
        }
      }
    }`
    const checkVoteQuery = { text: checkVoteQueryText }

    const result = await fetchQuery(checkVoteQuery, { userId, linkId })
    return result.data.viewer.allVotes.edges.length === 0
  }
  render() {
    console.log(this.props)
    const userId = localStorage.getItem(GC_USER_ID)
    const { link, index } = this.props
    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{index + 1}.</span>
          {userId && (
            <div className="ml1 gray f11" onClick={() => this._voteForLink()}>
              ▲
            </div>
          )}
        </div>
        <div className="ml1">
          <div>
            {link.description} ({link.url})
          </div>
          <div className="f6 lh-copy gray">
            {link.votes.count} votes | by{' '}
            {link.postedBy ? link.postedBy.name : 'Unknown'}{' '}
            {timeDifferenceForDate(link.createdAt)}
          </div>
        </div>
      </div>
    )
  }
}

export default createFragmentContainer(Link, {
  link: graphql`
    fragment Link_link on Link {
      id
      description
      url
      createdAt
      postedBy {
        id
        name
      }
      votes {
        count
      }
    }
  `,
})
