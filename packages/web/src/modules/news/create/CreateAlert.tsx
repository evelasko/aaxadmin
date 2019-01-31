import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Form as AntForm, Button, Select, Row, Col } from 'antd'
import  { Formik, Field, Form, FormikActions } from 'formik'
import * as moment from 'moment'
import { withCreateNews, WithCreateNews, NewsCategory, UserGroup } from '@aaxadmin/controller';
import { ImageFile } from 'react-dropzone'

import { InputField } from '../../shared/InputField'
import { InputTextAreaField } from '../../shared/InputTextAreaField'
import { SelectField } from '../../shared/SelectField'
import { CheckBoxField } from '../../shared/CheckBoxField'
import { DatePickerField } from '../../shared/DatePickerField'

const FormItem = AntForm.Item
const Option = Select.Option

interface FormValues {
    title: string
    subtitle: string
    body: string
    image: ImageFile | null
    expiration: string
    category: NewsCategory
    featured: boolean
    target: UserGroup
    deleteUpon: boolean
}

interface ExtraProps {
    onFinish: any
}

export class N extends React.PureComponent<
        RouteComponentProps<{}> & WithCreateNews & ExtraProps> {
    handleChangeCategory(value: any) {
        console.log(`selected ${value}`);
    }
    handleChangeTarget(value: boolean) {
        console.log(`selected ${value}`);
    }
    disabledDate(current: any) {
        // Can not select days before today and today
        return current && current < moment().add(1, 'day');
    }  
    submit = async (values: FormValues, {setSubmitting, resetForm}: FormikActions<FormValues>) => {
        const response = await this.props.createNews(values)
        setSubmitting(false)
        console.log('RESPONSE FROM FORM SUBMISSION: ', response)
        this.props.onFinish()
        resetForm()
        console.log('finished')
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
                expiration: moment().add(2, 'day').format(),
                category: NewsCategory.ALERT,
                featured: false,
                target: UserGroup.PUBLIC,
                deleteUpon: true,
                }} 
                onSubmit={this.submit}
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
                        <FormItem label="Vence" style={{marginBottom: 0}}>
                            <Field
                                name="expiration"
                                onBlur={console.log('_')}
                                showToday={false}
                                value={moment(values.expiration)}
                                defaultValue={moment().add(2, 'day')}
                                format="YYYY-MM-DD"
                                disabledDate={(current:any) => current && current < moment().add(1, 'day')}
                                onChange={(newValue: any, newString: string) => setFieldValue('expiration', newString)}
                                component={DatePickerField}
                                />
                        </FormItem>
                        <Row>
                            <Col span={12}>
                                <FormItem label="Destacado" style={{marginBottom: 0}}>
                                    <Field  name="featured" 
                                            defaultChecked={false}
                                            component={CheckBoxField}
                                    />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="Eliminar cuando expire" style={{marginBottom: 0}}>
                                    <Field  name="deleteUpon" 
                                            defaultChecked={true}
                                            component={CheckBoxField}
                                    />
                                </FormItem>
                            </Col>
                        </Row>
                        <FormItem label="Difusión" style={{marginBottom: 0}}>
                                    <Field  name="target"
                                            component={SelectField}
                                    >
                                        <Option value={UserGroup.PUBLIC}>Public</Option>
                                        <Option value={UserGroup.STAFF}>Staff</Option>
                                        <Option value={UserGroup.STUDENT}>Student</Option>
                                    </Field>
                        </FormItem>
                        <FormItem>
                            <Row gutter={12}>
                                <Col span={12}>
                                    <Button type="primary" 
                                            htmlType="submit" 
                                            className="login-form-button"
                                            block
                                    >
                                        Crear Alerta
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

export const CreateAlert = withCreateNews(N)
