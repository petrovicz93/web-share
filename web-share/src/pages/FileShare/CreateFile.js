import React, { useState, useEffect, useRef } from 'react';
import { Modal, Form, Button, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';

import * as apiService from '../../redux/actions/fileshare';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const CreateNewFile = (props) => {
  const { member } = props;
  const { show, close } = props;

  const [loading, setLoading] = useState(false);
  const prevState = usePrevious({ loading });
  const [error, setError] = useState('');
  // const [categories, setCategories] = useState('');
  const [selectedFiles, setSelectedFiles] = useState(null);

  useEffect(() => {
    setLoading(props.isCreateLoading);
  }, [props.isCreateLoading]);

  useEffect(() => {
    if (prevState && loading === false && prevState.loading === true) {
      close();
    }
  }, [loading, close, prevState]);

  const onChangeHandler = (event) => {
    setError('');
    setSelectedFiles(event.target.files);
  };

  const onClickHandler = (event) => {
    event.preventDefault();
    if (selectedFiles) {
      var formData = new FormData();
      for (var x = 0; x < selectedFiles.length; x++) {
        formData.append(`file${x}`, selectedFiles[x]);
      }
      formData.set('fileLength', selectedFiles.length);
      formData.set('memberId', member.member_id);
      // formData.set('category', categories);
      props.dispatch(apiService.createNewFile(formData));
    } else {
      setError(
        'This field is required, please choose one or more files to upload.'
      );
      return false;
    }
  };

  return (
    <>
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Create New File</Modal.Title>
        </Modal.Header>
        <Form className="upload-form" encType="multipart/form-data">
          <Modal.Body>
            <Form.Group>
              <Form.File
                id="custom-file"
                // label="Upload file"
                multiple
                onChange={(event) => onChangeHandler(event)}
              />
              {error ? <p className="error">{error}</p> : null}
            </Form.Group>
            {/* <Form.Group controlId="formBasicCategories">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Categories name"
                onChange={(e) => setCategories(e.target.value)}
              />
            </Form.Group> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={close}>
              Cancel
            </Button>
            {loading ? (
              <Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                uploading...
              </Button>
            ) : (
              <Button
                variant="primary"
                type="submit"
                onClick={(event) => onClickHandler(event)}
              >
                Upload
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  isCreateLoading: state.fileshare.createLoading,
  data: state.fileshare.data,
  member: state.member.member,
});

export default connect(mapStateToProps)(CreateNewFile);
