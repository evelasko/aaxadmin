import * as React from 'react'
import { List, Icon, Modal, Drawer } from 'antd'
import * as moment from 'moment'
import { MutationFn } from 'react-apollo'

import { DeleteNews } from '@aaxadmin/controller'
import { Categories, UserGroups } from '@aaxadmin/common'

import { ViewNews } from '../view/ViewNews'
import { EditNewsComponent } from '../edit/EditNews'

const confirm = Modal.confirm

interface DataProps {
    loading: boolean
    news: any
    user: any
}

export class FindNewsList extends React.PureComponent<DataProps> {
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
            title: `¿Estás seguro que deseas eliminar esta ${Categories[cat][1]}?`,
            content: 'Una vez eliminada no se podrá recuperar',
            okText: 'Si',
            okType: 'danger',
            cancelText: 'No',
            onOk() { deleteNews({variables: {id}}) },
            onCancel() { console.log('Delete canceled') },
          })
    }

    render() {
        const { user, news, loading} = this.props
        return (
            <div>
                <List
                    loading={loading}
                    rowKey={"id"}
                    itemLayout="horizontal"
                    dataSource={news}
                    renderItem={(item: any) => {
                        const actions = [ <a key={`v${item.id}`}><Icon type="eye" theme="filled" onClick={() => {this.setState({ visible: true, item: item.id })}} /></a> ]
                        if (user && item.author.id === user.id) {
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
                            <List.Item  actions={actions}
                                        extra={ user && user.isAdmin ?
                                            <div style={{fontSize: '.8em', marginTop:5}}>
                                                <Icon type="user" style={{padding: '0px 5px 0px 0px'}} />
                                                    {item.author.name}
                                                <Icon type="clock-circle" style={{padding:'0px 5px 0px 5px'}} /> 
                                                <span style={moment(item.expiration).isBefore() ? {color: '#f17a61'} : {} }>
                                                    {moment(item.expiration).format('DD-MM-YY HH:mm')}
                                                </span>
                                                <Icon type="team" style={{padding: '0px 5px 0px 5px'}} />
                                                {UserGroups[item.target][0]}
                                                {item.featured && <Icon type="star" theme="filled" style={{padding: '0px 5px 0px 5px'}} />}
                                            </div>
                                            :
                                            <div />
                                            }
                            >
                                <List.Item.Meta
                                    title={item.title}
                                    description={`${item.body.substring(0, 100)}...`}
                                />
                            </List.Item>
                    )}
                }
                />
                <Modal
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
                </Drawer>
            </div> 
        )
    } 
}
