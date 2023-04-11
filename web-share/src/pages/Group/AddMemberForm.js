import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Col, Row, Button } from 'react-bootstrap';
import Select from 'react-select';
import { bindActionCreators } from 'redux';

import { validateAddMemberForm } from '../../utils/validator/Group';

import { addGroupMember } from '../../redux/actions/group';
import { getMembers } from '../../redux/actions/member';

const AddMemberForm = (props) => {
  const { dispatch, groupData, members, getMembers } = props;

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailOptions, setEmailOptions] = useState([]);

  const group_id = groupData.group_id;

  useEffect(() => {
    if (isSubmitting) {
      setErrors(validateAddMemberForm(values));
    }
  }, [values, isSubmitting]);

  useEffect(() => {
    getMembers({
      search_key: '',
      group_id,
    });
  }, [getMembers, group_id]);

  useEffect(() => {
    const options = members.map((x) => ({
      value: x.email,
      label: x.email,
    }));

    setEmailOptions(options);
  }, [dispatch, members]);

  const handleSubmitAddMemberForm = (event) => {
    if (event) event.preventDefault();
    const formErrors = validateAddMemberForm(values);
    setIsSubmitting(true);
    if (values && Object.keys(formErrors).length === 0) {
      const formData = setFormData(values);
      props.addGroupMember(formData);
    }
    setErrors(validateAddMemberForm(values));
    return false;
  };

  const selectEmail = (option) => [
    setValues((values) => ({
      ...values,
      groupMemberEmail: option.value,
    })),
  ];

  const setFormData = (values) => {
    let formData = new FormData();
    formData.set('groupId', groupData.group_id);
    Object.keys(values).map((key) => {
      let value = values[key];
      return formData.set(key, value);
    });
    return formData;
  };

  return (
    <Form onSubmit={(e) => handleSubmitAddMemberForm(e)}>
      <Form.Group as={Row} controlId="formPlaintextEmail">
        <Form.Label column sm="4">
          Email
        </Form.Label>
        <Col sm="8">
          <Select
            options={emailOptions}
            placeholder="john@mail.com"
            isLoading={props.loadingMembers}
            onChange={selectEmail}
            isSearchable={true}
            value={
              values.groupMemberEmail
                ? {
                    value: values.groupMemberEmail,
                    label: values.groupMemberEmail,
                  }
                : null
            }
          />
          {errors.groupMemberEmail && (
            <p className="help is-danger error">{errors.groupMemberEmail}</p>
          )}
        </Col>
      </Form.Group>
      <Button
        variant="success"
        type="submit"
        className="add-group-member-btn"
        onClick={(e) => handleSubmitAddMemberForm(e)}
      >
        Add Member
      </Button>
    </Form>
  );
};

AddMemberForm.propTypes = {
  dispatch: PropTypes.func,
  groupData: PropTypes.object,
};

AddMemberForm.defaultProps = {
  dispatch: null,
  groupData: {},
};

const mapStateToProps = (state) => ({
  groupData: state.group.groupData,
  members: state.member.members,
  loadingMembers: state.member.loadingMembers,
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({ getMembers, addGroupMember }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMemberForm);
