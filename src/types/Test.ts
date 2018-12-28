// tslint:disable
// graphql typescript definitions

export declare namespace GQL {
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

  interface IRootMutation {
    __typename: 'RootMutation';
    createUser: IUser | null;
  }

  interface ICreateUserOnRootMutationArguments {
    userInput: IUserInput;
  }

  interface IUserInput {
    name: string;
  }

  interface ILocationInput {
    longitude: string;
    latitude: string;
  }
}

// tslint:enable
