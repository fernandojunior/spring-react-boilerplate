import axios from 'axios';

const errorLogger = (error, onError) => {
  console.error(error);
  if (onError)
   onError(error);
}

class Repository {

  constructor(url) {
    this.url = url;
  }

  findOne(id, onSuccess, onError) {
    return axios.get(this.url + '/' + id)
     .then(onSuccess)
     .catch(error => errorLogger(error, onError));
  }

  findAll(onSuccess) {
    return this.search({ size: Math.pow(10, 6) })
      .then(onSuccess)
      .catch(error => errorLogger(error, onError));
  }

  search(options, onSuccess) {
    let url = this.url + "?" + this.buildSearchParameters(options);
    return axios.get(url)
      .then(onSuccess)
      .catch(error => errorLogger(error, onError));
  }

  buildSearchParameters({ page=0, size=10, sort='id' }, filters={}) {
    const paginationParams = `page=${ page }&size=${ size }&sort=${ sort }`;
    const filterParams = Object.keys(filters).map(key => `filter=${ key }=${ filters[key] }`).join('&')

    return `${ paginationParams}&${ filterParams }`;
  }

  save(data, onSuccess) {
    let promise = null;
    if (data && data.id)
      promise = axios.put(this.url + "/" + id, data);
    else
      promise = axios.post(this.url, data);
    return promise
      .then(onSuccess)
      .catch(error => errorLogger(error, onError));
  }

};

export default Repository;
