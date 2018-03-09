import axios from 'axios'
import store from 'store'
const R = require('ramda');
const etlStoreDataConstant = require('../constants/SynchronousPostConstants').etlDataConstant
export default class SynchronousPost {
  constructor() {
    this._name = 'SynchronousPost'
    this.postData = this.postData
    this.getAndRemoveDataFromStore = this.getAndRemoveDataFromStore
    this.getDataFromStore = this.getDataFromStore
    this.setDataInStore = this.setDataInStore
    this.removeDataFromStore = this.removeDataFromStore
    this.getAndStoreDataToStore = this.getAndStoreDataToStore
    this.getExistingStoreDataAndClear = this.getExistingStoreDataAndClear
  }
  get name() {
    return this._name
  }
  getExistingStoreDataAndClear(value) {
    let returnValue;
    returnValue = this.getDataFromStore(value)
    this.removeDataFromStore(value)
    return returnValue
  }
  getAndRemoveDataFromStore(value) {
    let returnData
    let currentValue = this.getDataFromStore(value)
    returnData = currentValue ? this.getExistingStoreDataAndClear(value) : undefined
    return returnData
  }
  getAndStoreDataToStore(value, data) {
    let returnData
    let currentValue = this.getDataFromStore(value)
    returnData = currentValue ? this.setDataInStore(value, R.concat(this.getDataFromStore(value), data)) : this.setDataInStore(value, data)
    return returnData
  }
  getDataFromStore(value) {
    return store.get(value)
  }
  setDataInStore(value, data) {
    store.set(value, data)
  }
  removeDataFromStore(value) {
    store.remove(value)
  }
  postData(url, myData) {
    // Send a POST request
    let postData = { etlData: [] }
    postData.etlData = this.getAndRemoveDataFromStore(etlStoreDataConstant) || postData.etlData
    postData.etlData.push(myData)
    axios({
      method: 'post',
      url: url,
      data: postData
    })
      .then(response => {
        // Do nothing
      })
      .catch(err => {
        console.log(err)
        this.getAndStoreDataToStore(etlStoreDataConstant, postData.etlData)
      })
  }
}
