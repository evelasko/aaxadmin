import * as React from 'react'
import { Form as AntForm, Icon, Button } from 'antd'
import  { withFormik, FormikProps, Field, Form } from 'formik'
import { validPasswordSchema } from '@aaxadmin/common'
import { ChangePasswordMutationVariables } from '@aaxadmin/controller'

import { InputField } from '../../shared/InputField'

const FormItem = AntForm.Item

interface FormValues {
    newPassword: string
}

interface Props {
    onFinish: () => void
    key: string
    submit: (values: ChangePasswordMutationVariables) => Promise< { [key: string]: string } | null >
}

export class F extends React.PureComponent<FormikProps<FormValues> & Props> {    
  render() {
    return (
    <Form style={{display: 'flex'}}>
        <div style={{width: 400, margin: 'auto'}}>
            <Field 
                name="password" 
                type="password" 
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} /> as any} 
                placeholder="New password" 
                component={InputField} 
            />  
            <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Change Password
                </Button>
            </FormItem>
        </div>
      </Form>
    )
  }
}

export const ChangePasswordView = withFormik<Props, FormValues>({
    validationSchema: validPasswordSchema,
    mapPropsToValues: () => ({ newPassword: ''}),
    handleSubmit: async ({newPassword}, {props, setErrors, setSubmitting}) => {
        const errors = await props.submit({newPassword, key: props.key})
        if (errors) { setErrors(errors) }
        else { props.onFinish() }
    }
})(F)