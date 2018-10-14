import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class PersonsTable extends Component {

    constructor(props) {

        super(props)
    }

    render() {

        return (
          <div className="container is-fluid">
          <table className = 'table table is-bordered is-striped is-narrow is-hoverable is-fullwidth'>
              <thead>
                <tr>
                  <th>id</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Telephone</th>
                  <th>Edit</th>
                </tr>
              </thead>

              <tbody>
                {
                  this.props.persons.map(person => {

                    return (
                      <tr key={person.id}>
                        <td>{person.id}</td>
                        <td>{person.firstname}</td>
                        <td>{person.lastname}</td>
                        <td>{person.telephone}</td>
                        <td>
                          <Link to={'/update_person?id=' + person.id}>
                            <FontAwesomeIcon className="has-text-black" icon='edit' />
                          </Link>
                        </td>
                      </tr>
                    )
                  })
                }

              </tbody>

            </table>
          </div>
        )
    }
}
