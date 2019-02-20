import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Form as AntForm, Button, Row, Col, Divider, message } from 'antd'
import  { Formik, Field, Form, FormikActions } from 'formik'

import { withCreateVenue, WithCreateVenue } from '@aaxadmin/controller';

import { PlacesField } from '../../shared/PlacesField'
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

    state = { submitting: false, address: null, placeID: null }

    finish = () => { this.props.onFinish() }

    handleAddressInputChange = (address:string, placeID:string|null) => { 
        console.log('e: ', address)
        this.setState({address, placeID}) }

    submit = async (values: FormValues, {setSubmitting, resetForm}: FormikActions<FormValues>) => {
        this.setState({submitting:true})
        values.address = this.state.address || values.address
        values.placeID = this.state.placeID || values.placeID
        const res = await this.props.createVenue(values)
        this.setState({submitting: false})
        this.props.onFinish()
        resetForm()
        if (res.data.createVenue.id) { message.success('Recinto creado') } 
        else { message.error('No se ha podido crear el recinto') }
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
                                    handleAddress={this.handleAddressInputChange}
                            />
                        </FormItem>
                        <FormItem label="Address">
                            <Field
                                name="address"
                                placeholder="Venue Custom Address"
                                component={InputField}
                                value={this.state.address}
                                onChange={(e:any) => this.handleAddressInputChange(e.target.value,null)}
                            />
                        </FormItem>
                        <FormItem>
                            <Row gutter={12}>
                                <Col span={12}>
                                    <Button type="primary" 
                                            loading={ this.state.submitting }
                                            htmlType="submit" 
                                            className="login-form-button"
                                    >
                                    Crear Recinto
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

export const CreateVenueConnector = withCreateVenue(V)
