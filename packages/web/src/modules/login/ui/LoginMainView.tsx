import * as React from 'react'
import { Form as AntForm, Icon, Button } from 'antd'
import  { withFormik, FormikProps, Field, Form } from 'formik'
import { Link } from 'react-router-dom'

import { MainLogo } from '../../images/Logo'
// import SvgLogo from '../../images/mainLogo'
import { loginSchema } from '@aaxadmin/common'
import { InputField } from '../../shared/InputField'

const FormItem = AntForm.Item

interface FormValues {
    email: string
    password: string
}

interface Props {
    onFinish: () => void
    submit: (values: FormValues) => Promise< { [key: string]: string } | null >
}

export class P extends React.PureComponent<FormikProps<FormValues> & Props> {    
  render() {
    return (
        <div style={{marginTop: 30}}>
        <div style={{margin: 15}}>
            <MainLogo style={{ fontSize: '128px' }} />
        </div>
    <Form style={{display: 'flex'}}>
        <div style={{width: 400, margin: 'auto'}}>
            <Field 
                name="email" 
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} /> as any} 
                placeholder="Email" 
                component={InputField} 
            />
            <Field 
                name="password" 
                type="password" 
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} /> as any} 
                placeholder="Contraseña" 
                component={InputField} 
            />
            <FormItem>
                <Link to="/forgot">Recordar contraseña</Link>
            </FormItem>
            <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
                Iniciar sesión!
            </Button>
            </FormItem>
            <FormItem>
            o <Link to="/register">regístrate aquí</Link>
            </FormItem>
        </div>
      </Form>
      </div>
    )
  }
}

export const LoginMainView = withFormik<Props, FormValues>({
    validationSchema: loginSchema,
    validateOnBlur: false,
    validateOnChange: false,
    mapPropsToValues: () => ({ email: '', password: ''}),
    handleSubmit: async (values, {props, setErrors, setSubmitting}) => {
        const errors = await props.submit(values)
        if (errors) { setErrors(errors) }
        else { props.onFinish() }
    }
})(P)
