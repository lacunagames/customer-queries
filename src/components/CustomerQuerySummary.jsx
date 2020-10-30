import React from 'react';
import { useSelector } from 'react-redux';
import './CustomerQuerySummary.scss';

export default function CustomerQuerySummary() {
  const queryData = useSelector((state) => state.customerQuery.data);
  return (
    <div className="CustomerQuerySummary">
      <div className="content">
        <h1>Thank you! Your details have been saved.</h1>
        <div className="card">
          <p>
            <span>Your name:</span>
            <strong> {`${queryData.firstName} ${queryData.surName}`}</strong>
          </p>
          <p>
            <span>Your email address:</span>
            <strong> {queryData.email}</strong>
          </p>
          {queryData.query && (
            <p>
              <span>Your message:</span>
              <strong>
                {' '}
                {queryData.query.split(/\r?\n/).map((line) => (
                  <>
                    {line}
                    <br />
                  </>
                ))}
              </strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
