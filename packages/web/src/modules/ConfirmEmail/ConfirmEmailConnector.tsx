import { ConfirmEmailController } from '@aaxadmin/controller';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ConfirmEmailView } from './ui/ConfirmEmailView';


export class ConfirmEmailConnector extends React.PureComponent<RouteComponentProps<{key: string}>> {

    onFinish = () => { this.props.history.push('/login') }

    render() {
        return (
            <ConfirmEmailController>
                { 
                    ({submit}) => <ConfirmEmailView 
                                        key={this.props.match.params.key} 
                                        cl={this.props.match.params.key}
                                        onFinish={this.onFinish}
                                        submit={submit}
                                    /> 
                }
            </ConfirmEmailController>
        )
    }
}
