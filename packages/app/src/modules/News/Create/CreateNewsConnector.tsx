import * as React from 'react'
import  { Formik, Field } from 'formik'
import { RouteComponentProps } from 'react-router-native'
import { withCreateNews, WithCreateNews } from '@aaxadmin/controller'
import { Text, View, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'

import { InputField } from '../../shared/InputField'

interface FormValues {
    title: string
    subtitle: string
    body: string
    image: string
    expiration: string
    category: string
    featured: boolean
    target: string
    deleteUpon: boolean
}

export class N extends React.PureComponent<
        RouteComponentProps<{}> & WithCreateNews> {

    submit = async (values: FormValues) => {
        console.log('values: ', values)
        // await this.props.createNews(values)
        // setSubmitting(false)
    }
    render() {
        return (
            <Formik<{}, FormValues> initialValues={{
                title: '',
                subtitle: '',
                body: '',
                image: '',
                expiration: '',
                category: '',
                featured: false,
                target: '',
                deleteUpon: true,
                }} 
                onSubmit={this.submit as any}
            >
                { 
                    ({ handleSubmit, setFieldValue }) => 
                    (
                        <View style={{flex: 1, display: "flex", justifyContent: "center"}}>
                            <ScrollView style={{padding: 20, marginTop: 20}}>
                                <Text style={{fontSize:30, marginBottom:10}}>Create News</Text>
                                <Field 
                                    name="title" 
                                    placeholder="Title"
                                    component={InputField} 
                                    containerStyle={{width: "100%"}}
                                    autoCapitalize="none"
                                />
                                <Field 
                                    name="subtitle" 
                                    placeholder="Subtitle"
                                    component={InputField} 
                                    containerStyle={{width: "100%"}}
                                    autoCapitalize="none"
                                />
                                <Field 
                                    name="body" 
                                    placeholder="Body"
                                    component={InputField} 
                                    containerStyle={{width: "100%"}}
                                    autoCapitalize="none"
                                />
                                <Field 
                                    name="expiration" 
                                    placeholder="Expiration"
                                    component={InputField} 
                                    containerStyle={{width: "100%"}}
                                    autoCapitalize="none"
                                />
                                <Field 
                                    name="category" 
                                    placeholder="Category"
                                    component={InputField} 
                                    containerStyle={{width: "100%"}}
                                    autoCapitalize="none"
                                />
                                <Field 
                                    name="target" 
                                    placeholder="Target"
                                    component={InputField} 
                                    containerStyle={{width: "100%"}}
                                    autoCapitalize="none"
                                />
                                <Field 
                                    name="featured" 
                                    component={InputField} 
                                    containerStyle={{width: "100%"}}
                                    autoCapitalize="none"
                                />
                                <Field 
                                    name="deleteUpon" 
                                    component={InputField} 
                                    containerStyle={{width: "100%"}}
                                    autoCapitalize="none"
                                />
                                <Button 
                                    style={{marginBottom:30, marginTop:30}}
                                    title="save news" 
                                    onPress={handleSubmit} />
                            </ScrollView>
                        </View>
                    )
                }
            </Formik>
        )
    }
}

export const CreateNewsConnector = withCreateNews(N)