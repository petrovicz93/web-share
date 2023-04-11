import { apiUrl } from '../config/api';

export const fileDownload = (key, fileName) => {
  const url = `${apiUrl}/static/${key}`;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';
  xhr.onload = function () {
    var urlCreator = window.URL || window.webkitURL;
    var fileUrl = urlCreator.createObjectURL(this.response);
    var tag = document.createElement('a');
    tag.href = fileUrl;
    tag.download = fileName;
    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
  };
  xhr.send();
};
