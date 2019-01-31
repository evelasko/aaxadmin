import * as React from 'react'
import { withFormik, FormikErrors, FormikProps, Field } from 'formik'
import { loginSchema } from '@aaxadmin/common'
import { View, Text } from 'react-native'
import { Card, Button } from 'react-native-elements'
import { InputField } from '../../shared/InputField'

interface FormValues {
    email: string
    password: string
}

interface Props {
    onFinish: () => void
    submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>
}

export class L extends React.PureComponent<FormikProps<FormValues> & Props> {    
  render() {
      const { handleSubmit } = this.props
    return (
        <View style={{flex: 1, display: "flex", justifyContent: "center"}}>
            <Card>
                <Text style={{fontSize:30, marginBottom:10}}>Login</Text>
                <Field 
                    name="email" 
                    placeholder="Email"
                    component={InputField} 
                    containerStyle={{width: "100%"}}
                    autoCapitalize="none"
                />
                <Field 
                    name="password" 
                    secureTextEntry={true} 
                    placeholder="Password" 
                    component={InputField} 
                    containerStyle={{width: "100%"}}
                />
                <Button 
                    style={{marginBottom:30, marginTop:30}}
                    title="submit" 
                    onPress={handleSubmit as any} />
            </Card>
        </View>
    )
  }
}

export const LoginView = withFormik<Props, FormValues>({
    validationSchema: loginSchema,
    mapPropsToValues: () => ({ email: '', password: ''}),
    handleSubmit: async (values, { props, setErrors }) => {
        const errors = await props.submit(values)
        if (errors) { return setErrors(errors) }
        props.onFinish()
    }
})(L)