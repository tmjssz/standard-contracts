const assert = require('assert');
const path = require('path');
const util = require('./utils');
const async = require('async');

var rlpreadertest;

const bytecode = "60606040526108c7806100126000396000f3606060405236156100615760e060020a600035046304455e9581146100635780639d21923b1461015e578063cd936a5b14610192578063cdef0e9b146101ff578063d572056e14610252578063e5c5e9a3146102b9578063f0f502f814610319575b005b6040805160206004803580820135601f81018490048402850184019095528484526103a8949193602493909291840191908190840183828082843750949650505050505050600061048e610496835b6040805160a081018252600080825260208281018290529282018190526060820181905260808201529082016104a0815b60a060405190810160405280600081526020016000815260200160008152602001600081526020016000815260200150600060006000600060006000875160001a95506080861015610724576040805160a0810182528981526001602082015290810182905260608101829052608081018290529650610719565b6103a860043560243560006104a083835b815160019283015160009190911a9190910360208190036101000a909104010190565b6040805160206004803580820135601f81018490048402850184019095528484526103ba9491936024939092918401919081908401838280828437509496505093359350505050604080516020810190915260008082529081908190816104a76104ba8761054a8a6100b2565b6040805160206004803580820135601f81018490048402850184019095528484526103a89491936024939092918401919081908401838280828437509496505050505050506000610591610598836100b2565b6040805160206004803580820135601f81018490048402850184019095528484526103ba949193602493909291840191908190840183828082843750949650505050505050604080516020810190915260008082529081908190816105a26104ba876100b2565b6040805160206004803580820135601f81018490048402850184019095528484526104209491936024939092918401919081908401838280828437509496505050505050506040805160208101909152600081526105916105b4836100b2565b60408051602060046024803582810135601f8101859004850286018501909652858552610420958335959394604494939290920191819084018382808284375094965050933593505050506040805160208101909152600081526104a08484845b60006020601f83010484602085015b8284146106d35760208402808301518183015260018501945050610389565b60408051918252519081900360200190f35b60405180868152602001858152602001848152602001806020018381526020018281038252848181518152602001915080519060200190602002808383829060006004602084601f0104600f02600301f150905001965050505050505060405180910390f35b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156104805780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b90505b919050565b6040810151610491565b9392505050565b939b929a50909850965090945092505050565b604080516020818101835260008083528451918501519385015191939290808080851561060257886080015193508350836040518059106104f85750595b8181526020918202810190910160405260608a01519095509250600091505b83821015610602576020820283015190508085838151811015610002576020908102909101015260019190910190610517565b9060a060405190810160405280600081526020016000815260200160008152602001600081526020016000815260200150600060008460200151841015156105e157610002565b9050610491565b6080810151610491565b939a9299509097509550909350915050565b60206040519081016040528060008152602001506000600060006000600086604001511561060e57610002565b5050606083015160208302810151906105f9826100e3565b95945050505050565b50505091939590929450565b8651805160001a94509250608084101561066d5760016040518059106106315750595b9080825280602002602001820160405250955085508360f860020a0286600081518110156100025782901a9060200153505b5050505050919050565b60b884101561068c5760208701516000190194506001830191506106a8565b5050602085015182900360b601925081810160b5190160b61983015b846040518059106106b65750595b81815260209182028101909101604052955061066382878761037a565b6000865160200187015250505050505050565b6020848102860160a0810160409081528a8252918101859052600191810191909152606081018690526080810185905296505b505050505050919050565b60b8861015610762576040805160a081018252898152607e198801602082015260009181018290526060810182905260808101919091529650610719565b60c08610156107885760a0604051908101604052808981526020016107c38a60b761016f565b8560c014156107e3576040805160a0810182528981526001602082018190529181019190915260006060820181905260808201529650610719565b815260006020820181905260408201819052606091909101529650610719565b604051945060f88610156108035760be198601925060018801915061081a565b60f5198887010191506108178860f761016f565b92505b508187015b808210156106e657602084028501829052815160001a95506080861161084b57600191909101906108bb565b60b886101561086157908501607e1901906108bb565b60c08610156108755761088a8260b761016f565b8560c0141561089457600191909101906108bb565b91909101906108bb565b60f88610156108aa5790850160be1901906108bb565b6108b58260f761016f565b91909101905b6001939093019261081f56";
const ABI = [{"constant":true,"inputs":[{"name":"rlp","type":"bytes"}],"name":"testIsList","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"pos","type":"uint256"},{"name":"rlpOffset","type":"uint256"}],"name":"lenLong","outputs":[{"name":"len","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"rlp","type":"bytes"},{"name":"index","type":"uint256"}],"name":"item","outputs":[{"name":"memPtr","type":"uint256"},{"name":"length","type":"uint256"},{"name":"isList","type":"bool"},{"name":"list","type":"uint256[]"},{"name":"listLen","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"rlp","type":"bytes"}],"name":"tstNumItems","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"rlp","type":"bytes"}],"name":"testItem","outputs":[{"name":"start","type":"uint256"},{"name":"len","type":"uint256"},{"name":"isList","type":"bool"},{"name":"list","type":"uint256[]"},{"name":"listLen","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"rlp","type":"bytes"}],"name":"decode","outputs":[{"name":"bts","type":"bytes"}],"type":"function"},{"constant":true,"inputs":[{"name":"btsPtr","type":"uint256"},{"name":"tgt","type":"bytes"},{"name":"btsLen","type":"uint256"}],"name":"copyToBytes","outputs":[{"name":"btsOut","type":"bytes"}],"type":"function"}];

describe('Codec', function () {

    describe('RLPReader', function () {

        before(function (done) {
            this.timeout(300000); // 5 minutes.
            util.initWeb3(function (err) {
                if (err)
                    return done(err);
                util.deploy(ABI, bytecode, function (err, contract) {
                    if (err)
                        return done(err);
                    rlpreadertest = contract;
                    done();
                });
            });
        });

        describe('#toRLPItem(bytes)', function () {

            it('should decode RLP encoded strings', function (done) {
                async.forEachOfSeries(testStrings, function (testData, idx, cb) {
                        rlpreadertest.decode(testData.input, function (err, result) {
                            assert.ifError(err);
                            assert.equal(result, testData.result);
                            cb();
                        })
                    }, function () {
                        done();
                    }
                );
            });

            it('should create an RLP item from encoded lists', function (done) {
                async.forEachOfSeries(testLists, function (testData, idx, cb) {
                        rlpreadertest.testItem(testData.input, function (err, result) {
                            assert.ifError(err);
                            console.log("RESULT:");
                            console.log(result);
                            console.log("");
                            var eRes = testData.result;
                            var memPtr = result[0].toNumber();
                            var len = result[1].toNumber();
                            assert.equal(len, eRes.length);
                            var isList = result[2];
                            assert(isList);
                            var list = result[3];
                            var listLen = result[4].toNumber();
                            if(listLen > 0) {
                                //console.log(list);
                                //console.log(eRes.list);
                                for(var i = 0; i < listLen; i++) {
                                    var le = list[i].toNumber();
                                    assert.equal(le - memPtr, eRes.list[i]);
                                }
                            }
                            cb();
                        })
                    }, function () {
                        done();
                    }
                );
            });

        });

    });

});

const testStrings = [
    {
        input:  "0x00",
        result: "0x00"
    }, {
        input:  "0x05",
        result: "0x05"
    }, {
        input:  "0x80",
        result: "0x"
    }, {
        input:  "0x820505",
        result: "0x0505"
    }, {
        input:  "0x880102030405060708",
        result: "0x0102030405060708"
    }, {
        input:  "0xB701020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607",
        result: "0x01020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607"
    }, {
        input:  "0xB8380102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708",
        result: "0x0102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708"
    }, {
        input:  "0xB9010001020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708",
        result: "0x01020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708"
    }
];

// List is offset by starting memory address in tests.
const testLists = [
    // Empty list
    {input: "0xC0", result: {length: 1, list: []}},
    // List of length 1 items
    {input: "0xC80102030405060708", result: {length: 9, list: [1, 2, 3, 4, 5, 6, 7, 8]}},
    // List of empty lists
    {input: "0xC3C0C0C0", result: {length: 4, list: [1, 2, 3]}},
    // List of lists
    {input: "0xC6C20102C20102", result: {length: 7, list: [1, 4]}},
    // List of strings and lists mixed
    {input: "0xC8C201028101C20102", result: {length: 9, list: [1, 4, 6]}},
    // List of length 55
    {input: "0xF7B6010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506", result: {length: 56, list: [1]}},
    // List of length > 55
    {input: "0xF838B701020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607", result: {length: 58, list: [2]}},
    // List of length with length > 255
    {input: "0xF90103B9010001020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708", result: {length: 262, list: [3]}},
];