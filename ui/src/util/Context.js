import React, { Component } from 'react';
import Cookies from 'js-cookie';
import UserConnector from '../connectors/UserConnector';

const Context = React.createContext();

export class Provider extends Component {
  state = {
    authenticatedUser: Cookies.get('authenticatedUser') ? JSON.parse(Cookies.get('authenticatedUser')) : null,
  };

  constructor() {
    super();
    this.UserConn = new UserConnector();
  }

  render() {
    const authenticatedUser = this.state.authenticatedUser;
    const value = {
      authenticatedUser,
      data: this.UserConn,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    );
  }

  /**
   * Signs the user in by retrieving the user's details, setting the authenticatedUser state and browser cookies
   * @param {String} emailAddress 
   * @param {String} password 
   * @returns {Object} user
   */
  signIn = async (emailAddress, password) => {

    const response = await this.UserConn.AuthUser(emailAddress, password);

    if (response) {
      if (response.status === 200) {
        this.setState(
          { authenticatedUser: { ...response.data.Item } }, // Update state
          () => {
            // Callback runs after the state update
            Cookies.set('authenticatedUser', JSON.stringify(this.state.authenticatedUser), { expires: 1 });
          }
        );
      }
    }
    return response;
  }

  /**
   * Signs the user out by setting a null authenticated user and removing cookies
   */
  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */
export function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

const contextObjects = { withContext, Context };
export default contextObjects;