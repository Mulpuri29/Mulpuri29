import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { userAPI } from './api/userAPI';

export class App extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
    };

    this.onLoadTables = this.onLoadTables.bind(this);
  }

  onLoadTables() {
    this.setState({
      users: [],
    });

    trackPromise(
      userAPI.fetchUsers()
        .then((users) => {
          this.setState({users: users.results})
        })
    );
  }

// Input for the Singer/Celebrity
  // getInputText = e => {
  //   const textValue = e.target.value;
  //   console.log("this is the value of text value:", textValue)
  // }

  render() {
    const { users } = this.state;
    let data = [];
    data = users && users.length > 0 ? users : "";
    const data_table = data.length>0 ? (
      data.map(users =>{
        return(
          <tr key={users.trackId}>
            <td> {users.artistName} </td>
            <td> {users.trackName} </td>
            <td> {users.trackPrice} </td>
            <td> {users.releaseDate.slice(0,10)} </td>
            <td> {users.primaryGenreName} </td>
          </tr>
        )
      })
    ): null

    const tableTitle = data.length>0 ? (
      data.map(users =>{
        return(
          <div key={users.trackId}>
            {
              users.wrapperType === "audiobook" ? 
              <div className="title is-3 is-left padding-b">
                Name of the Album: {users.artistName}
              </div> :""
            }
          </div>
        )
      })
    ): null
    return (
      <div className="container">
        <h1 className = "title has-text-centered main-title"> Artist Track Details </h1>
        {/* Code for input singer/Celebrity */}
        {/* <div className="control text-value">
          <input className = "input" type="text" onChange={this.getInputText} placeholder = "Enter the Singer/Celebrity Name" />
        </div> */}
        {tableTitle}
        <button className="button is-danger padding-b" onClick={this.onLoadTables}>Show Records</button>
        <table className="table margin-t is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th> Artist Name </th>
              <th> Track Name </th>
              <th> Track Price </th>
              <th> Release Date </th>
              <th> Primary Genre Name </th>
            </tr>
          </thead>
          <tbody>
            {
              data_table
            }
          </tbody>
        </table>
      </div>
    );
  }
}
