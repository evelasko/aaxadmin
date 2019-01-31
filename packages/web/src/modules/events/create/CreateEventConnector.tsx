import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Form as AntForm, Button, Select, Row, Col } from 'antd'
import  { Formik, Field, Form, FormikActions } from 'formik'
import { Query } from 'react-apollo'
import * as moment from 'moment'
import { withCreateEvent, WithCreateEvent, UserGroup, venuesQuery } from '@aaxadmin/controller';
import { ImageFile } from 'react-dropzone'

import { InputField } from '../../shared/InputField'
import { SelectField } from '../../shared/SelectField'
import { CheckBoxField } from '../../shared/CheckBoxField'
import { DropzoneField } from '../../shared/DropzoneField'
import { DatePickerField } from '../../shared/DatePickerField'
import { InputTextAreaField } from '../../shared/InputTextAreaField';
import { SelectSearchField } from '../../shared/SelectSearchField'

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
    disabledDate(current: any) {
        // Can not select days before today and today
        return current && current < moment().add(1, 'day');
    }  
    submit = async (values: FormValues, {setSubmitting, resetForm}: FormikActions<FormValues>) => {
        const response = await this.props.createEvent(values)
        setSubmitting(false)
        this.props.onFinish()
        resetForm()
        console.log('RESPONSE from CREATE VENT FORM: ', response.data.createEvent)
    }
    finish = () => {
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
            >
                { ({ setFieldValue, values }) => (
                    <Form style={{display: 'flex'}}>
                        <div style={{width: 400, margin: 'auto'}}>
                        <FormItem label="Title" style={{marginBottom: 0}}>
                            <Field 
                                name="title" 
                                placeholder="Título" 
                                component={InputField} 
                            />
                        </FormItem>
                        <FormItem label="Subtitle" style={{marginBottom: 0}}>
                            <Field
                                name="subtitle"
                                placeholder="Subtítulo"
                                component={InputField}
                            />
                        </FormItem>
                        <FormItem label="Body" style={{marginBottom: 0}}>
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
                        <Row>
                            <Col span={12}>
                                <FormItem label="Date" style={{marginBottom: 0}}>
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
                                <FormItem label="Delete upon expiration" style={{marginBottom: 0}}>
                                    <Field  name="deleteUpon" 
                                            defaultChecked={true}
                                            component={CheckBoxField}
                                    />
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={12}>
                                <FormItem label="Venue" style={{marginBottom: 0}}>
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
                                                            placeholder="Select venue"
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
                                <FormItem label="Target" style={{marginBottom: 0}}>
                                    <Field  name="target"
                                            component={SelectField}
                                    >
                                        <Option value={UserGroup.PUBLIC}>Public</Option>
                                        <Option value={UserGroup.STAFF}>Staff</Option>
                                        <Option value={UserGroup.STUDENT}>Student</Option>
                                    </Field>
                                </FormItem>
                            </Col>
                        </Row>
                        <FormItem>
                            <Row gutter={12}>
                                <Col span={12}>
                                    <Button type="primary" 
                                            htmlType="submit" 
                                            className="login-form-button"
                                    >
                                        Create Event
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

export const CreateEventConnector = withCreateEvent(E)