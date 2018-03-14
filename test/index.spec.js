/* global describe, it, before */

import chai from 'chai';
import {SynchronousPost} from '../lib/etljs.js';
import store from 'store';
const etlDataConstantObject = require('../constants/SynchronousPostConstants').etlDataConstant
const baseURLObject = require('../constants/SynchronousPostConstants').baseURL
const singleRecordUrlObject = require('../constants/SynchronousPostConstants').singleRecordUrl
const multipleRecordsUrlObject = require('../constants/SynchronousPostConstants').multipleRecordsUrl
const defualtPartitionKeyObject = require('../constants/SynchronousPostConstants').defualtPartitionKey

chai.expect();

const expect = chai.expect;

let myInstance;

describe('Given an instance of my SynchronousPost library', () => {
  before(() => {
    myInstance = new SynchronousPost('devLocal');
  });
  describe('when I need the name', () => {
    it('should return the name', () => {
      expect(myInstance._env).to.be.equal('devLocal');
    });
  });
});

describe('Given an instance of my SynchronousPost library', () => {
  before(() => {
    myInstance = new SynchronousPost();
    myInstance.setDataInStore('testData', [{hala: 'madrid'}])
  });
  describe('when I need the data from store', () => {
    it('should return the data', () => {
      expect(myInstance.getDataFromStore('testData')).to.be.an('array');
      expect(myInstance.getDataFromStore('testData')).to.deep.include({hala: 'madrid'});
    });
  });
});

describe('Given an instance of my SynchronousPost library', () => {
  before(() => {
    myInstance = new SynchronousPost('devLocal');
  });
  describe('when I need the postData', () => {
    it('should return the postData', () => {
      expect(myInstance.postData).to.be.a('function');
    });
  });
});

describe('Given an instance of my SynchronousPost library', () => {
  before(() => {
    myInstance = new SynchronousPost('devLocal');
  });
  describe('when I need the getAndRemoveDataFromStore', () => {
    it('should return the getAndRemoveDataFromStore', () => {
      expect(myInstance.postData).to.be.a('function');
    });
  });
});

describe('Given an instance of my SynchronousPost library', () => {
  before(() => {
    myInstance = new SynchronousPost('devLocal');
  });
  describe('when I need the data from getAndRemoveDataFromStore which is not available', () => {
    it('should return the getAndRemoveDataFromStore', () => {
      expect(myInstance.getDataFromStore('testDataCase1')).to.be.an('undefined');
    });
  });
});

describe('Given an instance of my SynchronousPost library', () => {
  before(() => {
    myInstance = new SynchronousPost('devLocal');
    myInstance.setDataInStore('testDataCase2', [{hala: 'madrid'}])
  });
  describe('when I need the data from getAndRemoveDataFromStore which is available available', () => {
    it('should return the getAndRemoveDataFromStore', () => {
      expect(myInstance.getDataFromStore('testDataCase2')).to.be.an('array');
      expect(myInstance.getDataFromStore('testDataCase2')).to.deep.include({hala: 'madrid'});
    });
  });
});

describe('Given an instance of my SynchronousPost library', () => {
  before(() => {
    myInstance = new SynchronousPost('devLocal');
    myInstance.setDataInStore('testDataCase3', [{forca: 'barca'}])
    myInstance.getAndStoreDataToStore('testDataCase3', [{hala: 'madrid'}])
  });
  describe('when I call getAndStoreDataToStore', () => {
    it('should return the an array and include my data', () => {
      expect(myInstance.getDataFromStore('testDataCase3')).to.be.an('array');
      expect(myInstance.getDataFromStore('testDataCase3')).to.deep.include({hala: 'madrid'});
      expect(myInstance.getDataFromStore('testDataCase3')).to.deep.include({forca: 'barca'});
    });
  });
});

describe('Given an instance of my SynchronousPost library', () => {
  before(() => {
    myInstance = new SynchronousPost('devLocal');
    myInstance.setDataInStore('testDataCase4', [{mia: 'san mia'}])
  });
  describe('when I call getExistingStoreDataAndClear', () => {
    it('should return the an array and include my data plus the value of that key in store should be cleared', () => {
      expect(myInstance.getExistingStoreDataAndClear).to.be.a('function');
      expect(myInstance.getExistingStoreDataAndClear('testDataCase4')).to.be.an('array').that.deep.include({mia: 'san mia'});
      expect(myInstance.getDataFromStore('testDataCase4')).to.be.an('undefined');
    });
  });
});

describe('Given an instance of my SynchronousPost library', () => {
  before(() => {
    myInstance = new SynchronousPost('devLocal');
  });
  describe('when I need blank post data', () => {
    it('should return the blank post data', () => {
      expect(myInstance.getBlankPostDataInstance).to.be.a('function');
      expect(myInstance.getBlankPostDataInstance()).to.be.an('object').that.deep.include({etlData: []});
    });
  });
});

describe('Given an instance of my SynchronousPost library', () => {
  before(() => {
    myInstance = new SynchronousPost('devLocal');
  });
  describe('when I add default parameters', () => {
    it('should return data with default parameters', () => {
      expect(myInstance.addDefaultParameters).to.be.a('function');
      expect(myInstance.addDefaultParameters()).to.be.an('object').that.deep.include({'partition_key': defualtPartitionKeyObject.devLocal});
    });
  });
});

describe('Given an instance of my SynchronousPost library', () => {
  before(() => {
    myInstance = new SynchronousPost('devLocal');
  });
  describe('when I get etlStoreData', () => {
    it('should return the appropriate string from the constansts according to the environment', () => {
      expect(myInstance.getetlStoreData).to.be.a('function');
      expect(myInstance.getetlStoreData()).to.be.a('string').to.be.equal(etlDataConstantObject.devLocal);
    });
  });
});

describe('Given an instance of my SynchronousPost library', () => {
  before(() => {
    myInstance = new SynchronousPost('devLocal');
  });
  describe('when I get baseURL', () => {
    it('should return the appropriate string from the constansts according to the environment', () => {
      expect(myInstance.getbaseUrl).to.be.a('function');
      expect(myInstance.getbaseUrl()).to.be.a('string').to.be.equal(baseURLObject.devLocal);
    });
  });
});

describe('Given an instance of my SynchronousPost library', () => {
  before(() => {
    myInstance = new SynchronousPost('devLocal');
  });
  describe('when I get singleRecordUrl', () => {
    it('should return the appropriate string from the constansts according to the environment', () => {
      expect(myInstance.getsingleRecordUrl).to.be.a('function');
      expect(myInstance.getsingleRecordUrl()).to.be.a('string').to.be.equal(singleRecordUrlObject.devLocal);
    });
  });
});

describe('Given an instance of my SynchronousPost library', () => {
  before(() => {
    myInstance = new SynchronousPost('devLocal');
  });
  describe('when I get multipleRecordsUrl', () => {
    it('should return the appropriate string from the constansts according to the environment', () => {
      expect(myInstance.getmultipleRecordsUrl).to.be.a('function');
      expect(myInstance.getmultipleRecordsUrl()).to.be.a('string').to.be.equal(multipleRecordsUrlObject.devLocal);
    });
  });
});

describe('Given an instance of my SynchronousPost library', () => {
  before(() => {
    myInstance = new SynchronousPost('devLocal');
  });
  describe('when I get defualtPartitionKey', () => {
    it('should return the appropriate string from the constansts according to the environment', () => {
      expect(myInstance.getdefualtPartitionKey).to.be.a('function');
      expect(myInstance.getdefualtPartitionKey()).to.be.a('string').to.be.equal(defualtPartitionKeyObject.devLocal);
    });
  });
});
