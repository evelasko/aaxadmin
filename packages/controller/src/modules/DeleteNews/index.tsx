// @ts-ignore
import * as React from 'react'
import gql from 'graphql-tag'
import { Mutation, MutationFn } from 'react-apollo'
import { DeleteNewsMutation, DeleteNewsMutationVariables } from 'src/schemaTypes';

export const deleteNewsMutation = gql`
mutation DeleteNewsMutation( $id: ID! )
    { deleteNews(id: $id) { id } }
`

export interface WithDeleteNews {
    deleteNews: MutationFn<DeleteNewsMutation, DeleteNewsMutationVariables>
}

interface Props {
    children: (data: WithDeleteNews) => JSX.Element | null
}

export class DeleteNews extends React.PureComponent<Props> {
    render() {
        const { children } = this.props
        return (
            <Mutation<DeleteNewsMutation, DeleteNewsMutationVariables>
                mutation={deleteNewsMutation}
                refetchQueries={[   'AllNewsQuery', 
                                    'NewsQuery',
                                    'CallsQuery',
                                    'AlertsQuery']}
            >
            {(mutate) => {
                return children({deleteNews: mutate})
            }}
            </Mutation>
        )
    }
}