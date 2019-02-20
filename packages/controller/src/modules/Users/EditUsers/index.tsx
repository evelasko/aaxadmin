// @ts-ignore
// import * as React from 'react'
// import gql from 'graphql-tag'
// import { Mutation, MutationFn } from 'react-apollo'
// import { UpdateUserByIdMutation, UpdateUserByIdMutationVariables } from 'src/schemaTypes';

// export const updateUserByIdMutation = gql`
// mutation UpdateUserByIdMutation( $id: ID!, $userGroup: UserGroup, $isAdmin: Boolean )
//     { updateUserByAdmin (id: $id, data: { group: $userGroup,  isAdmin: $isAdmin} )
//         { token error } 
//     }
// `

// export interface WithEditUserById {
//     editUser: MutationFn<UpdateUserByIdMutation, UpdateUserByIdMutationVariables>
// }

// interface Props {
//     children: (data: WithEditUserById) => JSX.Element | null
// }

// export class EditUserById extends React.PureComponent<Props> {
//     render() {
//         const { children } = this.props
//         return (
//             <Mutation<UpdateUserByIdMutation, UpdateUserByIdMutationVariables>
//                 mutation={updateUserByIdMutation}
//                 refetchQueries={['UsersQuery']}
//             >
//             {(mutate) => {
//                 return children({editUser: mutate})
//             }}
//             </Mutation>
//         )
//     }
// }