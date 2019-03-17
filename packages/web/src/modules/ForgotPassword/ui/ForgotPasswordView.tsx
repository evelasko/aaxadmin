import { Button, Form as AntForm, Icon } from 'antd';
import { Field, Form, FormikProps, withFormik } from 'formik';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { InputField } from '../../shared/InputField';

const FormItem = AntForm.Item

interface FormValues {
    email: string
}

interface Props {
    onFinish: () => void
    submit: (values: FormValues) => Promise< { [key: string]: string } | null >
}

export class F extends React.PureComponent<FormikProps<FormValues> & Props> {    
  render() {
    return (
    <Form style={{display: 'flex', marginTop: 20, padding: 30}}>
        <div style={{width: 400, margin: 'auto'}}>
            <Field 
                name="email" 
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} /> as any} 
                placeholder="indique aquí su email" 
                component={InputField} 
            />
            <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
                Restablecer Contraseña
            </Button>
            <FormItem>
                <Link to="/login">Iniciar Sesión</Link> o <Link to="/register">Registrarse</Link>
            </FormItem>
            </FormItem>
        </div>
      </Form>
    )
  }
}

export const ForgotPasswordView = withFormik<Props, FormValues>({
    mapPropsToValues: () => ({ email: ''}),
    handleSubmit: async (values, {props, setErrors, setSubmitting}) => {
        const errors = await props.submit(values)
        if (errors) { setErrors(errors) }
        else { props.onFinish() }
    }
})(F)