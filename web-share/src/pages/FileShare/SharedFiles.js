import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, ListGroup, Button, Alert } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { MdFileDownload, MdRemoveRedEye, MdDelete } from 'react-icons/md';

import * as apiService from '../../redux/actions/fileshare';
import { fileDownload } from '../../utils/fileDownload';
import loadSpinner from '../../assets/img/loading.gif';

const SharedFiles = (props) => {
  const memberId = props.member.member_id;
  const dispatch = props.dispatch;
  const [detailData, setDetailData] = useState([]);

  const [showDetailModal, setShowDetailModal] = useState(false);
  const handleCloseDetailModal = () => setShowDetailModal(false);

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const handleCloseRemoveModal = () => setShowRemoveModal(false);

  const [removeSharedKey, setRemoveSharedKey] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertstatus] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  }, [showAlert]);

  const linkFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      <Link
        className="file-name"
        to="#"
        onClick={() => downloadSharedFile(row)}
      >
        {row.file_name}
      </Link>
    );
  };

  const rankFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div
        style={{ textAlign: 'center', cursor: 'pointer', lineHeight: 'normal' }}
      >
        <Button
          className="action-btn"
          variant="secondary"
          size="sm"
          onClick={() => downloadSharedFile(row)}
        >
          <MdFileDownload className="action-btn-icon" />
        </Button>

        <Button
          className="action-btn"
          variant="primary"
          size="sm"
          onClick={() => viewSharedFileDetail(row.shared_key)}
        >
          <MdRemoveRedEye className="action-btn-icon" />
        </Button>
        <Button
          className="action-btn"
          variant="danger"
          size="sm"
          onClick={() => viewRemoveConfirmModal(row.shared_key)}
        >
          <MdDelete className="action-btn-icon" />
        </Button>
      </div>
    );
  };

  const sharedFilesColumns = [
    {
      dataField: 'file_name',
      text: 'File Name',
      style: { verticalAlign: 'middle' },
      formatter: linkFormatter,
    },
    {
      dataField: 'shared_member',
      text: 'Member',
      headerStyle: (colum, colIndex) => {
        return { textAlign: 'center' };
      },
      style: { verticalAlign: 'middle', textAlign: 'center' },
    },
    {
      dataField: 'shared_date',
      text: 'Shared Date',
      headerStyle: (colum, colIndex) => {
        return { textAlign: 'center' };
      },
      style: { verticalAlign: 'middle', textAlign: 'center' },
    },
    {
      dataField: 'actions',
      text: 'Actions',
      isDummyField: true,
      csvExport: false,
      headerStyle: (colum, colIndex) => {
        return { textAlign: 'center' };
      },
      style: { verticalAlign: 'middle', textAlign: 'center' },
      formatter: rankFormatter,
    },
  ];

  const getSharedFiles = useCallback(() => {
    dispatch(apiService.getSharedFiles(memberId));
  }, [memberId, dispatch]);

  useEffect(() => {
    getSharedFiles();
  }, [getSharedFiles]);

  // download shared file
  const downloadSharedFile = (sharedFile) => {
    const sharedFileName = sharedFile.file_name;
    const sharedKey = sharedFile.shared_key;
    apiService
      .getDownloadSharedFile(sharedKey)
      .then((res) => {
        if (res.success) {
          fileDownload(res.data, sharedFileName);
        } else {
          setShowAlert(true);
          setAlertstatus(res.status);
          setAlertMessage(res.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // view shared file details with modal
  const viewSharedFileDetail = (sharedKey) => {
    apiService
      .getSharedFileDetail(memberId, sharedKey)
      .then((res) => {
        if (res.data) {
          setDetailData(res.data);
          setShowDetailModal(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // show remove sharing confirm modal
  const viewRemoveConfirmModal = (sharedKey) => {
    setRemoveSharedKey(sharedKey);
    setShowRemoveModal(true);
  };

  // processing of remove sharing with api
  const removeShare = (event) => {
    event.preventDefault();
    apiService
      .removeShare(removeSharedKey)
      .then((res) => {
        if (res) {
          setShowRemoveModal(false);
          getSharedFiles();
          setTimeout(() => {
            setShowAlert(true);
            setAlertstatus(res.status);
            setAlertMessage(res.message);
          }, 500);
        }
      })
      .catch((error) => {
        console.error(error);
        setShowRemoveModal(false);
        setTimeout(() => {
          setShowAlert(true);
          setAlertstatus('warning');
          setAlertMessage('Something Went Wrong');
        }, 500);
      });
  };

  return (
    <div className="member-files-section">
      <React.Fragment>
        {showAlert ? (
          <Alert
            variant={alertStatus}
            onClose={() => setShowAlert(false)}
            dismissible
          >
            <Alert.Heading>{alertStatus}</Alert.Heading>
            <p>{alertMessage}</p>
          </Alert>
        ) : null}
        {/* Shared File Detail Modal */}
        <Modal
          show={showDetailModal}
          onHide={handleCloseDetailModal}
          size="lg"
          className="detail-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Shared File Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup variant="flush">
              {Object.keys(detailData).map((key, i) =>
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
                      <span>{detailData[key]}</span>
                    </div>
                  </div>
                ) : null
              )}
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetailModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {/* End Shared File Detail Modal */}

        {/* Remove Sharing Confimation Modal */}
        <Modal show={showRemoveModal} onHide={handleCloseRemoveModal}>
          <Modal.Header closeButton>
            <Modal.Title>Remove Sharing</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Are you sure you want to remove this sharing?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseRemoveModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={(e) => removeShare(e)}>
              Confirm Remove
            </Button>
          </Modal.Footer>
        </Modal>
        {/* End Remove Sharing Confimation Modal */}

        {/* Shared Files Table */}
        <div className="shared-files-table file-table">
          {props.isLoading ? (
            <div className="loading-spinner">
              <img src={loadSpinner} alt="spinner" />
            </div>
          ) : (
            <BootstrapTable
              keyField="shared_key"
              data={props.sharedFileData}
              columns={sharedFilesColumns}
              pagination={paginationFactory()}
              bootstrap4={true}
            />
          )}
        </div>
        {/* End Shared Files Table */}
      </React.Fragment>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.fileshare.loading,
  sharedFileData: state.fileshare.sharedFileData,
  member: state.member.member,
});

export default connect(mapStateToProps)(SharedFiles);
