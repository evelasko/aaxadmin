import { UserGroups } from '@aaxadmin/common';
import { NewsCategory, UserGroup, withCreateNews, WithCreateNews } from '@aaxadmin/controller';
import { Button, Col, Form as AntForm, Row, Select } from 'antd';
import { Field, Form, Formik, FormikActions } from 'formik';
import * as moment from 'moment';
import * as React from 'react';
import { ImageFile } from 'react-dropzone';
import { RouteComponentProps } from 'react-router-dom';
import { CheckBoxField } from '../../shared/CheckBoxField';
import { DatePickerField } from '../../shared/DatePickerField';
import { DropzoneField } from '../../shared/DropzoneField';
import { InputField } from '../../shared/InputField';
import { InputTextAreaField } from '../../shared/InputTextAreaField';
import { SelectField } from '../../shared/SelectField';


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
    state = { submitting: false }

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
        this.setState({submitting: true})
        const response = await this.props.createNews(values)
        setSubmitting(false)
        console.log('RESPONSE FROM FORM SUBMISSION: ', response)
        this.props.onFinish()
        this.setState({submitting: false})
        resetForm()
        console.log('finished')
    }
    finish = (values: FormValues, {setSubmitting, resetForm}: FormikActions<FormValues>) => {
        setSubmitting(false)
        resetForm()
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
                category: NewsCategory.NEWS,
                featured: false,
                target: UserGroup.PUBLIC,
                deleteUpon: true,
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
                        <FormItem label="Texto" style={{marginBottom: 0}}>
                            <Field
                                name="body"
                                placeholder=""
                                component={InputTextAreaField}
                            />
                        </FormItem>
                        <FormItem label="Imagen" style={{marginBottom: 0}}>
                            <Field
                                name="image"
                                component={DropzoneField}
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
                                        <Option value={UserGroup.PUBLIC}>{UserGroups[UserGroup.PUBLIC][0]}</Option>
                                        <Option value={UserGroup.STAFF}>{UserGroups[UserGroup.STAFF][0]}</Option>
                                        <Option value={UserGroup.STUDENT}>{UserGroups[UserGroup.STUDENT][0]}</Option>
                                    </Field>
                        </FormItem>
                        <FormItem>
                            <Row gutter={12}>
                                <Col span={12}>
                                    <Button type="primary" 
                                            loading={this.state.submitting}
                                            htmlType="submit" 
                                            className="login-form-button"
                                            block
                                    >
                                        Crear Noticia
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

export const CreateNews = withCreateNews(N)
