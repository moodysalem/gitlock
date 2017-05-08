import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import passwordStrength from '../util/password-strength';

const strToClass = str => {
  const strength = passwordStrength(str);
  if (strength === 0) {
    return null;
  } else if (strength < 2) {
    return 'has-error';
  } else if (strength < 5) {
    return 'has-warning';
  } else {
    return 'has-success';
  }
};

export default class PasswordForm extends PureComponent {
  static contextTypes = {};
  static propTypes = {
    confirm: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.object
  };
  static defaultProps = {};

  focusPassword = () => this.refs.password.select();

  render() {
    const { confirm, onChange, value = {}, ...rest } = this.props;
    const { password = '', confirmPassword = '' } = value;
    const changed = data => onChange({ ...value, ...data });

    return (
      <form {...rest}>
        <div className={cx('form-group', strToClass(password))}>
          <label htmlFor="password">{confirm ? 'Set Password' : 'Enter Password'}</label>
          <input type="password" id="password" className="form-control" value={password}
                 placeholder="Password" ref="password" required
                 onChange={({ target: { value: password } }) => changed({ password })}/>
        </div>

        {
          confirm ? (
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input type="password" id="confirm-password" className="form-control" value={confirmPassword}
                     placeholder="Confirm Password" required
                     onChange={({ target: { value: confirmPassword } }) => changed({ confirmPassword })}/>
            </div>
          ) : null
        }

        <button className="btn btn-primary" type="submit"
                disabled={(confirm && password !== confirmPassword) || password.length < 1}>
          <i className="fa fa-key"/> Unlock
        </button>
      </form>
    );
  }
}