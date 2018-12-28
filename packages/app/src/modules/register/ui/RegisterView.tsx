import * as React from 'react'
import { withFormik, FormikErrors, FormikProps, Field } from 'formik'
import { validUserSchema } from '@aaxadmin/common'
import { View, Button } from 'react-native'
import { InputField } from '../../shared/InputField'

interface FormValues {
    email: string
    password: string
}

interface Props {
    submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>
}

export class C extends React.PureComponent<FormikProps<FormValues> & Props> {    
  render() {
      const { handleSubmit } = this.props
    return (
        <View style={{width: 400, margin: 'auto'}}>
            <Field 
                name="email" 
                placeholder="Email"
                component={InputField} 
            />
            <Field 
                name="password" 
                secureTextEntry={true} 
                placeholder="Password" 
                component={InputField} 
            />
            <Button title="submit" onPress={handleSubmit as any} />
        </View>
    )
  }
}

export const RegisterView = withFormik<Props, FormValues>({
    validationSchema: validUserSchema,
    mapPropsToValues: () => ({ email: '', password: ''}),
    handleSubmit: async (values, { props, setErrors }) => {
        const errors = await props.submit(values)
        if (errors) { setErrors(errors) }
    }
})(C)