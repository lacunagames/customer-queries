import React from 'react';
import { useDispatch } from 'react-redux';
import useForm from './useForm';
import { setCustomerQuery } from './customerQuerySlice';

export default function CustomerQueryForm() {
  const dispatch = useDispatch();
  const formFields = [
    {
      name: 'firstName',
      title: 'Your first name',
      value: '',
      rules: ['required', 'name'],
    },
    {
      name: 'surName',
      title: 'Your surname',
      value: '',
      rules: ['required', 'name'],
    },
    {
      name: 'email',
      title: 'Your email address',
      value: '',
      rules: ['required', 'email'],
    },
    {
      name: 'query',
      title: 'Please enter your message',
      value: '',
      rules: [],
      type: 'textarea',
    },
    { type: 'submit', title: 'Add' },
  ];
  const { renderForm } = useForm(formFields, (values) =>
    dispatch(setCustomerQuery(values))
  );

  return (
    <div className="CustomerQueryForm">
      <div className="content">
        <h1>Customer Query Form</h1>
        {renderForm()}
      </div>
    </div>
  );
}
