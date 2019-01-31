// @ts-ignore
import * as React from 'react'
import gql from 'graphql-tag'
import { Mutation, MutationFn } from 'react-apollo'
import { EditNewsMutation, EditNewsMutationVariables } from 'src/schemaTypes';

export const editNewsMutation = gql`
mutation EditNewsMutation($id: ID!, $data:UpdateNewsInput! )
    { updateNews(id: $id, data: $data) { id } }
`

export interface WithEditNews {
    editNews: MutationFn<EditNewsMutation, EditNewsMutationVariables>
}

interface Props {
    children: (data: WithEditNews) => JSX.Element | null
}

export class EditNews extends React.PureComponent<Props> {
    render() {
        const { children } = this.props
        return (
            <Mutation<EditNewsMutation, EditNewsMutationVariables>
                mutation={editNewsMutation}
                refetchQueries={[   'AllNewsQuery', 
                                    'NewsQuery',
                                    'CallsQuery',
                                    'AlertsQuery']}
            >
            {(mutate) => {
                return children({editNews: mutate})
            }}
            </Mutation>
        )
    }
}