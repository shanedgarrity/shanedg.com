import React, { Component } from 'react';
import './Employer.css';

import SimpleDateRange from './SimpleDateRange';

class Employer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    // This binding is necessary to make `this` work in the callback
    this.toggleRoleDetails = this.toggleRoleDetails.bind(this);
  }

  toggleRoleDetails() {
    this.setState((prevState) => ({
      open: !prevState.open
    }));
  }

  render() {
    return (
      <section className="section employer">
        <h3 className="h3 employer-name">{this.props.jobDetails.employerName}</h3>
        
        <SimpleDateRange dates={this.props.jobDetails.dates} />
        
        <div className="role-body">
          <h4 className="h4 role-title">{this.props.jobDetails.roleTitle}</h4>
          <p className="p tldr"><strong className="strong tldr">tl;dr</strong> &mdash; {this.props.jobDetails.highlightsBlurb}</p>

          <button className="button toggle-role-details" onClick={this.toggleRoleDetails}>{this.state.open ? 'Hide' : 'See'} responsibilities and projects...</button>

          <div className="responsibilities-projects" style={{'display': this.state.open ? 'block' : 'none'}}>
            {/* RESPONSIBILITIES */}
            {this.props.jobDetails.responsibilities &&
              <section className="section responsibilities">
                <h5>responsibilities:</h5>
                <ul>
                  {this.props.jobDetails.responsibilities.map((responsibilityDescription, index) => {
                    return <li key={index}>{responsibilityDescription}</li>
                  })}
                </ul>
              </section>
            }
            
            {/* PROJECTS */}
            {this.props.jobDetails.projects &&
              <section className="section projects">
                <h5>projects:</h5>
                <ul>
                  {this.props.jobDetails.projects.map((projectDescription, index) => {
                    return <li key={index}>{projectDescription}</li>
                  })}
                </ul>
              </section>
            }
          </div>
        </div>
      </section>
    );
  }
}

export default Employer;