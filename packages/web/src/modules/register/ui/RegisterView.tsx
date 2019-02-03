import * as React from 'react'
import { Form as AntForm, Icon, Button } from 'antd'
import  { withFormik, FormikErrors, FormikProps, Field, Form } from 'formik'
import { validUserSchema } from '@aaxadmin/common'
import { InputField } from '../../shared/InputField'
import { Link } from 'react-router-dom'

const FormItem = AntForm.Item

interface FormValues {
    email: string
    password: string
}

interface Props {
    onFinish: () => void
    submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>
}

export class C extends React.PureComponent<FormikProps<FormValues> & Props> {    
  render() {
    return (
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
                Regístrate!
            </Button>
            </FormItem>
            <FormItem>
            o <Link to="/login">inicia sesión</Link>
            </FormItem>
        </div>
      </Form>
    )
  }
}

export const RegisterView = withFormik<Props, FormValues>({
    validationSchema: validUserSchema,
    mapPropsToValues: () => ({ email: '', password: ''}),
    handleSubmit: async (values, {props, setErrors, setSubmitting}) => {
        const errors = await props.submit(values)
        if (errors) { setErrors(errors) }
        else { props.onFinish() }
    }
})(C)