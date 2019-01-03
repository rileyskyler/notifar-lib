export interface IGraphQLResponseRoot {
  data?: IRootQuery | IRootMutation;
  errors?: Array<IGraphQLResponseError>;
}

export interface IGraphQLResponseError {
  /** Required for all errors */
  message: string;
  locations?: Array<IGraphQLResponseErrorLocation>;
  /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
  [propName: string]: any;
}

export interface IGraphQLResponseErrorLocation {
  line: number;
  column: number;
}

export interface IRootQuery {
  __typename: 'RootQuery';
  locations: Array<ILocation>;
  users: Array<IUser>;
  devices: Array<IDevice>;
}

export interface ILocation {
  __typename: 'Location';
  _id: string | null;
  longitude: string;
  latitude: string;
}

export interface IUser {
  __typename: 'User';
  _id: string | null;
  name: string;
}

export interface IDevice {
  __typename: 'Device';
  _id: string | null;
  tel: string;
}

export interface IRootMutation {
  __typename: 'RootMutation';
  createLocation: ILocation | null;
  createUser: IUser | null;
  createDevice: IDevice | null;
}

export interface ICreateLocationOnRootMutationArguments {
  locationInput: ILocationInput;
}

export interface ICreateUserOnRootMutationArguments {
  userInput: IUserInput;
}

export interface ICreateDeviceOnRootMutationArguments {
  deviceInput: IDeviceInput;
}

export interface ILocationInput {
  longitude: string;
  latitude: string;
}

export interface IUserInput {
  name: string;
}

export interface IDeviceInput {
  tel: string;
}