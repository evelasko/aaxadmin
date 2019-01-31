import * as React from 'react'
import { List, Icon } from 'antd'
import * as moment from 'moment'
import { withAllNews, WithFindNews } from '@aaxadmin/controller'

class N extends React.PureComponent<WithFindNews>{
    render() {
        const { news, loading } = this.props

        return (
        <div>
            <List
                loading={loading}
                rowKey={"id"}
                itemLayout="horizontal"
                dataSource={news}
                renderItem={(item: any) => (
                <List.Item  actions={[
                                        <a key={`e${item.id}`}><Icon type="edit" /></a>,
                                        <a key={`m${item.id}`}><Icon type="delete" /></a>
                                    ]}
                            extra={
                                <div style={{fontSize: '.8em', marginTop:5}}>
                                    <Icon type="user" style={{padding: '0px 5px 0px 0px'}} />
                                    {item.author.name}
                                    <Icon type="clock-circle" style={{padding:'0px 5px 0px 5px'}} /> 
                                    <span style={moment(item.expiration).isBefore() ? {color: 'red'} : {} }>
                                        {moment(item.expiration).format('DD-MM-YY HH:mm')}
                                    </span>
                                    <Icon type="team" style={{padding: '0px 5px 0px 5px'}} />
                                    {item.target}
                                    {item.featured && <Icon type="star" theme="filled" style={{padding: '0px 5px 0px 5px'}} />}
                                </div>
                                }
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

export const FindNewsConnector = withAllNews(N)
