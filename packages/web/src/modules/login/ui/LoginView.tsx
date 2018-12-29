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
    submit: (values: FormValues) => Promise< { [key: string]: string } | null >
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
                placeholder="Password" 
                component={InputField} 
            />
            <FormItem>
            <a className="login-form-forgot" href="">Forgot password</a>
            </FormItem>
            <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
                Login
            </Button>
            </FormItem>
            <FormItem>
            Or <Link to="/register">sign up!</Link>
            </FormItem>
        </div>
      </Form>
    )
  }
}

export const LoginView = withFormik<Props, FormValues>({
    validationSchema: loginSchema,
    validateOnBlur: false,
    validateOnChange: false,
    mapPropsToValues: () => ({ email: '', password: ''}),
    handleSubmit: async (values, {props, setErrors, setSubmitting}) => {
        const errors = await props.submit(values)
        if (errors) { setErrors(errors) }
    }
})(C)