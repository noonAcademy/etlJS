/* global describe, it, before */

import chai from 'chai';
import {SynchronousPost} from '../lib/etljs.js';
import store from 'store';

chai.expect();

const expect = chai.expect;

let myInstance;

describe('Given an instance of my SynchronousPost library', () => {
  before(() => {
    myInstance = new SynchronousPost();
  });
  describe('when I need the name', () => {
    it('should return the name', () => {
      expect(myInstance.name).to.be.equal('SynchronousPost');
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
    myInstance = new SynchronousPost();
  });
  describe('when I need the postData', () => {
    it('should return the postData', () => {
      expect(myInstance.postData).to.be.a('function');
    });
  });
});

describe('Given an instance of my SynchronousPost library', () => {
  before(() => {
    myInstance = new SynchronousPost();
  });
  describe('when I need the getAndRemoveDataFromStore', () => {
    it('should return the getAndRemoveDataFromStore', () => {
      expect(myInstance.postData).to.be.a('function');
    });
  });
});

describe('Given an instance of my SynchronousPost library', () => {
  before(() => {
    myInstance = new SynchronousPost();
  });
  describe('when I need the data from getAndRemoveDataFromStore which is not available', () => {
    it('should return the getAndRemoveDataFromStore', () => {
      expect(myInstance.getDataFromStore('testDataCase1')).to.be.an('undefined');
    });
  });
});

describe('Given an instance of my SynchronousPost library', () => {
  before(() => {
    myInstance = new SynchronousPost();
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
    myInstance = new SynchronousPost();
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
    myInstance = new SynchronousPost();
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
