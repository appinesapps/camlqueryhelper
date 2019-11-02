import camlqueryhelper from '../index.js'
import chai from 'chai'

chai.should()
let expect = chai.expect,
assert = chai.assert


describe('Caml Query Helper',function(){
  describe('getArrayOfQueries',function(){
    it('getArrayOfQueries return array',()=>{
      assert.isArray(camlqueryhelper.getArrayOfQueries())
    })
  })
  describe('getQueryElement',function(){
    let query_element = camlqueryhelper.getQueryElement('Operator','FieldName','ValueType','Value')
    it('should return query as a string',()=>{
      expect(query_element).to.be.a('string')
    })
    it('should not return undefined in a string query',()=>{
      expect(query_element).not.to.include('undefined');
    })
  })
})