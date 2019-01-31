import * as React from 'react'
import { Layout, Icon, Row, Col, Input, Drawer } from 'antd'
import { withUser, WithUser } from '@aaxadmin/controller'

import { ContentHandler } from './ContentHandler';
import { FormHandler } from './FormHandler'
import { MenuHandler } from './MenuHandler';
import { ToolBar } from './ToolBar';
import { logoutUser } from '../Logout'

const { Header, Sider, Content } = Layout
const Search = Input.Search

export class BaseLayout extends React.PureComponent<WithUser> {
    state = { collapsed: false, key: 'Noticias', search: '', visible: false, me: null }

    showDrawer = () => { this.setState({ visible: true }) }
    onClose = () => { this.setState({ visible: false }) }    
    handleSearch = (s: any) => { this.setState({search: s.target.value}) }
    toggle = () => { this.setState({ collapsed: !this.state.collapsed }) }

    goLogin = () => { this.setState({key: 'Usuario'}) }
    goLogOut = async () => { 
        const response = await logoutUser()
        console.log('RESPONSE: ', response)
        this.setState({me: null})
    }
    menuHandler = ({key}: any) => { this.setState({key, search: ''}) }
    
    render() {
        const { user } = this.props
        const userLoading = this.props.loading
        if ( userLoading ) { return <Icon type="loading" /> }
        if ( !user ) { console.log('render(): user not logged in') }
        if (user) { 
            console.log('user object from render(): ', user) 
            this.setState({me: user})
        }
        return (
        <div>
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}
                style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0}}
            >
                <div className="logo" />
                <MenuHandler onSelect={this.menuHandler} user={this.state.me} />
            </Sider>
        <Layout style={this.state.collapsed ? {marginLeft: 80} : {marginLeft: 200}}>
            <Header style={{ background: '#fff', padding: 0 }}>
                <Row>
                    <Col span={6}>
                        <Icon className="trigger" style={{padding:10}} type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
                    </Col>
                    <Col span={12} style={{textAlign:'center'}}>
                        <Search placeholder={`buscar ${this.state.key.toLowerCase()}`} onChange={this.handleSearch} style={{ width: 200 }} />
                    </Col>
                    <Col span={6} style={{textAlign:'right'}}>
                        <ToolBar user={this.state.me} showDrawer={this.showDrawer} goLogout={this.goLogOut} />
                    </Col>
                </Row>
            </Header>
            <Content style={{ margin: '10px 10px', padding: 0, minHeight: 280 }} >
                <div style={{width: '100%', overflow: 'scroll'}}>
                    <ContentHandler page={this.state.key} search={this.state.search} user={this.state.me}/>
                </div>
            </Content>
        </Layout>
      </Layout>
      <Drawer title={`Create ${this.state.key}`} placement="right" width={400} closable={false} onClose={this.onClose} visible={this.state.visible}>
        <FormHandler page={this.state.key} user={this.state.me} onFinish={this.onClose} />
      </Drawer>
      </div>
    )
  }
}
export const Main = withUser(BaseLayout)
