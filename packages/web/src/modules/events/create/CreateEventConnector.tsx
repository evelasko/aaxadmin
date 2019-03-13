import { UserGroups } from '@aaxadmin/common';
import { UserGroup, venuesQuery, withCreateEvent, WithCreateEvent } from '@aaxadmin/controller';
import { Button, Col, Form as AntForm, Row, Select } from 'antd';
import { Field, Form, Formik, FormikActions } from 'formik';
import * as moment from 'moment';
import * as React from 'react';
import { Query } from 'react-apollo';
import { ImageFile } from 'react-dropzone';
import { RouteComponentProps } from 'react-router-dom';
import { CheckBoxField } from '../../shared/CheckBoxField';
import { DatePickerField } from '../../shared/DatePickerField';
import { DropzoneField } from '../../shared/DropzoneField';
import { InputField } from '../../shared/InputField';
import { InputTextAreaField } from '../../shared/InputTextAreaField';
import { SelectField } from '../../shared/SelectField';
import { SelectSearchField } from '../../shared/SelectSearchField';


const FormItem = AntForm.Item
const Option = Select.Option

interface FormValues {
    title: string
    subtitle: string
    body: string
    image: ImageFile | null
    date: string
    target: UserGroup
    deleteUpon: boolean
    venue: string
}
interface ExtraProps {
    onFinish: any
}
export class E extends React.PureComponent<
        RouteComponentProps<{}> & WithCreateEvent & ExtraProps> {
    
    state = { submitting: false }
            
    disabledDate(current: any) {
        // Can not select days before today and today
        return current && current < moment().add(1, 'day');
    }  
    submit = async (values: FormValues, {setSubmitting, resetForm}: FormikActions<FormValues>) => {
        this.setState({ submitting: true})
        values.date = moment(values.date).utc().format()
        const response = await this.props.createEvent(values)
        console.log('RESPONSE: ', response)
        setSubmitting(false)
        resetForm()
        this.setState({ submitting: false})
        this.props.onFinish()
    }
    finish = (values: FormValues, {setSubmitting, resetForm}: FormikActions<FormValues>) => {
        setSubmitting(false)
        resetForm()
        this.setState({ submitting: false})
        this.props.onFinish()
    }
    render() {
        return (
            <Formik<{}, FormValues> initialValues={{
                title: '',
                subtitle: '',
                body: '',
                image: null,
                date: moment().format(),
                target: UserGroup.PUBLIC,
                deleteUpon: true,
                venue: ''
                }} 
                onSubmit={this.submit}
                onReset={this.finish}
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
                        <FormItem label="Descripción" style={{marginBottom: 0}}>
                            <Field
                                name="body"
                                placeholder=""
                                component={InputTextAreaField}
                            />
                        </FormItem>
                        <FormItem style={{marginBottom: 0}}>
                            <Field
                                name="image"
                                component={DropzoneField}
                            />
                        </FormItem>
                        <Row gutter={8}>
                            <Col span={12}>
                                <FormItem label="Fecha" style={{marginBottom: 0}}>
                                    <Field
                                        name="date"
                                        onBlur={console.log('_')}
                                        showTime={{format: "HH:mm"}}
                                        showToday={false}
                                        placeholder="Seleccione Fecha y Hora"
                                        value={moment(values.date)}
                                        defaultValue={moment().add(2, 'day')}
                                        format="YYYY-MM-DD HH:mm"
                                        disabledDate={(current:any) => current && current < moment()}
                                        onChange={(newValue: any, newString: string) => setFieldValue('date', newString)}
                                        component={DatePickerField}
                                        />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="Eliminar después de la fecha" style={{marginBottom: 0}}>
                                    <Field  name="deleteUpon" 
                                            defaultChecked={true}
                                            component={CheckBoxField}
                                    />
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={12}>
                                <FormItem label="Recinto" style={{marginBottom: 0}}>
                                    <Query query={venuesQuery}>
                                        {
                                            ({ loading, error, data }) => {
                                                if (loading) {return <div>Fetching</div>}
                                                if (error) {return <div>Error</div>}
                                                const venues = data.venues
                                                return (
                                                    <Field  name="venue" 
                                                            component={SelectSearchField}
                                                            showSearch
                                                            placeholder="Seleccione recinto"
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
                            </Col>
                            <Col span={12}>
                                <FormItem label="Difusión" style={{marginBottom: 0}}>
                                    <Field  name="target"
                                            component={SelectField}
                                    >
                                        <Option value={UserGroup.PUBLIC}>{UserGroups[UserGroup.PUBLIC][0]}</Option>
                                        <Option value={UserGroup.STAFF}>{UserGroups[UserGroup.STAFF][0]}</Option>
                                        <Option value={UserGroup.STUDENT}>{UserGroups[UserGroup.STUDENT][0]}</Option>
                                    </Field>
                                </FormItem>
                            </Col>
                        </Row>
                        <FormItem>
                            <Row gutter={12}>
                                <Col span={12}>
                                    <Button type="primary" 
                                            loading={ this.state.submitting }
                                            htmlType="submit" 
                                            className="login-form-button"
                                    >
                                        Crear Evento
                                    </Button>
                                </Col>
                                <Col span={12}>
                                    <Button type="default"
                                                block
                                                htmlType="reset"
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

export const CreateEventConnector = withCreateEvent(E)