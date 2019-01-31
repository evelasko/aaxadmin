import * as React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Card, Icon } from 'antd'

export const getOneNews = gql`
    query GetOneNews ($id: ID!)
    { aNews(id: $id) 
    { title subtitle published featured target expiration body author { id name } category imageURL } }
`

interface ViewNewsProps { itemID: string | null }

export const ViewNews: React.SFC<ViewNewsProps> = ({...props}) => {
    return (
        <Query query={getOneNews} variables={{id: props.itemID}} fetchPolicy='network-only'>
            {({ loading, data }) => {
                if (loading) { return <Icon type="loading" /> }
                else {
                return (
                <Card
                    bordered={false} 
                    style={{ width: '100%' }}
                    loading={loading}
                    cover={
                        <div>
                            <h2>
                                {data.aNews.featured && <Icon type="star" theme="filled" style={{marginRight:15}} />}
                                {data.aNews.title}
                            </h2>
                            <img style={{width: '100%', objectFit: 'cover'}} alt={data.aNews.title} src={data.aNews.imageURL} />
                        </div>
                    }
                >
                    <Card.Meta
                    // avatar={<Avatar src="" />}
                    title={data.aNews.subtitle}
                    description={
                        <div>
                            <div style={{ overflow: 'scroll', height:'100px' }} > {data.aNews.body} </div>
                        </div>
                    }
                    />
                </Card>
                // <FindNewsList loading={loading} news={data.newses} user={user||null} />
            )}}}
        </Query>
    )
}
