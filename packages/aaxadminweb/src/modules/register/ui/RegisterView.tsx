import * as React from 'react'
import { Form, Icon, Input, Button } from 'antd'
import  { withFormik, FormikErrors, FormikProps } from 'formik'
import * as yup from 'yup'

interface FormValues {
    email: string
    password: string
}

interface Props {
    submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>
}

export class C extends React.PureComponent<FormikProps<FormValues> & Props> {    
  render() {
      const { values, handleChange, handleBlur, handleSubmit, touched, errors} = this.props
    // console.log(errors)
    return (
    <form style={{display: 'flex'}} onSubmit={handleSubmit}>
        <div style={{width: 400, margin: 'auto'}}>
            <Form.Item 
                help={touched.email && errors.email ? errors.email : ''} 
                validateStatus={touched.email && errors.email ? 'error' : undefined}
            >
                <Input 
                    name="email" 
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                    placeholder="Email" 
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </Form.Item>
            <Form.Item 
                help={touched.password && errors.password ? errors.password : ''}
                validateStatus={touched.password && errors.password ? 'error' : undefined}
                >
                <Input 
                    name="password" 
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" 
                    placeholder="Password" 
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </Form.Item>
            <Form.Item>
            <a className="login-form-forgot" href="">Forgot password</a>
            </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
                Register
            </Button>
            </Form.Item>
            <Form.Item>
            Or <a href="">Log in now!</a>
            </Form.Item>
        </div>
      </form>
    )
  }
}

const emailNotLongEnough = "email must be at least 3 characters"
const passwordNotLongEnough = "password must be at least 3 characters"
const invalidEmail = "email must be a valid email"

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .min(3, emailNotLongEnough)
        .max(255)
        .email(invalidEmail)
        .required(),
    password: yup
        .string()
        .min(8, passwordNotLongEnough)
        .max(255)
        .required()
})

export const RegisterView = withFormik<Props, FormValues>({
    validationSchema,
    mapPropsToValues: () => ({ email: '', password: ''}),
    handleSubmit: async (values, {props, setErrors, setSubmitting}) => {
        const errors = await props.submit(values)
        if (errors) setErrors(errors)
    }
})(C)