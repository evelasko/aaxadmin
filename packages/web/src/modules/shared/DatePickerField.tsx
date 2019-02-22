import { DatePicker, Form } from 'antd';
import { FieldProps } from 'formik';
import * as React from 'react';

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
                />
            </FormItem>
        )
    }