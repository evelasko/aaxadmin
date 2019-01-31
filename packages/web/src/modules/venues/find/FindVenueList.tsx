import * as React from 'react'
import { List, Icon } from 'antd'
import gql from 'graphql-tag'

export const venuesQuery = gql`
query VenuesQuery( $query: String )
    { venues (query: $query) { id name address placeID } }
`

interface DataProps {
    loading: boolean
    venues: []
}

export const FindVenueList: React.SFC<DataProps> = ({...props}) => {
    return (
        <div>
            <List
                loading={props.loading}
                rowKey={"id"}
                itemLayout="horizontal"
                dataSource={props.venues}
                renderItem={(item: any) => (
                <List.Item  actions={[<a key={`e${item.id}`}><Icon type="edit" /></a>, <a key={`m${item.id}`}><Icon type="delete" /></a>]}>
                    <List.Item.Meta
                        title={item.name}
                        description={item.address}
                    />
                </List.Item>
                )
            }
            />
        </div>
    )
}

