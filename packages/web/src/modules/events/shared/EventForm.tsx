import * as React from 'react'
import { Form as AntForm, Button, Select, Row, Col } from 'antd'
import  { Formik, Field, Form, FormikActions } from 'formik'
import * as moment from 'moment'
import { UserGroup, venuesQuery } from '@aaxadmin/controller';
import { ImageFile } from 'react-dropzone'
import { Query } from 'react-apollo'


import { InputField } from '../../shared/InputField'
import { InputTextAreaField } from '../../shared/InputTextAreaField'
import { SelectField } from '../../shared/SelectField'
import { CheckBoxField } from '../../shared/CheckBoxField'
import { DropzoneField } from '../../shared/DropzoneField'
import { DatePickerField } from '../../shared/DatePickerField'
import { SelectSearchField } from '../../shared/SelectSearchField'

const FormItem = AntForm.Item
const Option = Select.Option

export interface EventFormValues {
    title: string
    subtitle: string
    body: string
    image?: ImageFile | null
    imageURL?: string
    date: string
    target: UserGroup
    deleteUpon: boolean
    venue: string
}

export const defaultEventFormValues = {
            title: '',
            subtitle: '',
            body: '',
            image: null,
            imageURL: '',
            date: moment().add(2, 'day').format(),
            featured: false,
            target: UserGroup.PUBLIC,
            deleteUpon: true,
            venue: ''
}
interface EditNewsFormProps {
    initialValues?: EventFormValues
    onFinish?: any
    submit: (values: EventFormValues, actions: FormikActions<EventFormValues>) => void
    buttonText?: string
    submitting: boolean
}

export class EventForm extends React.PureComponent<EditNewsFormProps> {
    
    handleChangeTarget(value: boolean) { console.log(`selected ${value}`) }
    disabledDate(current: any) {
        // Can not select days before today and today
        return current && current < moment().add(1, 'day');
    }  
    finish = () => {
        this.props.onFinish()
    }
    render() {
        const {submit, initialValues=defaultEventFormValues} = this.props
        return (
            <Formik<{}, EventFormValues> 
                initialValues={initialValues} 
                onSubmit={submit}
            >
                { ({ setFieldValue, values }) => (
                    <Form style={{display: 'flex'}}>
                        <div style={{width: 400, margin: 'auto'}}>
                        <FormItem label="Título" style={{marginBottom: 0}}>
                            <Field 
                                name="title" 
                                placeholder="Título" 
                                component={InputField} 
                            />
                        </FormItem>
                        <FormItem label="Subtítulo" style={{marginBottom: 0}}>
                            <Field
                                name="subtitle"
                                placeholder="Subtítulo"
                                component={InputField}
                            />
                        </FormItem>
                        <FormItem label="Texto" style={{marginBottom: 0}}>
                            <Field
                                name="body"
                                placeholder=""
                                component={InputTextAreaField}
                            />
                        </FormItem>
                        <FormItem label="Imagen" style={{marginBottom: 0}}>
                            <Field name="image" component={DropzoneField} />
                        </FormItem>
                        <Row gutter={8}>
                            <Col span={12}>
                                <FormItem label="Fecha" style={{marginBottom: 0}}>
                                    <Field
                                        name="date"
                                        onBlur={console.log('_')}
                                        showToday={false}
                                        value={moment(values.date)}
                                        defaultValue={moment().add(2, 'day')}
                                        format="YYYY-MM-DD"
                                        disabledDate={(current:any) => current && current < moment()}
                                        onChange={(newValue: any, newString: string) => setFieldValue('date', newString)}
                                        component={DatePickerField}
                                        />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="Eliminar automáticamente" style={{marginBottom: 0}}>
                                    <Field  name="deleteUpon" 
                                            defaultChecked={true}
                                            component={CheckBoxField}
                                    />
                                </FormItem>
                            </Col>
                        </Row>
                        <FormItem label="Recinto" style={{marginBottom: 0}}>
                            <p>@{values.venue}</p>
                            <Query query={venuesQuery}>
                                {
                                    ({ loading, error, data }) => {
                                        if (loading) {return <div>Fetching</div>}
                                        if (error) {return <div>Error</div>}
                                        const venues = data.venues
                                        return (
                                            <Field  name="changedVenue" 
                                                    component={SelectSearchField}
                                                    showSearch
                                                    placeholder="Cambiar recinto"
                                                    optionFilterProp="children"
                                                    filterOption={(input: any, option: any) => {
                                                        if (typeof option.props.children === 'string') {
                                                            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                        }
                                                        return null
                                                    }}
                                            >
                                                { venues.map((venue: any) => <Option key={venue.id} value={venue.id}>{venue.name}</Option>) }
                                            </Field>
                                        )
                                        }
                                }
                            </Query>
                        </FormItem>
                        <FormItem label="Difusión" style={{marginBottom: 0}}>
                            <Field  name="target"
                                    component={SelectField}
                            >
                                <Option value={UserGroup.PUBLIC}>Público</Option>
                                <Option value={UserGroup.STAFF}>Staff</Option>
                                <Option value={UserGroup.STUDENT}>Estudiante</Option>
                            </Field>
                        </FormItem>
                        <FormItem>
                            <Row gutter={12}>
                                <Col span={12}>
                                    <Button type="primary" 
                                            loading={this.props.submitting}
                                            htmlType="submit" 
                                            className="login-form-button"
                                            block
                                    >
                                        {this.props.buttonText || "OK"}
                                    </Button>
                                </Col>
                                <Col span={12}>
                                    <Button type="default"
                                            block
                                            onClick={this.finish}
                                            >
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
