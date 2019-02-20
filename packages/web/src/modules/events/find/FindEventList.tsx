import * as React from 'react'
import { Icon, List, Modal, Drawer } from 'antd'
import * as moment from 'moment'
import { MutationFn } from 'react-apollo'
import { DeleteEvent } from '@aaxadmin/controller'

import { EditEventComponent } from '../edit/EditEvent'

interface DataProps {
    loading: boolean
    events: []
    user: any
}

const confirm = Modal.confirm

export class FindEventList extends React.PureComponent<DataProps> {
    state = { visible: false, item: '', edit: false, editItem: null, deleteConfirm: false }
    
    // View Event Modal
    showModal = (item: string) => { this.setState({ visible: true, item, edit: false }) }
    handleOk = () => { this.setState({ visible: false, item: '' }) }
    handleCancel = () => { this.setState({ visible: false, item: '', edit: false }) }
    
    // Edit Event Drawer
    setEdit = (editItem: any, edit: boolean) => {this.setState({editItem, edit})}
    onFinish = () => {this.setState({editItem: null, edit: false})}
    
    // Delete Event Modal Confirm
    performDelete = (deleteEvent: MutationFn, id: string) => {
        confirm({
            title: `¿Estás seguro que deseas eliminar este Evento?`,
            content: 'Una vez eliminado no se podrá recuperar',
            okText: 'Si',
            okType: 'danger',
            cancelText: 'No',
            onOk() { deleteEvent({variables: {id}}) },
            onCancel() { console.log('Delete canceled') },
          })
    }

    render() {
        const { user, events, loading} = this.props
        
        return (
            <div>
                <List
                    loading={loading}
                    rowKey={"id"}
                    itemLayout="horizontal"
                    dataSource={events}
                    renderItem={(item: any) => {
                        const actions = []
                        if (user && item.author.id === user.id) {
                            actions.push( <a key={`e${item.id}`}><Icon type="edit" theme="filled"  onClick={() => {this.setEdit(item, true)}} /></a>,
                                            <DeleteEvent>
                                                {({deleteEvent}) => 
                                                    <a key={`m${item.id}`}>
                                                        <Icon type="delete" theme="filled"  onClick={() => { this.performDelete(deleteEvent, item.id) }} />
                                                    </a>}
                                            </DeleteEvent>
                                        )
                        }
                    return (
                    <List.Item  actions={actions}
                                extra={
                                    <div style={{ fontSize: '.8em', marginTop:5 }}>
                                        @ {item.venue.name}
                                        <Icon type="clock-circle" style={{padding: '0px 5px 0px 5px'}} />
                                        <span style={moment(item.date).isBefore() ? {color: 'red'}: {}}>
                                            {moment(item.date).format('DD-MM-YY HH:mm')}
                                        </span>
                                        <Icon type="team" style={{padding: '0px 5px 0px 5px'}} />
                                        {item.target}
                                    </div>}
                    >
                        <List.Item.Meta title={item.title} description={item.body} />
                    </List.Item>
                    )}
                }
                />
                <Drawer
                    width={400}
                    visible={this.state.edit}
                    onClose={() => this.setEdit('', false)}
                    destroyOnClose
                >
                    <EditEventComponent onFinish={this.onFinish} original={this.state.editItem} />
                </Drawer>
            </div>
        )
    }
}
