import camlqueryhelper from '../index.js'
import chai from 'chai'

chai.should()
let expect = chai.expect,
assert = chai.assert

// .query()
// cmlhelper.query()

describe('Caml Query Helper',function(){
  describe('createTag',()=>{
    it('create tag name',()=>{
      let tag = camlqueryhelper.createTag('Value',{
        type:"Text",
        test:"test"
      })
      expect(tag).equal('<Value Type="Text" Test="Test" ></Value>')
    })
    it('create tag self closing',()=>{
      let tag = camlqueryhelper.createTag('FieldRef',{
        type:"Text",
        test:"test"
      })
      expect(tag).equal('<FieldRef Type="Text" Test="Test" />')
    })
  })
  describe('View',function(){
    it('view return view xml schema',()=>{
      camlqueryhelper.caml_start = ''
      camlqueryhelper.caml_end = ''
      let view_string_start = camlqueryhelper.view().caml_start,
      view_string_end = camlqueryhelper.view().caml_end
      
      expect(view_string_start).equal('<View>')
      expect(view_string_end).equal('</View>')
    })
  })
  describe('Query',function(){
    it('query return query xml schema',()=>{
      camlqueryhelper.caml_start = ''
      camlqueryhelper.caml_end = ''
      let quer_string_start = camlqueryhelper.query().caml_start,
        quer_string_end = camlqueryhelper.query().caml_end

      expect(quer_string_start).equal('<Query>')
      expect(quer_string_end).equal('</Query>')
    })
  })
  describe('getArrayOfQueries',function(){
    it('getArrayOfQueries return array',()=>{
      // assert.isArray(camlqueryhelper.getArrayOfQueries())
    })
  })
  describe('getQueryElement',function(){
    // let query_element = camlqueryhelper.getQueryElement('Operator','FieldName','ValueType','Value')
    it('should return query as a string',()=>{
      // expect(query_element).to.be.a('string')
    })
    it('should not return undefined in a string query',()=>{
      // expect(query_element).not.to.include('undefined');
    })
  })
})