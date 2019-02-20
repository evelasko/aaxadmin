import * as React from 'react'
import { List, Icon, Modal } from 'antd'
import { MutationFn } from 'react-apollo'

import { DeleteNews } from '@aaxadmin/controller'

const confirm = Modal.confirm

interface DataProps {
    loading: boolean
    users: any
    user: any
}

export class FindUsersList extends React.PureComponent<DataProps> {
    state = { visible: false, item: '', edit: false, editItem: null, deleteConfirm: false }
    
    // View News Modal
    showModal = (item: string) => { this.setState({ visible: true, item, edit: false }) }
    handleOk = () => { this.setState({ visible: false, item: '' }) }
    handleCancel = () => { this.setState({ visible: false, item: '', edit: false }) }
    
    // Edit News Drawer
    setEdit = (editItem: any, edit: boolean) => {this.setState({editItem, edit})}
    onFinish = () => {this.setState({editItem: null, edit: false})}
    
    // Delete News Modal Confirm
    performDelete = (deleteNews: MutationFn, id: string, cat: string) => {
        confirm({
            title: `¿Estás seguro que deseas cambiar?`,
            content: 'Una vez eliminada no se podrá recuperar',
            okText: 'Si',
            okType: 'danger',
            cancelText: 'No',
            onOk() { deleteNews({variables: {id}}) },
            onCancel() { console.log('Delete canceled') },
          })
    }

    render() {
        const { user, users, loading} = this.props
        return (
            <div>
                <List
                    loading={loading}
                    rowKey={"id"}
                    itemLayout="horizontal"
                    dataSource={users}
                    renderItem={(item: any) => {
                        const actions = []
                        if (user.id) {
                            actions.push( <a key={`e${item.id}`}><Icon type="edit" theme="filled"  onClick={() => {this.setEdit(item, true)}} /></a>,
                                            <DeleteNews>
                                                {({deleteNews}) => 
                                                    <a key={`m${item.id}`}>
                                                        <Icon type="delete" theme="filled"  onClick={() => { this.performDelete(deleteNews, item.id, item.category) }} />
                                                    </a>}
                                            </DeleteNews>
                                        )
                        }
                        return (
                            <List.Item  actions={actions} >
                                <List.Item.Meta
                                    avatar={ item.isAdmin ? 
                                                <Icon type="smile" theme="twoTone" />
                                                :
                                                <Icon type="user" />
                                            }
                                    title={`${item.name}  ${item.lastname}`}
                                    description={`${item.group}`}
                                />
                            </List.Item>
                    )}
                }
                />
                {/* <Modal
                    centered
                    destroyOnClose={true}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <ViewNews itemID={this.state.item} />
                </Modal>
                <Drawer
                    width={400}
                    visible={this.state.edit}
                    onClose={() => this.setEdit('', false)}
                    destroyOnClose
                >
                    <EditNewsComponent onFinish={this.onFinish} original={this.state.editItem} />
                </Drawer> */}
            </div> 
        )
    } 
}
