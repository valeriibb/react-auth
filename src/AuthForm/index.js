import React from "react";
import PropTypes from "prop-types";

import SignIn from '.././SignIn';
import SignUp from '.././SignUp';
import SignOut from '.././SignOut';
import ForgotPass from '.././ForgotPass';

function AuthForm(props) {
  const [switchForm, setSwitchForm] = React.useState('SignIn');

  function handleSwitchForm(e, formName) {
    setSwitchForm(formName);
  };

  if (props.isAuth) {
    return <SignOut        handleSignOut={(e) => handlerForm(e, props.handleSignOut)}/>;
  } else {
    switch (switchForm) {
      case 'SignIn':
        return <SignIn     handleSwitchForm={handleSwitchForm} handleSignIn={(e) => handlerForm(e, props.handleSignIn)} />
      case 'SignUp':
        return <SignUp     handleSwitchForm={handleSwitchForm} handleSignUp={(e) => handlerForm(e, props.handleSignUp)}/>
      case 'ForgotPass':
        return <ForgotPass handleSwitchForm={handleSwitchForm} handleForgotPass={(e) => handlerForm(e, props.handleForgotPass)}/>
      default:
        return null
    }
  }
}

function handlerForm(e, cb) { //возвращает объект со значениями полей form-ы, и передает их в колбек
  let form = {};

  let formElem = e.currentTarget.form;
  if (formElem) {
      let data = new FormData(formElem);
      for (let pair of data.entries()) {
          form[pair[0]] = pair[1];
      }
  }

  cb && cb(e, form)
  return form;
}

AuthForm.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  handleSignIn: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired,
  handleForgotPass: PropTypes.func.isRequired,
  handleSignOut: PropTypes.func.isRequired
};
AuthForm.defaultProps = {
  isAuth: false,
  handleSignIn: (e, formData) => {},
  handleSignUp: (e, formData) => {},
  handleForgotPass: (e, formData) => {},
  handleSignOut: (e, formData) => {}
};

export default AuthForm;
