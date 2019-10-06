import React, { Component } from 'react'
import { createPaginationContainer } from 'react-relay'
import graphql from 'babel-plugin-relay/macro'

import Link from './Link'
import NewVoteSubscription from '../subscriptions/NewVoteSubscription'
import { ITEMS_PER_PAGE } from '../constants'

class LinkList extends Component {
  // componentDidMount() {
  //   NewVoteSubscription()
  // }

  _loadMore() {
    const { relay } = this.props

    if (!relay.hasMore()) {
      console.log(`Nothing more to load`)
      return
    }
    if (relay.isLoading()) {
      console.log(`Request is already pending`)
      return
    }

    relay.loadMore(ITEMS_PER_PAGE)
  }

  render() {
    console.log(this.props)
    const { viewer } = this.props
    return (
      <>
        <div>
          {viewer.allLinks.edges.map(
            ({ node }, index) =>
              console.log(node) || (
                <Link key={node.__id} link={node} index={index} />
              ),
          )}
        </div>
        <div className="flex ml4 mv3 gray">
          <div className="pointer" onClick={() => this._loadMore()}>
            More
          </div>
        </div>
      </>
    )
  }
}

export default createPaginationContainer(
  LinkList,
  {
    viewer: graphql`
      fragment LinkList_viewer on Viewer {
        allLinks(first: $count, after: $after, orderBy: createdAt_DESC)
          @connection(key: "LinkList_allLinks") {
          edges {
            node {
              ...Link_link
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `,
  },
  {
    direction: 'forward',
    query: graphql`
      query LinkListForwardQuery($count: Int!, $after: String) {
        viewer {
          ...LinkList_viewer
        }
      }
    `,
    getConnectionFromProps(props) {
      return props.viewer && props.viewer.allLinks
    },
    getFragmentVariables(previousVariables, totalCount) {
      return {
        ...previousVariables,
        count: totalCount,
      }
    },
    getVariables(props, paginationInfo, fragmentVariables) {
      return {
        count: paginationInfo.count,
        after: paginationInfo.cursor,
      }
    },
  },
)
