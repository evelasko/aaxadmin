import * as React from 'react'
import { Form as AntForm, Button, Row, Col, Divider } from 'antd'
import  { Formik, Field, Form, FormikActions } from 'formik'

import { InputField } from '../../shared/InputField'
import { PlacesField } from '../../shared/PlacesField'

const FormItem = AntForm.Item

export interface VenueFormValues {
    name: string
    address: string
    placeID: string
}

export const defaultVenueFormValues = { name: '', address: '', placeID: '' }

interface EditVenueFormProps {
    initialValues: VenueFormValues
    onFinish?: any
    submit: (values: VenueFormValues, actions: FormikActions<VenueFormValues>) => void
    buttonText?: string
    submitting: boolean
}

export class VenueForm extends React.PureComponent<EditVenueFormProps> {
    state = { submitting: false, address: null, placeID: null }

    finish = () => {
        this.props.onFinish()
    }

    render() {
        const {submit, initialValues=defaultVenueFormValues} = this.props
        return (
            <Formik<{}, VenueFormValues> 
                initialValues={initialValues} 
                onSubmit={submit}
            >
                { ({ setFieldValue, values }) => (
                    <Form style={{display: 'flex'}}>
                    <div style={{width: 400, margin: 'auto'}}>
                    <FormItem label="Recinto">
                        <Field 
                            name="name" 
                            placeholder="Nombre del Recinto" 
                            component={InputField} 
                        />
                    </FormItem>
                    <Divider />
                    <FormItem label="Buscar  Recinto en Google">
                        < Field name="searchPlace" 
                                component={PlacesField} 
                                handleAddress={(address:string, placeID: string) => {
                                    setFieldValue("address", address)
                                    setFieldValue("placeID", placeID)
                                }}
                        />
                    </FormItem>
                    <FormItem label="Address">
                        <Field
                            name="address"
                            placeholder="Venue Custom Address"
                            component={InputField}
                            onChange={(e:any) => {
                                setFieldValue("address", e.target.value)
                                setFieldValue("placeID", null)
                            }}
                        />
                    </FormItem>
                    <FormItem>
                        <Row gutter={12}>
                            <Col span={12}>
                                <Button type="primary" 
                                        loading={ this.props.submitting }
                                        htmlType="submit" 
                                        className="login-form-button"
                                >
                                Editar Recinto
                                </Button>
                            </Col>
                            <Col span={12}>
                                <Button type="default" block onClick={this.finish} >
                                    Cancelar
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
