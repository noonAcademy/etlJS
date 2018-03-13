import axios from 'axios'
import store from 'store'
const R = require('ramda');
const etlStoreData = require('../constants/SynchronousPostConstants').etlDataConstant
const baseUrl = require('../constants/SynchronousPostConstants').baseURL
const singleRecordUrl = require('../constants/SynchronousPostConstants').singleRecordUrl
const multipleRecordsUrl = require('../constants/SynchronousPostConstants').multipleRecordsUrl
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
  postData(myData) {
    // Send a POST request
    let postUrl = baseUrl
    let postData = { etlData: [] }
    postData.etlData = this.getAndRemoveDataFromStore(etlStoreData) || postData.etlData
    postData.etlData.push(myData)
    if(postData.etlData.length>1) {
      postUrl += multipleRecordsUrl
    } else {
      postUrl += singleRecordUrl
    }
    axios({
      method: 'PUT',
      url: postUrl,
      headers: {'postman-token': '92e2aaea-5a76-5e9a-f05d-e5755c254d80'},
      data: postData
    })
      .then(response => {
        // Do nothing
      })
      .catch(err => {
        console.log(err)
        this.getAndStoreDataToStore(etlStoreData, postData.etlData)
      })
  }
}
