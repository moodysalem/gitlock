import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import Textarea from 'react-textarea-autosize';


export default class StoreForm extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.object.isRequired
  };
  static defaultProps = {};

  handleChange = data => this.props.onChange({ ...this.props.value, ...data });

  state = { itemName: '' };
  changeItemName = ({ target: { value: itemName } }) => this.setState({ itemName });
  addItem = () => {
    const { itemName } = this.state;

    if (itemName !== 'key' && itemName.trim().length > 0 && !this.props.value[ itemName.trim() ]) {
      this.setState({ itemName: '' }, () => this.handleChange({ [itemName]: '' }));
    }
  };

  render() {
    const { value, onChange, ...rest } = this.props;
    const { itemName } = this.state;

    return (
      <form {...rest} onSubmit={e => e.preventDefault()}>
        {
          _.map(
            value,
            (data, key) => (
              <div key={key} className="form-group">
                <label>{key}</label>
                <div className="display-flex">
                  <div className="flex-grow-1">
                    <Textarea
                      className="form-control" value={data}
                      placeholder={key}
                      onChange={({ target: { value: data } }) => this.handleChange({ [key]: data })}/>
                  </div>
                  <div style={{ marginLeft: 10 }}>
                    <button type="button" className="btn btn-danger"
                            onClick={() => onChange(_.omit(value, key))}>
                      <i className="fa fa-trash"/> Delete
                    </button>
                  </div>
                </div>
              </div>
            )
          )
        }

        { _.keys(value).length > 0 ? <hr /> : null }

        <div className="display-flex">
          <div className="flex-grow-1">
            <input
              type="text" className="form-control" placeholder="Item Name" value={itemName}
              onKeyDown={({ keyCode }) => keyCode === 13 && this.addItem()}
              onChange={this.changeItemName}/>
          </div>
          <div className="flex-shrink-0" style={{ marginLeft: 20 }}>
            <button type="button" className="btn btn-primary" onClick={this.addItem}>
              <i className="fa fa-list"/> Add Item
            </button>
          </div>
        </div>
      </form>
    );
  }
}