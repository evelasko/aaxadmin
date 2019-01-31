import * as React from 'react'
import { FormikActions } from 'formik'
import { Modal } from 'antd'
import * as moment from 'moment'
import * as _ from 'lodash'

import { editNewsMutation } from '@aaxadmin/controller'
import { NewsForm, NewsFormValues } from '../shared/NewsForm'
import { client } from '../../../apollo'

interface EditNewsComponentProps {
    onFinish?: any
    original: any
}

export class EditNewsComponent extends React.PureComponent<EditNewsComponentProps> {
    state = {initialValues: undefined} 

    componentWillMount() {
        const { original } = this.props
        const initialValues = _.omit(original, ['id', 'author'])
        initialValues.image = null
        if (moment(initialValues.expiration).isBefore()) {
            this.expirationWarning()
        }
        console.log('Initial values: ', initialValues)
        this.setState({initialValues})
    }

    expirationWarning = () => {
        Modal.warning({
          title: '¡Atención!',
          content: `La noticia que va a editar está vencida...  por favor verifique la fecha de vencimiento antes de confirmar la edición.`,
        })
    }
 
    render() {
        const { onFinish, original } = this.props
        return (
            <div>
                <NewsForm 
                    submit={ async(values: NewsFormValues, {resetForm}: FormikActions<NewsFormValues>) => {
                        const omites = ['imageURL'] // server will update image if provided to upload
                        let reValues:any = values
                        if (reValues.image === null ) { omites.push('image') }
                        if (reValues.__typename) { omites.push('__typename') }
                        reValues = _.omit(values, omites)
                        const res = await client.mutate({   mutation: editNewsMutation,
                                                            variables: {id: original.id, data: {...reValues}},
                                                            refetchQueries: [   'AllNewsQuery', 
                                                                                'NewsQuery',
                                                                                'CallsQuery',
                                                                                'AlertsQuery',
                                                                                'GetOneNews']
                                                        })
                        console.log('Response: ', res)
                        resetForm()
                        onFinish()
                    }} 
                    onFinish={onFinish} 
                    initialValues={this.state.initialValues}
                    buttonText="Guardar Cambios"
                /> 
            </div>
        )
    }
}

