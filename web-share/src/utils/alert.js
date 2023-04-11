let alert = {
  variant: '',
  message: '',
};

const setAlert = (res, success, type) => {
  if (success) {
    alert['variant'] = 'success';
    alert['message'] = res.description;
  } else {
    if (res.res.status === 409) {
      alert['variant'] = 'warning';
      alert['message'] = `${type} already exist!`;
    } else if (res.res.status === 500) {
      alert['variant'] = 'danger';
      alert['message'] = 'Something went wrong, please try again later';
    }
  }
  return alert;
};

export default setAlert;
