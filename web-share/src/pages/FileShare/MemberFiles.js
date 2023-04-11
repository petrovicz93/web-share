import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { Modal, Button, Alert, Col } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { MdFileDownload, MdRemoveRedEye, MdDelete } from 'react-icons/md';
import { FaShareAlt } from 'react-icons/fa';

import FileDetailModal from './FileDetailModal';
import ShareProcessModal from './ShareProcessModal';

import { getFileDetails } from '../../redux/actions/fileshare';

import * as apiService from '../../redux/actions/fileshare';

import { fileDownload } from '../../utils/fileDownload';
import loadSpinner from '../../assets/img/loading.gif';

const MemberFiles = (props) => {
  const { dispatch, member, fileList } = props;
  const memberId = member.member_id;

  const [showDetail, setShowDetail] = useState(false);

  const [selectedShareFileId, setSelectedFileId] = useState(0);;
  const [showShareModal, setShowShareModal] = useState(false);

  const [deleteFileId, setDeleteFileId] = useState(0);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const handleCloseDeleteConfirmModal = () => setShowDeleteConfirmModal(false);

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
      <Link className="file-name" to="#" onClick={() => downloadFile(row)}>
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
          onClick={() => downloadFile(row)}
        >
          <MdFileDownload className="action-btn-icon" />
        </Button>

        <Button
          className="action-btn"
          variant="primary"
          size="sm"
          onClick={() => viewFileDetail(row.file_id)}
        >
          <MdRemoveRedEye className="action-btn-icon" />
        </Button>

        <Button
          className="action-btn"
          variant="success"
          size="sm"
          onClick={() => showShareFileModal(row.file_id)}
        >
          <FaShareAlt className="action-btn-icon" />
        </Button>

        <Button
          className="action-btn"
          variant="danger"
          size="sm"
          onClick={() => DeleteConfirmModal(row.file_id)}
        >
          <MdDelete className="action-btn-icon" />
        </Button>
      </div>
    );
  };

  const memberFilesColumns = [
    {
      dataField: 'file_id',
      text: 'File ID',
      style: { verticalAlign: 'middle' },
      hidden: true,
    },
    {
      dataField: 'file_name',
      text: 'File Name',
      style: { verticalAlign: 'middle' },
      formatter: linkFormatter,
    },
    {
      dataField: 'create_date',
      text: 'Created Date',
      headerStyle: (colum, colIndex) => {
        return { textAlign: 'center' };
      },
      style: { verticalAlign: 'middle', textAlign: 'center' },
    },
    {
      dataField: 'categories',
      text: 'Categories',
      headerStyle: (colum, colIndex) => {
        return { textAlign: 'center' };
      },
      style: { verticalAlign: 'middle', textAlign: 'center' },
    },
    {
      text: 'Actions',
      dataField: 'actions',
      isDummyField: true,
      csvExport: false,
      headerStyle: (colum, colIndex) => {
        return { textAlign: 'center' };
      },
      style: { verticalAlign: 'middle', textAlign: 'center' },
      formatter: rankFormatter,
    },
  ];

  const getMemberFiles = useCallback(() => {
    dispatch(apiService.getMemberFiles(memberId));
  }, [memberId, dispatch]);

  useEffect(() => {
    getMemberFiles();
  }, [getMemberFiles]);

  const downloadFile = (file) => {
    const fileName = file.file_name;
    const fileId = file.file_id;
    apiService
      .getDownloadFile(fileId)
      .then((res) => {
        fileDownload(res.data, fileName);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const viewFileDetail = (fileId) => {
    dispatch(getFileDetails(memberId, fileId));
    setShowDetail(true);
  };

  const showShareFileModal = (fileId) => {
    setSelectedFileId(fileId);
    setShowShareModal(true);
    // setShareMemberEmail('');
    // setShareModalError('');
  };

  const DeleteConfirmModal = (fileId) => {
    setShowDeleteConfirmModal(true);
    setDeleteFileId(fileId);
  };

  const deleteFile = (event) => {
    event.preventDefault();
    apiService
      .deleteFile(deleteFileId)
      .then((res) => {
        if (res) {
          setShowDeleteConfirmModal(false);
          getMemberFiles();
          setTimeout(() => {
            setShowAlert(true);
            setAlertstatus(res.status);
            setAlertMessage(res.message);
          }, 500);
        }
      })
      .catch((error) => {
        console.log(error);
        setShowDeleteConfirmModal(false);
        setTimeout(() => {
          setShowAlert(true);
          setAlertstatus('warning');
          setAlertMessage('Something went wrong');
        }, 500);
      });
  };

  return (
    <Col className="member-files-section">
      <React.Fragment>
        {showAlert ? (
          <Alert
            variant={alertStatus}
            onClose={() => setShowAlert(false)}
            fade="false"
            dismissible
          >
            {/* <Alert.Heading>{alertStatus}</Alert.Heading> */}
            <p>{alertMessage}</p>
          </Alert>
        ) : null}

        <FileDetailModal 
          show={showDetail}
          close={() => setShowDetail(false)}
        ></FileDetailModal>

        <ShareProcessModal
          show={showShareModal}
          close={() => setShowShareModal(false)}
          fileId={selectedShareFileId}
        ></ShareProcessModal>

        {/* Delete File Confimation Modal */}
        <Modal
          show={showDeleteConfirmModal}
          onHide={handleCloseDeleteConfirmModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Remove File</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Are you sure you want to remove this file?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteConfirmModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={(e) => deleteFile(e)}>
              Confirm Remove
            </Button>
          </Modal.Footer>
        </Modal>
        {/* End Delete File Confimation Modal */}

        <div className="member-files-table file-table">
          {props.isLoading ? (
            <div className="loading-spinner">
              <img src={loadSpinner} alt="spinner" />
            </div>
          ) : (
            <BootstrapTable
              keyField="file_id"
              data={fileList}
              columns={memberFilesColumns}
              pagination={paginationFactory()}
              bootstrap4={true}
            />
          )}
        </div>
      </React.Fragment>
    </Col>
  );
};

MemberFiles.propTypes = {
  dispatch: PropTypes.func,
  isLoading: PropTypes.bool,
  fileList: PropTypes.arrayOf(PropTypes.object),
  member: PropTypes.object,
}

MemberFiles.defaultProps = {
  dispatch: null,
  isLoading: false,
  fileList: [],
  member: {},
}

const mapStateToProps = (state) => ({
  isLoading: state.fileshare.loading,
  fileList: state.fileshare.fileList,
  member: state.member.member,
});

export default connect(mapStateToProps)(MemberFiles);
