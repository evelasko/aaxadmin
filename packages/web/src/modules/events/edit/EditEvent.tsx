import * as React from 'react'
import { FormikActions } from 'formik'
import { Modal } from 'antd'
import * as moment from 'moment'
import * as _ from 'lodash'

import { editEventMutation } from '@aaxadmin/controller'
import { EventForm, EventFormValues } from '../shared/EventForm'
import { client } from '../../../apollo'

interface EditEventComponentProps {
    onFinish?: any
    original: any
}

export class EditEventComponent extends React.PureComponent<EditEventComponentProps> {
    state = {initialValues: undefined, submitting: false} 
    componentWillMount() {
        const { original } = this.props
        const initialValues = _.omit(original, ['id', 'author'])
        initialValues.image = null
        initialValues.venue = original.venue.name
        if (moment(initialValues.date).isBefore()) {
            this.expirationWarning()
        }
        console.log('Initial values: ', initialValues)
        this.setState({initialValues})
    }
    setSubmitting() {
        this.setState({submitting: true})
    }
    expirationWarning = () => {
        Modal.warning({
          title: '¡Atención!',
          content: `El evento que va a editar ya ha sucedido...  por favor verifique la fecha del evento antes de confirmar la edición.`,
        })
    }
 
    render() {
        const { onFinish, original } = this.props
        return (
            <div>
                <EventForm 
                    submit={ async(values: EventFormValues, {resetForm}: FormikActions<EventFormValues>) => {
                        this.setSubmitting()
                        const omites = ['imageURL'] // server will update image if provided to upload
                        let reValues:any = values
                        if (reValues.image === null ) { omites.push('image') }
                        if (reValues.__typename) { omites.push('__typename') }
                        if (reValues.changedVenue) {
                            reValues.venue = reValues.changedVenue
                            omites.push('changedVenue')
                        } else { omites.push('venue')}
                        reValues = _.omit(values, omites)
                        console.log('Original ID:', original.id)
                        console.log('reValues: ', reValues)
                        const res = await client.mutate({   mutation: editEventMutation,
                                                            variables: {id: original.id, data: {...reValues}},
                                                            refetchQueries: ['EventsQuery']
                                                        })
                        console.log('Response: ', res)
                        resetForm()
                        onFinish()
                    }} 
                    onFinish={onFinish} 
                    initialValues={this.state.initialValues}
                    buttonText="Guardar Cambios"
                    submitting={this.state.submitting}
                /> 
            </div>
        )
    }
}

