import * as React from 'react'
import { Form as AntForm, Icon, Button } from 'antd'
import  { withFormik, FormikProps, Field, Form } from 'formik'
import { Link } from 'react-router-dom'
import { loginSchema } from '@aaxadmin/common'
import { InputField } from '../../shared/InputField';

const FormItem = AntForm.Item

interface FormValues {
    email: string
    password: string
}

interface Props {
    onFinish: () => void
    submit: (values: FormValues) => Promise< { [key: string]: string } | null >
}

export class C extends React.PureComponent<FormikProps<FormValues> & Props> {    
  render() {
    return (
        <div style={{marginTop: 30}}>
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
            <Button type="primary" htmlType="submit" className="login-form-button">
                Iniciar sesión!
            </Button>
            </FormItem>
            <FormItem>
            <Link to="/forgot">Recordar contraseña</Link> o <Link to="/register">regístrate aquí</Link>
            </FormItem>
        </div>
      </Form>
      </div>
    )
  }
}

export const LoginView = withFormik<Props, FormValues>({
    validationSchema: loginSchema,
    validateOnBlur: false,
    validateOnChange: false,
    mapPropsToValues: () => ({ email: '', password: ''}),
    handleSubmit: async (values, {props, setErrors, setSubmitting}) => {
        const errors:any = await props.submit(values)
        console.log('Response from login mutation after controller: ', errors)
        if (errors.error === '@loginUser: eMail not verified') { setErrors({email: 'Tu email no está verificado. Te hemos enviado otro para confirmar tu dirección. Si no te ha llegado por favor contacta con el servicio técnico'}) }
        else { props.onFinish() }
    }
})(C)
