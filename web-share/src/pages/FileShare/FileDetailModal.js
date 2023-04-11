import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Modal, ListGroup, Button } from 'react-bootstrap';

const FileDetailModal = (props) => {
  const { show, close, fileDetailData} = props;
  return (
    <>
      <Modal
        show={show}
        onHide={close}
        size="lg"
        className="detail-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>File Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup variant="flush">
            {Object.keys(fileDetailData).map((key, i) =>
              key !== 'file_id' && key !== 'file_location' ? (
                <div className="detail-info" key={i}>
                  <div className="detail-key">
                    <span>
                      {key
                        .replace(/[^a-zA-Z ]/g, ' ')
                        .charAt(0)
                        .toUpperCase() +
                        key.replace(/[^a-zA-Z ]/g, ' ').slice(1)}
                      :
                    </span>
                  </div>
                  <div className="detail-value">
                    <span>{fileDetailData[key]}</span>
                  </div>
                </div>
              ) : null
            )}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

FileDetailModal.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func,
  fileDetailData: PropTypes.object,
}

FileDetailModal.defaultProps = {
  show: false,
  close: null,
  fileDetailData: {},
}

const mapStateToProps = (state) => ({
  fileDetailData: state.fileshare.fileDetailData,
});

export default connect(mapStateToProps)(FileDetailModal);
