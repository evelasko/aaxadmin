import * as React from 'react'
import { List, Icon, Modal, Drawer } from 'antd'
import { MutationFn } from 'react-apollo'
import { DeleteVenue } from '@aaxadmin/controller'

import { EditVenueComponent } from '../edit/EditVenue'

interface DataProps {
    loading: boolean
    venues: []
    user: any
}
const confirm = Modal.confirm

export class FindVenueList extends React.PureComponent<DataProps> {
    state = { visible: false, item: '', edit: false, editItem: null, deleteConfirm: false }
    
    // View Venue Modal
    showModal = (item: string) => { this.setState({ visible: true, item, edit: false }) }
    handleOk = () => { this.setState({ visible: false, item: '' }) }
    handleCancel = () => { this.setState({ visible: false, item: '', edit: false }) }
    
    // Edit Venue Drawer
    setEdit = (editItem: any, edit: boolean) => {this.setState({editItem, edit})}
    onFinish = () => {this.setState({editItem: null, edit: false})}
    
    // Delete Venue Modal Confirm
    performDelete = (deleteVenue: MutationFn, id: string) => {
        confirm({
            title: `¿Estás seguro que deseas eliminar este Recinto?`,
            content: 'Una vez eliminado no se podrá recuperar',
            okText: 'Si',
            okType: 'danger',
            cancelText: 'No',
            onOk() { deleteVenue({variables: {id}}) },
            onCancel() { console.log('Delete canceled') },
        })
    }

    render() {
        const { user, venues, loading} = this.props
        return (
            <div>
                <List
                    loading={loading}
                    rowKey={"id"}
                    itemLayout="horizontal"
                    dataSource={venues}
                    renderItem={(item: any) => {
                        const actions = []
                            if (user.isAdmin) {
                                actions.push( <a key={`e${item.id}`}><Icon type="edit" theme="filled"  onClick={() => {this.setEdit(item, true)}} /></a>,
                                                <DeleteVenue>
                                                    {({deleteVenue}) => 
                                                        <a key={`m${item.id}`}>
                                                            <Icon type="delete" theme="filled"  onClick={() => { this.performDelete(deleteVenue, item.id) }} />
                                                        </a>}
                                                </DeleteVenue>
                                            )
                            }
                        return (
                            <List.Item  actions={actions}>
                                <List.Item.Meta title={item.name} description={item.address} />
                            </List.Item>
                        )
                    }
                }
                />
                <Drawer
                    width={400}
                    visible={this.state.edit}
                    onClose={() => this.setEdit('', false)}
                    destroyOnClose
                >
                    <EditVenueComponent onFinish={this.onFinish} original={this.state.editItem} />
                </Drawer>
            </div>
        )
    }

}