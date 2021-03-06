import * as React from 'react'
import { FieldProps } from 'formik'
import { Input, CheckBox } from 'react-native-elements'

const errStyle = { color: 'red'}

export class InputField extends React.Component<FieldProps<any> & {
    options: string[]
} > {
    onChangeText = (text: string) => {
        const {form: {setFieldValue}, field: {name}} = this.props
        setFieldValue(name, text)
    }
    render() {
        const { field, form: { touched, errors }, options, ...props } = this.props
        const errorMsg = touched[field.name] && errors[field.name]

        return (
            <React.Fragment>
            options.map
                <CheckBox
                    title=''
                    checked={false}
                />
            </React.Fragment>
        )
    
    }
}