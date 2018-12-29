// tslint:disable
// graphql typescript definitions

export declare namespace GraphqlType {
  interface IGraphQLResponseRoot {
    data?: IRootQuery | IRootMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IRootQuery {
    __typename: 'RootQuery';
    locations: Array<ILocation>;
    users: Array<IUser>;
    devices: Array<IDevice>;
  }

  interface ILocation {
    __typename: 'Location';
    _id: string | null;
    longitude: string;
    latitude: string;
  }

  interface IUser {
    __typename: 'User';
    _id: string | null;
    name: string;
  }

  interface IDevice {
    __typename: 'Device';
    _id: string | null;
    tel: string;
  }

  interface IRootMutation {
    __typename: 'RootMutation';
    createLocation: ILocation | null;
    createUser: IUser | null;
    createDevice: IDevice | null;
  }

  interface ICreateLocationOnRootMutationArguments {
    locationInput: ILocationInput;
  }

  interface ICreateUserOnRootMutationArguments {
    userInput: IUserInput;
  }

  interface ICreateDeviceOnRootMutationArguments {
    deviceInput: IDeviceInput;
  }

  interface ILocationInput {
    longitude: string;
    latitude: string;
  }

  interface IUserInput {
    name: string;
  }

  interface IDeviceInput {
    tel: string;
  }
}

// tslint:enable
