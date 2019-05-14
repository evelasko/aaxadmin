import { ConfirmEmailMutationVariables } from '@aaxadmin/controller';
import { Modal, Spin } from 'antd';
import * as React from 'react';

interface Props {
    onFinish: () => void
    key: string
    cl: string
    submit: (values: ConfirmEmailMutationVariables) => Promise< { [key: string]: string } | null >
}

export class F extends React.PureComponent<Props> {
    async componentDidMount() {
        const res = await this.props.submit({key: this.props.cl})
        if (!res) { 
            let secondsToGo = 5;
            const modal = Modal.success({
                title: 'Email Confirmado!',
                content: `En ${secondsToGo} segundos podrás iniciar sesión.`,
            });
            const timer = setInterval(() => {
                secondsToGo -= 1;
                modal.update({
                content: `En ${secondsToGo} segundos podrás iniciar sesión.`,
                });
            }, 1000);
            setTimeout(() => {
                clearInterval(timer);
                modal.destroy();
                this.props.onFinish()
            }, secondsToGo * 1000);             
        }
    }
    render() {
        return (
            <div style={{width: '100%', marginTop: 150, flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              <div style={{alignContent: 'center'}}><Spin size="large" style={{marginLeft: 100, alignSelf: 'center'}} /></div>
            </div>
        )
  }
}

export const ConfirmEmailView = (F)