import { useState } from 'react';

const errorTexts = {
  required: 'This field is required.',
  email: 'Please enter a valid email address. Eg. name@email.co.uk.',
  name: 'Please enter a valid name. Only letters are allowed.',
};

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const nameRegex = /^[A-Za-z]+$/;

const useForm = (fields, onSubmit) => {
  const initialValues = fields.reduce(
    (obj, field) => ({
      ...obj,
      ...(field.name ? { [field.name]: field.value } : {}),
    }),
    {}
  );
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showErrorSummary, setShowErrorSummary] = useState(false);

  const validate = (values) => {
    let isValid = true;
    let errorChange = { ...errors };
    Object.keys(values).forEach((name) => {
      const rules = fields.find((field) => field.name === name)?.rules || [];

      isValid =
        rules.every((rule) => {
          const val = values[name];
          switch (rule) {
            case 'required':
              if (!val) {
                errorChange = { ...errorChange, [name]: rule };
                return false;
              }
              errorChange = { ...errorChange, [name]: false };
              break;

            case 'email':
              if (val.length && !emailRegex.test(val)) {
                errorChange = { ...errorChange, [name]: rule };
                return false;
              }
              errorChange = { ...errorChange, [name]: false };
              break;

            case 'name':
              if (val.length && !nameRegex.test(val)) {
                errorChange = { ...errorChange, [name]: rule };
                return false;
              }
              errorChange = { ...errorChange, [name]: false };
              break;

            default:
              errorChange = { ...errorChange, [name]: false };
              break;
          }
          return true;
        }) && isValid;
    });
    setErrors(errorChange);
    if (
      Object.keys(errorChange).every((fieldName) => !errorChange[fieldName])
    ) {
      setShowErrorSummary(false);
    }
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (touched[name]) {
      validate({ [name]: value });
    }
  };

  const handleBlur = (e) => {
    const { target } = e;
    const { name, value } = target;
    setTouched({ ...touched, [name]: true });
    validate({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(
      fields.reduce((obj, field) => ({ ...obj, [field.name]: true }), {})
    );
    if (validate(values)) {
      onSubmit(values);
    } else {
      setShowErrorSummary(true);
    }
  };

  const renderField = (field, index) => {
    if (field.type === 'submit') {
      return (
        <div className="form-row button-row" key={index}>
          {showErrorSummary && (
            <div className="error-summary">
              <p className="intro">
                Please address the following errors before submitting.
              </p>
              <ul>
                {Object.keys(errors).map((fieldName) =>
                  errors[fieldName] ? (
                    <li key={fieldName}>
                      <label htmlFor={fieldName}>
                        {
                          fields.find((field) => field.name === fieldName)
                            ?.title
                        }
                        :{' '}
                      </label>
                      {errorTexts[errors[fieldName]]}
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          )}
          <button type="submit">{field.title}</button>
        </div>
      );
    } else {
      return (
        <div className="form-row" key={index}>
          <label htmlFor={field.name}>
            {field.title}
            {field.rules?.includes('required') && (
              <span className="asterisk">
                <span className="access"> Required</span>
              </span>
            )}
          </label>
          {field.type === 'textarea' ? (
            <textarea
              name={field.name}
              id={field.name}
              value={values[field.name]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ) : (
            <input
              type="text"
              name={field.name}
              id={field.name}
              value={values[field.name]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
          {errors[field.name] && (
            <p className="error">{errorTexts[errors[field.name]]}</p>
          )}
        </div>
      );
    }
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit}>
      {fields.some((field) => field.rules?.includes('required')) && (
        <p className="info">
          Fields marked with{' '}
          <span className="asterisk">
            <span className="access">asterisk</span>
          </span>{' '}
          are required.
        </p>
      )}
      {fields.map(renderField)}
    </form>
  );

  return {
    renderForm,
  };
};

export default useForm;
