/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangePasswordMutation
// ====================================================

export interface ChangePasswordMutation_changePassword {
  __typename: "AuthPayload";
  token: string | null;
  error: string | null;
}

export interface ChangePasswordMutation {
  changePassword: ChangePasswordMutation_changePassword;
}

export interface ChangePasswordMutationVariables {
  newPassword: string;
  key: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ConfirmEmailMutation
// ====================================================

export interface ConfirmEmailMutation_confirmEmail {
  __typename: "AuthPayload";
  token: string | null;
  error: string | null;
}

export interface ConfirmEmailMutation {
  confirmEmail: ConfirmEmailMutation_confirmEmail;
}

export interface ConfirmEmailMutationVariables {
  key: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ForgotPasswordMutation
// ====================================================

export interface ForgotPasswordMutation_sendForgotPasswordEmail {
  __typename: "AuthPayload";
  token: string | null;
  error: string | null;
}

export interface ForgotPasswordMutation {
  sendForgotPasswordEmail: ForgotPasswordMutation_sendForgotPasswordEmail;
}

export interface ForgotPasswordMutationVariables {
  email: string;
}

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

export interface SignUpUserMutation_signUpUser {
  __typename: "RegisterPayload";
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
