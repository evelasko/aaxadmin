import * as React from 'react'
import { FormikActions } from 'formik'
import * as _ from 'lodash'

import { editVenueMutation } from '@aaxadmin/controller'
import { VenueForm, VenueFormValues } from '../shared/VenueForm'
import { client } from '../../../apollo'

interface EditVenueComponentProps {
    onFinish?: any
    original: any
}

export class EditVenueComponent extends React.PureComponent<EditVenueComponentProps> {
    state = {initialValues: undefined, submitting: false} 

    componentWillMount() {
        const { original } = this.props
        const initialValues = _.omit(original, ['id'])
        console.log('Initial values: ', initialValues)
        this.setState({initialValues})
    }
    setSubmitting() {
        this.setState({submitting: true})
    }
 
    render() {
        const { onFinish, original } = this.props
        return (
            <div>
                <VenueForm 
                    submit={ async(values: VenueFormValues, {resetForm}: FormikActions<VenueFormValues>) => {
                        this.setSubmitting()
                        const omites = ['imageURL'] // server will update image if provided to upload
                        let reValues:any = values
                        if (reValues.__typename) { omites.push('__typename') }
                        reValues = _.omit(values, omites)
                        console.log('reValues: ', reValues)
                        const res = await client.mutate({   mutation: editVenueMutation,
                                                            variables: {id: original.id, data: {...reValues}},
                                                            refetchQueries: ['VenuesQuery']
                                                        })
                        console.log('Response: ', res)
                        resetForm()
                        console.log('about to finish...')
                        onFinish()
                    }} 
                    onFinish={onFinish} 
                    initialValues={this.state.initialValues || {address: '', placeID: '', name: ''}}
                    buttonText="Guardar Cambios"
                    submitting={this.state.submitting}
                /> 
            </div>
        )
    }
}

