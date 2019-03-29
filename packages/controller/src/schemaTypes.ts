/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MeQuery
// ====================================================

export interface MeQuery_me_user {
  __typename: "User";
  id: string;
  name: string | null;
  lastname: string | null;
  email: string | null;
  group: UserGroup;
  isAdmin: boolean | null;
}

export interface MeQuery_me {
  __typename: "UserPayload";
  user: MeQuery_me_user | null;
  error: string | null;
}

export interface MeQuery {
  me: MeQuery_me | null;
}

/* tslint:disable */
/* eslint-disable */
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
  key?: string | null;
  newPassword: string;
}

/* tslint:disable */
/* eslint-disable */
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
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateEventMutation
// ====================================================

export interface CreateEventMutation_createEvent {
  __typename: "Event";
  id: string;
}

export interface CreateEventMutation {
  createEvent: CreateEventMutation_createEvent;
}

export interface CreateEventMutationVariables {
  title: string;
  subtitle?: string | null;
  body: string;
  image?: any | null;
  date: any;
  target?: UserGroup | null;
  deleteUpon?: boolean | null;
  venue: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateNewsMutation
// ====================================================

export interface CreateNewsMutation_createNews {
  __typename: "News";
  id: string;
}

export interface CreateNewsMutation {
  createNews: CreateNewsMutation_createNews;
}

export interface CreateNewsMutationVariables {
  title: string;
  subtitle?: string | null;
  body: string;
  image?: any | null;
  expiration?: any | null;
  category?: NewsCategory | null;
  featured?: boolean | null;
  target?: UserGroup | null;
  deleteUpon?: boolean | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateVenueMutation
// ====================================================

export interface CreateVenueMutation_createVenue {
  __typename: "Venue";
  id: string;
}

export interface CreateVenueMutation {
  createVenue: CreateVenueMutation_createVenue;
}

export interface CreateVenueMutationVariables {
  name: string;
  address?: string | null;
  placeID?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteEventMutation
// ====================================================

export interface DeleteEventMutation_deleteEvent {
  __typename: "Event";
  id: string;
}

export interface DeleteEventMutation {
  deleteEvent: DeleteEventMutation_deleteEvent;
}

export interface DeleteEventMutationVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteNewsMutation
// ====================================================

export interface DeleteNewsMutation_deleteNews {
  __typename: "News";
  id: string;
}

export interface DeleteNewsMutation {
  deleteNews: DeleteNewsMutation_deleteNews;
}

export interface DeleteNewsMutationVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteVenueMutation
// ====================================================

export interface DeleteVenueMutation_deleteVenue {
  __typename: "AuthPayload";
  token: string | null;
  error: string | null;
}

export interface DeleteVenueMutation {
  deleteVenue: DeleteVenueMutation_deleteVenue;
}

export interface DeleteVenueMutationVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditEventMutation
// ====================================================

export interface EditEventMutation_updateEvent {
  __typename: "AuthPayload";
  token: string | null;
  error: string | null;
}

export interface EditEventMutation {
  updateEvent: EditEventMutation_updateEvent;
}

export interface EditEventMutationVariables {
  id: string;
  data: UpdateEventInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditNewsMutation
// ====================================================

export interface EditNewsMutation_updateNews {
  __typename: "News";
  id: string;
}

export interface EditNewsMutation {
  updateNews: EditNewsMutation_updateNews;
}

export interface EditNewsMutationVariables {
  id: string;
  data: UpdateNewsInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditVenueMutation
// ====================================================

export interface EditVenueMutation_updateVenue {
  __typename: "AuthPayload";
  token: string | null;
  error: string | null;
}

export interface EditVenueMutation {
  updateVenue: EditVenueMutation_updateVenue;
}

export interface EditVenueMutationVariables {
  id: string;
  data: UpdateVenueInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AlertsQuery
// ====================================================

export interface AlertsQuery_alerts_author {
  __typename: "User";
  id: string;
  name: string | null;
}

export interface AlertsQuery_alerts {
  __typename: "News";
  id: string;
  title: string;
  published: boolean | null;
  featured: boolean | null;
  target: UserGroup | null;
  expiration: any;
  body: string;
  author: AlertsQuery_alerts_author;
  category: NewsCategory | null;
  deleteUpon: boolean | null;
}

export interface AlertsQuery {
  alerts: (AlertsQuery_alerts | null)[];
}

export interface AlertsQueryVariables {
  query?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllNewsQuery
// ====================================================

export interface AllNewsQuery_allNews_author {
  __typename: "User";
  id: string;
  name: string | null;
}

export interface AllNewsQuery_allNews {
  __typename: "News";
  id: string;
  title: string;
  published: boolean | null;
  featured: boolean | null;
  target: UserGroup | null;
  expiration: any;
  body: string;
  author: AllNewsQuery_allNews_author;
  category: NewsCategory | null;
  imageURL: string | null;
  deleteUpon: boolean | null;
}

export interface AllNewsQuery {
  allNews: (AllNewsQuery_allNews | null)[];
}

export interface AllNewsQueryVariables {
  query?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CallsQuery
// ====================================================

export interface CallsQuery_calls_author {
  __typename: "User";
  id: string;
  name: string | null;
}

export interface CallsQuery_calls {
  __typename: "News";
  id: string;
  title: string;
  published: boolean | null;
  featured: boolean | null;
  target: UserGroup | null;
  expiration: any;
  body: string;
  author: CallsQuery_calls_author;
  category: NewsCategory | null;
  imageURL: string | null;
  deleteUpon: boolean | null;
}

export interface CallsQuery {
  calls: (CallsQuery_calls | null)[];
}

export interface CallsQueryVariables {
  query?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EventsQuery
// ====================================================

export interface EventsQuery_events_author {
  __typename: "User";
  id: string;
  name: string | null;
}

export interface EventsQuery_events_venue {
  __typename: "Venue";
  name: string;
  placeID: string | null;
}

export interface EventsQuery_events {
  __typename: "Event";
  id: string;
  title: string;
  target: UserGroup | null;
  author: EventsQuery_events_author;
  date: any;
  imageURL: string | null;
  venue: EventsQuery_events_venue;
}

export interface EventsQuery {
  events: (EventsQuery_events | null)[];
}

export interface EventsQueryVariables {
  query?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NewsQuery
// ====================================================

export interface NewsQuery_newses_author {
  __typename: "User";
  id: string;
  name: string | null;
}

export interface NewsQuery_newses {
  __typename: "News";
  id: string;
  title: string;
  published: boolean | null;
  featured: boolean | null;
  target: UserGroup | null;
  expiration: any;
  body: string;
  author: NewsQuery_newses_author;
  category: NewsCategory | null;
  imageURL: string | null;
  deleteUpon: boolean | null;
}

export interface NewsQuery {
  newses: (NewsQuery_newses | null)[];
}

export interface NewsQueryVariables {
  query?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: VenuesQuery
// ====================================================

export interface VenuesQuery_venues {
  __typename: "Venue";
  id: string;
  name: string;
  address: string | null;
  placeID: string | null;
}

export interface VenuesQuery {
  venues: (VenuesQuery_venues | null)[];
}

export interface VenuesQueryVariables {
  query?: string | null;
}

/* tslint:disable */
/* eslint-disable */
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
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ConfirmGroupRequest
// ====================================================

export interface ConfirmGroupRequest_confirmGroupRequest {
  __typename: "AuthPayload";
  token: string | null;
  error: string | null;
}

export interface ConfirmGroupRequest {
  confirmGroupRequest: ConfirmGroupRequest_confirmGroupRequest;
}

export interface ConfirmGroupRequestVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
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
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LogoutMutation
// ====================================================

export interface LogoutMutation_logoutUser {
  __typename: "AuthPayload";
  error: string | null;
  token: string | null;
}

export interface LogoutMutation {
  logoutUser: LogoutMutation_logoutUser;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignUpUserMutation
// ====================================================

export interface SignUpUserMutation_signUpUser {
  __typename: "AuthPayload";
  token: string | null;
  error: string | null;
}

export interface SignUpUserMutation {
  signUpUser: SignUpUserMutation_signUpUser;
}

export interface SignUpUserMutationVariables {
  email: string;
  password: string;
  name: string;
  lastname: string;
  groupRequest?: UserGroup | null;
  nID?: string | null;
  nIDType?: nIdType | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UsersQuery
// ====================================================

export interface UsersQuery_users {
  __typename: "User";
  id: string;
  name: string | null;
  lastname: string | null;
  group: UserGroup;
  isAdmin: boolean | null;
  groupRequest: UserGroup | null;
}

export interface UsersQuery {
  users: UsersQuery_users[];
}

export interface UsersQueryVariables {
  query?: string | null;
  group?: UserGroup | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum NewsCategory {
  ALERT = "ALERT",
  CALL = "CALL",
  NEWS = "NEWS",
}

export enum UserGroup {
  PUBLIC = "PUBLIC",
  STAFF = "STAFF",
  STUDENT = "STUDENT",
}

export enum nIdType {
  NATIONALID = "NATIONALID",
  OTHER = "OTHER",
  PASSPORT = "PASSPORT",
  SOCIALSECURITY = "SOCIALSECURITY",
}

export interface UpdateEventInput {
  title?: string | null;
  subtitle?: string | null;
  body?: string | null;
  image?: any | null;
  imageURL?: string | null;
  date?: any | null;
  target?: UserGroup | null;
  published?: boolean | null;
  deleteUpon?: boolean | null;
  venue?: string | null;
}

export interface UpdateNewsInput {
  title?: string | null;
  subtitle?: string | null;
  body?: string | null;
  image?: any | null;
  imageURL?: string | null;
  expiration?: any | null;
  category?: NewsCategory | null;
  featured?: boolean | null;
  target?: UserGroup | null;
  deleteUpon?: boolean | null;
  published?: boolean | null;
}

export interface UpdateVenueInput {
  name?: string | null;
  address?: string | null;
  placeID?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
