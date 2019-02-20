import * as React from 'react'
import gql from 'graphql-tag'
import * as _ from 'lodash'
import { Badge, List, Icon, Tooltip } from 'antd'
import { Query } from 'react-apollo'

import { GroupRequestListItem } from './groupRequestList'

const userGroupRequestQuery = gql`
    query userGroupRequest
    { userGroupRequest { id name lastname group groupRequest } }
`

interface ViewProps { useBadge: boolean }

export const GroupRequestView:React.SFC<ViewProps> = ({ ...props }) => {
    const { useBadge } = props
    return (
        <Query query={userGroupRequestQuery}>
        {({ loading, data }) => {
            if (loading === true) { return <Icon type="loading" style={{marginLeft:71}}/> }
            if (_.has(data, 'userGroupRequest') && !!data.userGroupRequest.length ) {
                const { userGroupRequest } = data
                if (useBadge && userGroupRequest.length) { 
                    return (
                        <Tooltip title={`Tiene ${userGroupRequest.length} solicitud de cambio de grupo pendiente de revisar`}>
                            <Badge count={userGroupRequest.length} style={{marginLeft:71, marginTop: 0}} />
                        </Tooltip>
                    ) 
                }
                return (
                    <List   loading={loading}
                            rowKey={"id"}
                            header="Solicitudes de Asignación de Grupos de Usuario"
                            bordered={true}
                            itemLayout="horizontal"
                            dataSource={userGroupRequest}
                            renderItem={(item: any) => <GroupRequestListItem item={item} /> }
                    />
                )
            }
            else { return <div /> }
        }}
        </Query>
    )
}