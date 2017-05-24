import React, { Component } from 'react';
import StoreForm from './StoreForm';
import { Link } from 'react-router-dom';
import controllable from 'react-controllables';
import PropTypes from 'prop-types';

class EditStore extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPresses);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPresses);
  }

  handleKeyPresses = e => {
    const { history } = this.props;

    // escape key
    if (e.keyCode === 27) {
      history.push('/');
    }
  };

  handleDelete = () => {
    const { onChange, name } = this.props;

    if (window.confirm(`Delete ${name}?`)) {
      onChange(null);
    }
  };

  render() {
    const { name, value, onChange } = this.props;

    return (
      <div ref="container" className="container-fluid">
        <h2 className="page-header">Edit: <em>{name}</em></h2>

        <StoreForm value={value} onChange={onChange}/>

        <hr />

        <div className="text-center">
          <Link className="btn btn-warning" style={{ margin: 6 }} to="/">
            <i className="fa fa-arrow-left"/> Back
          </Link>

          <button className="btn btn-danger" style={{ margin: 6 }} onClick={this.handleDelete}>
            <i className="fa fa-save"/> Delete
          </button>
        </div>
      </div>
    );
  }
}

export default controllable(EditStore, [ 'value' ]);