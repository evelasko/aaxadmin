import * as React from 'react'
import { Icon, List } from 'antd'
import * as moment from 'moment'
import { withEvents, WithFindEvents } from '@aaxadmin/controller'

class V extends React.PureComponent<WithFindEvents>{
    render() {
        const { events, loading } = this.props
        return (
        <div>
            <List
                loading={loading}
                rowKey={"id"}
                itemLayout="horizontal"
                dataSource={events}
                renderItem={(item: any) => (
                <List.Item  actions={[<a key={`e${item.id}`}><Icon type="edit" /></a>, <a key={`m${item.id}`}><Icon type="delete" /></a>]}
                            extra={
                                <div style={{fontSize: '.8em', marginTop:5}}>
                                    @ {item.venue.name}
                                    <Icon type="clock-circle" style={{padding: '0px 5px 0px 5px'}} />
                                    <span style={moment(item.date).isBefore() ? {color: 'red'}: {}}>
                                        {moment(item.date).format('DD-MM-YY HH:mm')}
                                    </span>
                                    <Icon type="team" style={{padding: '0px 5px 0px 5px'}} />
                                    {item.target}
                                </div>}
                >
                    <List.Item.Meta
                        title={item.title}
                        description={item.body}
                    />
                </List.Item>
                )
            }
            />
        </div>
        )
}}

export const FindEventConnector = withEvents(V)