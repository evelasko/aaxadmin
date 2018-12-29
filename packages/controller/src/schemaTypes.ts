/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginUserMutation
// ====================================================

export interface LoginUserMutation_loginUser {
  __typename: "AuthPayload";
  token: string | null;
  error: string | null;
}

export interface LoginUserMutation {
  loginUser: LoginUserMutation_loginUser;
}

export interface LoginUserMutationVariables {
  email: string;
  password: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignUpUserMutation
// ====================================================

export interface SignUpUserMutation_signUpUser_user {
  __typename: "User";
  id: string;
}

export interface SignUpUserMutation_signUpUser {
  __typename: "RegisterPayload";
  user: SignUpUserMutation_signUpUser_user | null;
  token: string | null;
  error: string | null;
}

export interface SignUpUserMutation {
  signUpUser: SignUpUserMutation_signUpUser;
}

export interface SignUpUserMutationVariables {
  email: string;
  password: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
