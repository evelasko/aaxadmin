import * as React from 'react'
import { FieldProps } from 'formik'
import { Form, DatePicker } from 'antd'

const FormItem = Form.Item

export const DatePickerField: React.SFC<
    FieldProps<any> & {
        prefix: React.ReactNode
        label: string
    }
    > = ({
        field: {onChange, ...field},
        form: { touched, errors, setFieldValue },
        label,
        ...props
    }) => {
        const errorMsg = touched[field.name] && errors[field.name]
        return (
            <FormItem
                label={ label }
                help={ errorMsg }
                validateStatus={ errorMsg ? 'error' : undefined }
            >
                <DatePicker
                    {...field}
                    {...props}
                    // onChange={ (newValue: any) => setFieldValue(field.name, newValue.format('YYYY-MM-DD')) }
                />
            </FormItem>
        )
    }