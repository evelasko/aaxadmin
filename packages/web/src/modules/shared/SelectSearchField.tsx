import * as React from 'react'
import { FieldProps } from 'formik'
import { Form, Select } from 'antd'

const FormItem = Form.Item

export const SelectSearchField: React.SFC<
    FieldProps<any> & {
        prefix: React.ReactNode
        label: string
        options: any
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
                <Select 
                    {...field}
                    {...props}
                    onChange={ (newValue: any) => setFieldValue(field.name, newValue) }
                />
            </FormItem>
        )
    }