'use strict';

let should = require('chai').should(),
  expect = require('chai').expect,
  eq = require('../dist/eq.typeclass'),
  testSubject = [], testConfig
  ;

function TestSubject(field1,field2){
  this.field1=field1;
  this.field2=field2
}

testConfig = new eq.EqConfig();

eq.Eq.field({fuzzy:true})(TestSubject,'field1');
eq.Eq.field({})(TestSubject,'field2');
eq.Eq.implement({config:testConfig})(TestSubject);

testSubject.push(new TestSubject("adam",1));
testSubject.push(new TestSubject("adea",48));
testSubject.push(new TestSubject("jzuri",13));
testSubject.push(new TestSubject("jzuri",2));

describe('#decorate', function() {

  it('is config correct initialized', function () {
    testConfig.fields.length.should.equal(2);
    testConfig.fields[0].name.should.equal("field1");
    testConfig.fields[1].name.should.equal("field2");
  });

  it('correct implementation', function () {
    expect(() => eq.Eq.eq(testSubject, new TestSubject(null, 2))).to.throw(Error);
    expect(() => eq.Eq.neq(testSubject, new TestSubject(null, 2))).to.throw(Error);
  });

});

describe('#EqLib', function() {
  it('is eq with null correct', function(){
    eq.Eq.eq(testSubject, new TestSubject(null,2), testConfig)[0].should.equal(testSubject[3], "Number Field must be last testsubject with 2");
    eq.Eq.eq(testSubject, new TestSubject("jzuri",null), testConfig).should.deep.equal(testSubject.slice(2,4),"Eq search muss reveal the two Jzuris");
    eq.Eq.eq(testSubject, new TestSubject("jzuri",2), testConfig).should.deep.equal(testSubject.slice(3,4),"Eq search muss reveal the Jzuris with number 2");
  });

  it('is eq correct', function(){
    eq.Eq.eq(testSubject, new TestSubject("jz",2), testConfig)[0].should.equal(testSubject[3], "Fuzzy field and number field");
    eq.Eq.eq(testSubject, new TestSubject("ad",47), testConfig).should.deep.equal([],"nothing matches");
    eq.Eq.eq(testSubject, new TestSubject("zd",48), testConfig).should.deep.equal([],"nothing matches");
  });

  it('is fuzzyEq correct', function(){
    eq.Eq.fuzzyEq(testSubject, new TestSubject("ad",null), testConfig).should.deep.equal(testSubject.slice(0,2),"Fuzzy search muss reveal Adam and Adea");
  });

  it('is neq with null correct', function(){
    eq.Eq.neq(testSubject, new TestSubject(null,2), testConfig).should.deep.equal(testSubject.slice(0,3),"Neq search muss reveal all the none twos");
    eq.Eq.neq(testSubject, new TestSubject("ad",null), testConfig).should.deep.equal(testSubject.slice(2,4),"Neq search muss reveal all the none ads");
  });

  it('is neq correct', function(){
    eq.Eq.neq(testSubject, new TestSubject("jz",2), testConfig).should.deep.equal(testSubject.slice(0,3),"all none twos and js-s");
    eq.Eq.neq(testSubject, new TestSubject("ad",2), testConfig).should.deep.equal(testSubject,"nothing matches");
  });
});

describe('#EqConfig', function() {
});

describe('#EqOr', function() {
});
