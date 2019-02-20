import * as React from 'react'
import { Form as AntForm, Icon, Button, Select, Tooltip } from 'antd'
import  { withFormik, FormikErrors, FormikProps, Field, Form } from 'formik'
import { validUserSchema, UserGroups } from '@aaxadmin/common'
import { Link } from 'react-router-dom'
import { UserGroup } from '@aaxadmin/controller'

import { SelectField } from '../../shared/SelectField'
import { InputField } from '../../shared/InputField'

const FormItem = AntForm.Item
const Option = Select.Option

interface FormValues {
    email: string
    password: string
    name: string
    lastname: string
    groupRequest: UserGroup
}

interface Props {
    onFinish: () => void
    submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>
}

export class C extends React.PureComponent<FormikProps<FormValues> & Props> {    
  render() {
    return (
    <Form style={{display: 'flex', marginTop: 20}}>
        <div style={{width: 400, margin: 'auto'}}>
            <Field 
                name="email" 
                prefix={<Icon type="user" /> as any} 
                placeholder="Email" 
                component={InputField} 
            />
            <Field 
                name="password" 
                type="password" 
                prefix={<Icon type="lock" /> as any} 
                placeholder="Contraseña" 
                component={InputField} 
            />
            <Field 
                name="name" 
                prefix={<Icon type="idcard" /> as any} 
                placeholder="Nombre Completo" 
                component={InputField} 
            />
            <Field 
                name="lastname" 
                prefix={<Icon type="idcard" /> as any} 
                placeholder="Apellidos" 
                component={InputField} 
            />
            <FormItem>
                <Tooltip title="Si elige un grupo diferente a General, la organización evaluará su solicitud y procederá a realizar el cambio.">
                <Field  name="groupRequest" component={SelectField} >
                    <Option value={UserGroup.PUBLIC}>{UserGroups[UserGroup.PUBLIC][0]}</Option>
                    <Option value={UserGroup.STAFF}>{UserGroups[UserGroup.STAFF][0]}</Option>
                    <Option value={UserGroup.STUDENT}>{UserGroups[UserGroup.STUDENT][0]}</Option>
                </Field>
                </Tooltip>
            </FormItem>
            <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
                Regístrate!
            </Button>
            </FormItem>
            <FormItem>
            <Link to="/forgot">Recordar contraseña</Link> o <Link to="/login">inicia sesión</Link>
            </FormItem>
        </div>
      </Form>
    )
  }
}

export const RegisterView = withFormik<Props, FormValues>({
    validationSchema: validUserSchema,
    mapPropsToValues: () => ({ email: '', password: '', name: '', lastname: '', groupRequest: UserGroup.PUBLIC}),
    handleSubmit: async (values, {props, setErrors, setSubmitting}) => {
        const errors = await props.submit(values)
        if (errors) { setErrors(errors) }
        else { props.onFinish() }
    }
})(C)