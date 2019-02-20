import * as React from 'react'
import { Form as AntForm, Button, Select, Row, Col } from 'antd'
import  { Formik, Field, Form, FormikActions } from 'formik'
import * as moment from 'moment'
import { NewsCategory, UserGroup } from '@aaxadmin/controller';
import { ImageFile } from 'react-dropzone'

import { InputField } from '../../shared/InputField'
import { InputTextAreaField } from '../../shared/InputTextAreaField'
import { SelectField } from '../../shared/SelectField'
import { CheckBoxField } from '../../shared/CheckBoxField'
import { DropzoneField } from '../../shared/DropzoneField'
import { DatePickerField } from '../../shared/DatePickerField'

const FormItem = AntForm.Item
const Option = Select.Option

export interface NewsFormValues {
    title: string
    subtitle: string
    body: string
    image?: ImageFile | null
    imageURL?: string
    expiration: string
    category: NewsCategory
    featured: boolean
    target: UserGroup
    deleteUpon: boolean
    published?: boolean
}

export const defaultNewsFormValues = {
            title: '',
            subtitle: '',
            body: '',
            image: null,
            imageURL: '',
            expiration: moment().add(2, 'day').format(),
            category: NewsCategory.NEWS,
            featured: false,
            target: UserGroup.PUBLIC,
            deleteUpon: true,
            published: false
}

interface EditNewsFormProps {
    initialValues?: NewsFormValues
    onFinish?: any
    submit: (values: NewsFormValues, actions: FormikActions<NewsFormValues>) => void
    cat?: any
    buttonText?: string
    submitting: boolean
}

export class NewsForm extends React.PureComponent<EditNewsFormProps> {
    
    handleChangeCategory(value: any) { console.log(`selected ${value}`) }
    handleChangeTarget(value: boolean) { console.log(`selected ${value}`) }
    disabledDate(current: any) {
        // Can not select days before today and today
        return current && current < moment().add(1, 'day');
    }  
    finish = () => {
        this.props.onFinish()
    }
    render() {
        const {submit, initialValues=defaultNewsFormValues} = this.props
        return (
            <Formik<{}, NewsFormValues> 
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
                        <Row gutter={8}>
                            <Col span={12}>
                                {this.props.cat && (<FormItem label="Categoría" style={{marginBottom: 0}}>
                                    <Field  name="category"
                                            component={SelectField}
                                    >
                                        <Option value={NewsCategory.NEWS}>News</Option>
                                        <Option value={NewsCategory.ALERT}>Alert</Option>
                                        <Option value={NewsCategory.CALL}>Call</Option>
                                    </Field>
                                </FormItem>)}
                            </Col>
                            <Col span={12}>
                                <FormItem label="Difusión" style={{marginBottom: 0}}>
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
