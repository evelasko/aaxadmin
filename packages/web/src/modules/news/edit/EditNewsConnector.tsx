import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import  { FormikActions } from 'formik'

import { NewsFormValues, NewsForm, defaultNewsFormValues } from '../shared/NewsForm'

interface ExtraProps {
    onFinish: any
    newsID: any
}

export class EditNews extends React.PureComponent<RouteComponentProps<{}> & ExtraProps> {
    
    state = {submitting: false}
    
    submit = async (values: NewsFormValues, {setSubmitting, resetForm}: FormikActions<NewsFormValues>) => {
        this.setState({submitting: true})
        console.log('New Edit News Form Values: ', values)
        // const response = await this.props.createNews(values)
        // setSubmitting(false)
        // console.log('RESPONSE FROM FORM SUBMISSION: ', response)
        // this.props.onFinish()
        // resetForm()
        // console.log('finished')
    }
    finish = () => {
        this.props.onFinish()
    }
    render() {
        return (

            <NewsForm 
                submit={this.submit} 
                onFinish={this.finish} 
                initialValues={{...defaultNewsFormValues}}
                submitting={this.state.submitting}
            />
        )
    }
}
