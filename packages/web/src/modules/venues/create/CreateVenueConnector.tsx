import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Form as AntForm, Button, Row, Col } from 'antd'
import  { Formik, Field, Form, FormikActions } from 'formik'

import { withCreateVenue, WithCreateVenue } from '@aaxadmin/controller';

// import { PlacesField } from '../../shared/PlacesField'
import { LocationField } from '../../shared/LocationField'
import { InputField } from '../../shared/InputField'

const FormItem = AntForm.Item

interface FormValues {
    name: string
    address: string
    placeID: string
}
interface ExtraProps {
    onFinish: any
}
export class V extends React.PureComponent<
        RouteComponentProps<{}> & WithCreateVenue & ExtraProps> {

    finish = () => {
        this.props.onFinish()
    }
    submit = async (values: FormValues, {setSubmitting, resetForm}: FormikActions<FormValues>) => {
        console.log('values: ', values)
        await this.props.createVenue(values)
        setSubmitting(false)
        this.props.onFinish()
        resetForm()
    }
    render() {
        return (
            <Formik<{}, FormValues> initialValues={{
                name: '',
                address: '',
                placeID: ''
                }} 
                onSubmit={this.submit}
            >
                { ({ setFieldValue, values }) => (
                    <Form style={{display: 'flex'}}>
                        <div style={{width: 400, margin: 'auto'}}>
                        <FormItem label="Name">
                            <Field 
                                name="name" 
                                placeholder="Venue Name" 
                                component={InputField} 
                            />
                        </FormItem>
                        <FormItem label="Address">
                            <Field
                                name="address"
                                placeholder="Venue Custom Address"
                                component={InputField}
                            />
                        </FormItem>
                        <FormItem label="Google Place ID">
                            <Field
                                name="placeID"
                                placeholder="Place ID from Google"
                                component={InputField}
                            />
                        </FormItem>
                        <FormItem label="Search Place">
                            <Field
                                name="place"
                                component={LocationField}
                            />
                        </FormItem>
                        <FormItem>
                            <Row gutter={12}>
                                <Col span={12}>
                                    <Button type="primary" 
                                            htmlType="submit" 
                                            className="login-form-button"
                                    >
                                    Create Venue
                                    </Button>
                                </Col>
                                <Col span={12}>
                                <Button type="default"
                                            block
                                            onClick={this.finish}
                                            >
                                        Cancel
                                    </Button>
                                </Col>
                            </Row>
                        </FormItem>
                        </div>
                    </Form>
                )
            }
            </Formik>
        )
    }
}

export const CreateVenueConnector = withCreateVenue(V)