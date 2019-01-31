import * as React from 'react'
import { List, Icon } from 'antd'
import { withAllVenues, WithFindVenue } from '@aaxadmin/controller'

class X extends React.PureComponent<WithFindVenue>{
    render() {
        const { venues, loading } = this.props
        return (
        <div>
            <List
                loading={loading}
                rowKey={"id"}
                itemLayout="horizontal"
                dataSource={venues}
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
}}

export const FindVenueConnector = withAllVenues(X)