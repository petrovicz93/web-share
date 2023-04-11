import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Col, Row, Button } from 'react-bootstrap';

import {
  sendGroupMemberInvite,
  switchAddMemberForm,
} from '../../redux/actions/group';

import { validateInviteMemberForm } from '../../utils/validator/Group';

import { Countries } from '../../utils/country';

const InviteMemberForm = (props) => {
  const { dispatch, member, groupData } = props;

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      setErrors(validateInviteMemberForm(values));
    }
  }, [values, isSubmitting]);

  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmitInviteMemberForm = (event) => {
    if (event) event.preventDefault();
    const formErrors = validateInviteMemberForm(values);
    setIsSubmitting(true);
    if (values && Object.keys(formErrors).length === 0) {
      const formData = setFormData(values);
      dispatch(sendGroupMemberInvite(formData));
    }
    setErrors(validateInviteMemberForm(values));
    return false;
  };

  const setFormData = (values) => {
    let formData = new FormData();
    formData.set('groupId', groupData.group_id);
    formData.set('memberId', member.member_id);
    Object.keys(values).map((key) => {
      let value = values[key];
      if (key === 'country') {
        value = Countries.find((country) => country.code === values[key]).name;
      }
      return formData.set(key, value);
    });
    return formData;
  };

  return (
    <Form>
      <Form.Group as={Row} controlId="formPlaintextName">
        <Col>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            name="firstName"
            value={values.firstName || ''}
            onChange={(e) => handleChange(e)}
          />
          {errors.firstName && (
            <p className="help is-danger error">{errors.firstName}</p>
          )}
        </Col>
        <Col>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={values.lastName || ''}
            onChange={(e) => handleChange(e)}
          />
          {errors.lastName && (
            <p className="help is-danger error">{errors.lastName}</p>
          )}
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formPlaintextEmail">
        <Form.Label column sm="4">
          Email
        </Form.Label>
        <Col sm="8">
          <Form.Control
            type="email"
            name="groupMemberEmail"
            placeholder="email@example.com"
            onChange={(e) => handleChange(e)}
            value={values.groupMemberEmail || ''}
          />
          {errors.groupMemberEmail && (
            <p className="help is-danger error">{errors.groupMemberEmail}</p>
          )}
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formPlaintextCountry">
        <Form.Label column sm="4">
          Country
        </Form.Label>
        <Col sm="8">
          <Form.Control
            as="select"
            placeholder="United State"
            name="country"
            value={values.country || ''}
            onChange={(e) => handleChange(e)}
          >
            <option>Select country</option>
            {Countries.map((country, index) => (
              <option key={index} value={country.code}>
                {country.name}
              </option>
            ))}
          </Form.Control>
          {errors.country && (
            <p className="help is-danger error">{errors.country}</p>
          )}
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formPlaintextPhoneNumber">
        <Form.Label column sm="4">
          Phone Number
        </Form.Label>
        <Col sm="8">
          <Form.Control
            type="text"
            placeholder="123-456-7890"
            name="phoneNumber"
            value={values.phoneNumber || ''}
            onChange={(e) => handleChange(e)}
          />
          {errors.phoneNumber && (
            <p className="help is-danger error">{errors.phoneNumber}</p>
          )}
        </Col>
      </Form.Group>
      <Button
        variant="success"
        type="submit"
        className="add-group-member-btn"
        onClick={(e) => handleSubmitInviteMemberForm(e)}
      >
        Send Invite
      </Button>
      <Button
        variant="secondary"
        type="button"
        className="add-group-member-btn mr-2"
        onClick={() => {
          dispatch(switchAddMemberForm());
        }}
      >
        Back
      </Button>
    </Form>
  );
};

InviteMemberForm.propTypes = {
  dispatch: PropTypes.func,
  member: PropTypes.object,
  groupData: PropTypes.object,
};

InviteMemberForm.defaultProps = {
  dispatch: null,
  member: {},
  groupData: {},
};

const mapStateToProps = (state) => ({
  member: state.member.member,
  groupData: state.group.groupData,
});

export default connect(mapStateToProps)(InviteMemberForm);
