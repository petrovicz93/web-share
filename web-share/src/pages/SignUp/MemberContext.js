import React, { createContext, useState } from 'react';
export const MemberContext = createContext([{}, () => {}]);

export default (props) => {
  const [state, setState] = useState({
    user: {
      firstName: '',
      middleName: '',
      lastName: '',
      userName: '',
      email: '',
      confirmEmail: '',
      cellNumber: '',
      confirmCellNumber: '',
      dob: new Date().toISOString().slice(0, 10),
      gender: 'M',
      postalCode: '',
      city: '',
      state: '',
      country: '',
      password: '',
      confirmPassword: '',
      twoFactorAuth: 'Y',
      publicIP: '',
    },
    errors: {},
  });
  return (
    <MemberContext.Provider value={[state, setState]}>
      {props.children}
    </MemberContext.Provider>
  );
};
