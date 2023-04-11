const isEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isPasswordValid = password => password.length >= 8;
const isEqual = ( val1, val2 ) => val1 === val2;
const isCellNumber = cellNumber => cellNumber.match(/^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/);

export { isEmail, isCellNumber, isPasswordValid, isEqual };
