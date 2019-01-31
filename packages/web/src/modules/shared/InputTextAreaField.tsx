import * as React from 'react'
import { Form, Input } from 'antd'
import { FieldProps } from 'formik'

export const InputTextAreaField: React.SFC<FieldProps<any>> = ({
    field,
    form: { touched, errors },
    ...props
}) => {
    const errorMsg = touched[field.name] && errors[field.name]
    return (
        <Form.Item help={errorMsg}  validateStatus={errorMsg ? 'error' : undefined}>
            <Input.TextArea rows={3} {...field} {...props} />
        </Form.Item>
    )
}