import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  Form,
  Button,
  Container,
  Col,
  Row,
  Alert,
  Spinner,
} from 'react-bootstrap';
import { MdWarning } from 'react-icons/md';

import { sendGroupMemberInvite } from '../../redux/actions/group';

import { validateInviteMemberForm } from '../../utils/validator/Group';
import { Countries } from '../../utils/country';

const MemberInvite = (props) => {
  const { member, show, close } = props;
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertWarning, setAlertWarning] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const closeInviteModal = () => {
    setIsSubmitting(false);
    setValues({});
    setErrors({});
    close();
  };

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  }, [showAlert]);

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

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    const formErrors = validateInviteMemberForm(values);
    setIsSubmitting(true);
    if (values && Object.keys(formErrors).length === 0) {
      setIsLoading(true);
      const formData = setFormData(values);
      sendGroupMemberInvite(formData)
        .then((res) => {
          if (!res.success) {
            setAlertWarning(true);
          }
          setAlertVariant(res.status);
          setAlertMessage(res.message);
          setShowAlert(true);
          setIsSubmitting(false);
          setValues({});
          setErrors({});
          setIsLoading(false);
        })
        .catch((error) => {
          setAlertVariant('danger');
          setAlertMessage('Something Went Wrong');
          setShowAlert(true);
          setAlertWarning(true);
          setIsSubmitting(false);
          setValues({});
          setErrors({});
          setIsLoading(false);
        });
    }
    setErrors(validateInviteMemberForm(values));
    return false;
  };

  const setFormData = (values) => {
    let formData = new FormData();
    // formData.set('groupId', groupData.group_id);
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
    <Modal
      size="md"
      show={show}
      onHide={() => closeInviteModal()}
      aria-labelledby="group-detail-modal-title"
      className="group-detail-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="group-detail-modal-title">Send Invite</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Container>
            <Alert
              show={showAlert}
              variant={alertVariant}
              onClose={() => setShowAlert(false)}
              dismissible
            >
              {alertWarning ? <MdWarning></MdWarning> : null} {alertMessage}
            </Alert>
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
                  <p className="help is-danger error">
                    {errors.groupMemberEmail}
                  </p>
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
                Cell Number
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
            {isLoading ? (
              <Button variant="success" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Sending...
              </Button>
            ) : (
              <Button
                variant="success"
                type="submit"
                className="add-group-member-btn"
                onClick={(e) => handleSubmit(e)}
              >
                Send Invite
              </Button>
            )}
          </Container>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => closeInviteModal()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  member: state.member.member,
});

export default connect(mapStateToProps)(MemberInvite);
