import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Modal,
  Form,
  Image,
  Alert,
  Container,
  Button,
  Spinner,
} from 'react-bootstrap';

import {
  setAmeraGroupSecurity,
  setShowGroupDetailModal,
} from '../../redux/actions/group';

const SaveData = (props) => {
  const { dispatch, show, close, groupData } = props;
  const [file, setFile] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [pin, setPin] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const [imageError, setImageError] = useState('');
  const [pinError, setPinError] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const prevState = usePrevious({ isLoading });

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  }, [showAlert]);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  useEffect(() => {
    if (prevState && isLoading === false && prevState.isLoading === true) {
      close();
      dispatch(setShowGroupDetailModal(true));
    }
  }, [isLoading, prevState, close, dispatch]);

  const fileSelectHandler = (e) => {
    setImageError('');
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imageType = isFileImage(selectedFile);
      if (imageType) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFile(selectedFile);
          setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setFile('');
        setImagePreviewUrl('');
        setShowAlert(true);
        setAlertStatus('warning');
        setAlertMessage('File is not image, please choose image');
        return false;
      }
    } else {
      setFile('');
      setImagePreviewUrl('');
    }
  };

  const isFileImage = (file) => {
    return file && file['type'].split('/')[0] === 'image';
  };

  const setPinNumber = (number) => {
    setPinError('');
    setPin(number);
  };

  const getBase64Image = (img) => {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL('image/png');
    // return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
    return dataURL;
  };

  const createImage = () => {
    var imageElement = document.createElement('img');
    imageElement.src = imagePreviewUrl;
    imageElement.id = 'session-image';
    imageElement.style.display = 'none';
    document.getElementById('session_image_section').appendChild(imageElement);
    return true;
  };

  const setSessionData = (file, fileContent, pin) => {
    var groupSecurity = {
      groupId: groupData.group_id,
      fileName: file.name,
      // fileContent: fileContent,
      filePath: '',
      fileSize: file.size,
      fileType: file.type,
      pin: pin,
    };
    dispatch(setAmeraGroupSecurity(groupSecurity));
    return true;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!file) {
      setImageError('Please select a file to upload!');
      return false;
    }
    if (!pin) {
      setPinError('Pin code is required');
      return false;
    }
    if (isNaN(pin) || pin.length < 6 || pin.length > 12) {
      setPinError('Pin code is invalid');
      return false;
    }

    setIsLoading(true);
    const isImageElement = createImage();
    if (isImageElement) {
      var image = document.getElementById('session-image');
      const fileContent = getBase64Image(image);
      const isSaved = setSessionData(file, fileContent, pin);
      if (isSaved) {
        setTimeout(() => {
          var element = document.getElementById('session_image_section');
          element.removeChild(element.childNodes[0]);
          setIsLoading(false);
          setShowAlert(true);
          setAlertStatus('success');
          setAlertMessage('Data saved successfully');
          setFile('');
          setImagePreviewUrl('');
          setPin('');
        }, 1500);
      }
    }
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Save Picture and PIN</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="image-pin-save-form">
          <Container>
            <React.Fragment>
              {showAlert ? (
                <Alert
                  className="upload-image-alert-message"
                  variant={alertStatus}
                  onClose={() => setShowAlert(false)}
                  dismissible
                >
                  <Alert.Heading>{alertStatus}</Alert.Heading>
                  <p>{alertMessage}</p>
                </Alert>
              ) : null}
              <Form
                className="image-upload-form uploader"
                onSubmit={(e) => handleSave(e)}
              >
                <Form.Group controlId="uploadImage">
                  <Form.File
                    accept="image/*"
                    className="image-upload"
                    placeholder="Group name"
                    name="imageUpload"
                    onChange={(e) => fileSelectHandler(e)}
                  />
                </Form.Group>
                <Form.Group controlId="uploadImage">
                  <Form.Label id="image-drag">
                    {imagePreviewUrl ? (
                      <React.Fragment>
                        <Image
                          id="file-image"
                          src={imagePreviewUrl}
                          alt="Preview"
                        />
                      </React.Fragment>
                    ) : (
                      <div id="start" className="align-self-center">
                        <i className="fa fa-download" aria-hidden="true"></i>
                        <div id="notimage" className="hidden">
                          Please select an image
                        </div>
                        <span id="file-upload-btn" className="btn btn-success">
                          Select a file
                        </span>
                      </div>
                    )}
                  </Form.Label>
                  {imagePreviewUrl ? (
                    <p>Click image again to choose a different image.</p>
                  ) : imageError ? (
                    <p className="error">{imageError}</p>
                  ) : null}
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Personal Identification Number (Min: 6, Max: 12)
                  </Form.Label>
                  <Form.Control
                    placeholder="123456789123"
                    value={pin}
                    onChange={(e) => setPinNumber(e.target.value)}
                  />
                  {pinError ? <p className="error">{pinError}</p> : null}
                </Form.Group>
              </Form>
              <div id="session_image_section" className="hidden"></div>
            </React.Fragment>
          </Container>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Form.Group className="save-btn-form-group">
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
          {isLoading ? (
            <Button variant="success" className="save-btn" disabled>
              <Spinner
                as="span"
                animation="grow"
                role="status"
                aria-hidden="true"
              />
              saving...
            </Button>
          ) : (
            <Button
              variant="success"
              type="submit"
              className="save-btn"
              onClick={(e) => handleSave(e)}
            >
              Save
            </Button>
          )}
        </Form.Group>
      </Modal.Footer>
    </Modal>
  );
};

SaveData.propTypes = {
  dispatch: PropTypes.func,
  show: PropTypes.bool,
  close: PropTypes.func,
  groupData: PropTypes.object,
};

SaveData.defaultProps = {
  dispatch: null,
  show: false,
  close: null,
  groupData: {},
};

const mapStateToProps = (state) => ({
  app: state.app,
  groupData: state.group.groupData,
});

export default connect(mapStateToProps)(SaveData);
