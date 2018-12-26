import * as React from 'react'
import { Form, Input } from 'antd'
import { FieldProps } from 'formik'

export const InputField: React.SFC<FieldProps<any> & { prefix: React.ReactNode }> = ({
    field,
    form: { touched, errors },
    ...props
}) => {
    const errorMsg = touched[field.name] && errors[field.name]
    return (
        <Form.Item help={errorMsg}  validateStatus={errorMsg ? 'error' : undefined}>
            <Input {...field} {...props} />
        </Form.Item>
    )
}