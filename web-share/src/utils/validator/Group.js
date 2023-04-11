export const validateAddMemberForm = (values) => {
  let errors = {};

  if (!values.groupMemberEmail) {
    errors.groupMemberEmail = 'Email address is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.groupMemberEmail)) {
    errors.groupMemberEmail = 'Email address is invalid';
  }

  return errors;
};

export const validateInviteMemberForm = (values) => {
  let errors = {};

  if (!values.groupMemberEmail) {
    errors.groupMemberEmail = 'Email address is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.groupMemberEmail)) {
    errors.groupMemberEmail = 'Email address is invalid';
  }

  if (!values.firstName) {
    errors.firstName = 'Frist name is required';
  }

  if (!values.lastName) {
    errors.lastName = 'Last name is required';
  }

  if (!values.country) {
    errors.country = 'Country is required';
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = 'Phone number is required';
  } else if (!validPhoneNumber(values.phoneNumber)) {
    errors.phoneNumber = 'Phone number is invalid';
  }

  return errors;
};

function validPhoneNumber(phoneNember) {
  var phoneRe = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (phoneRe.test(phoneNember)) {
    return true;
  }
  return false;
}
