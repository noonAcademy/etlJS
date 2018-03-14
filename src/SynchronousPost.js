import axios from 'axios'
import store from 'store'
const R = require('ramda');
const etlStoreDataObject = require('../constants/SynchronousPostConstants').etlDataConstant
const baseUrlObject = require('../constants/SynchronousPostConstants').baseURL
const singleRecordUrlObject = require('../constants/SynchronousPostConstants').singleRecordUrl
const multipleRecordsUrlObject = require('../constants/SynchronousPostConstants').multipleRecordsUrl
const defualtPartitionKeyObject = require('../constants/SynchronousPostConstants').defualtPartitionKey

export default class SynchronousPost {
  constructor(env) {
    this._env = env
    this.postData = this.postData
    this.getAndRemoveDataFromStore = this.getAndRemoveDataFromStore
    this.getDataFromStore = this.getDataFromStore
    this.setDataInStore = this.setDataInStore
    this.removeDataFromStore = this.removeDataFromStore
    this.getAndStoreDataToStore = this.getAndStoreDataToStore
    this.getExistingStoreDataAndClear = this.getExistingStoreDataAndClear
    this.getBlankPostDataInstance = this.getBlankPostDataInstance
    this.addDefaultParameters = this.addDefaultParameters
    this.unloadHandlingFunction = this.unloadHandlingFunction
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
  addDefaultParameters(postData) {
    let returnData = Object.assign({}, postData)
    let myFunc, myDateDefault
    myFunc = R.propOr(this.getdefualtPartitionKey(), 'partition_key')
    myDateDefault = R.propOr(new Date(), 'timestamp')
    returnData.partition_key = myFunc(returnData)
    try {
      returnData.data.timestamp = myDateDefault(returnData.data)
    } catch (error) {
      
    }
    return returnData
  }
  getBlankPostDataInstance() {
    return Object.assign({}, { etlData: [] })
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
    let postUrl = this.getbaseUrl()
    let postData = this.getBlankPostDataInstance()
    myData = this.addDefaultParameters(myData)
    postData.etlData = this.getAndRemoveDataFromStore(this.getetlStoreData()) || postData.etlData
    postData.etlData.push(myData)
    if(postData.etlData.length>1) {
      postUrl += this.getmultipleRecordsUrl()
    } else {
      postUrl += this.getsingleRecordUrl()
    }
    axios({
      method: 'PUT',
      url: postUrl,
      data: postData
    })
      .then(response => {
        // Do nothing
      })
      .catch(err => {
        console.log(err)
        this.getAndStoreDataToStore(this.getetlStoreData(), postData.etlData)
      })
  }
  unloadHandlingFunction(myData) {
    let postData = this.getBlankPostDataInstance()
    myData = this.addDefaultParameters(myData)
    postData.etlData = this.getAndRemoveDataFromStore(this.getetlStoreData()) || postData.etlData
    postData.etlData.push(myData)
    this.getAndStoreDataToStore(this.getetlStoreData(), postData.etlData)
  }
  getetlStoreData() {
    return etlStoreDataObject[this._env]
  }
  getbaseUrl() {
    return baseUrlObject[this._env]
  }
  getsingleRecordUrl() {
    return singleRecordUrlObject[this._env]
  }
  getmultipleRecordsUrl() {
    return multipleRecordsUrlObject[this._env]
  }
  getdefualtPartitionKey() {
    return defualtPartitionKeyObject[this._env]
  }
}
