import nebulas from 'nebulas';
import NebPay from 'nebpay.js';

import Storage from './Storage';

var Account = nebulas.Account,
neb = new nebulas.Neb();

// neb.setRequest(new nebulas.HttpRequest("https://testnet.nebulas.io"));
neb.setRequest(new nebulas.HttpRequest("https://mainnet.nebulas.io"));



/**
 * 测试网：
 * hash: fc92369a3c064813d7f51a872ece779656248041f8a9ca8ae6a957569d4dc6d3
 
    n21KyfrdveH2tnS4KoLz4hs8tqzwJ8vmtVT
 * 
 * passphrase
 * 
 * 
 * 主网：
 * hash：4b756fbb1e88b33a8e5c20654e6c7e88be82e0af52a51bde23a5afef1eabd2b7
 
    n1iCbATJzwujSxLAMYQ4gAvsHa7NtRcoA4E
 */
var dappAddress = 'n1iCbATJzwujSxLAMYQ4gAvsHa7NtRcoA4E';

var callbackUrl = NebPay.config.mainnetUrl;   //如果合约在主网,则使用这个
// var callbackUrl = NebPay.config.testnetUrl;  

var nebPay = new NebPay();
  
var serialNumber;

/**
 * 
 * @param {*} msg 
 * 扔一个瓶子
 */
function sendMsg(msg){

    var to = dappAddress;
    var value = "0";
    var callFunction = "sendBottle"

    var callArgs = JSON.stringify([msg]);

    serialNumber = nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
        listener: cbPush,       //设置listener, 处理交易返回信息
        callback: callbackUrl
    });

    intervalQuery = setInterval(function () {
        funcIntervalQuery();
    }, 10000);

}

/**
 * 
 * @param {*} callback 
 * 捡到一个瓶子
 */
function pickBottle(callback,bottleId){
   
    var from = Account.NewAccount().getAddressString();

    var value = "0";
    var nonce = "0"
    var gas_price = "1000000"
    var gas_limit = "2000000"
    var callFunction = "pickBottle";
    var callArgs = JSON.stringify([bottleId]);  //推荐用 JSON.stringify 来生成参数字符串,这样会避免出错!
    var contract = {
        "function": callFunction,
        "args": callArgs
    }

    neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (resp) {
        cbSearch(callback,resp)
    }).catch(function (err) {
        console.log("error:" + err.message)
    })


}


/**
 * 
 * @param {*} msg 
 * @param {*} bottleId 
 * 响应一个瓶子
 */
function responseMsg(msg,bottleId){
    var to = dappAddress;
    var value = "0";
    var callFunction = "responseBottle"

    var callArgs = JSON.stringify([msg,bottleId]);

    serialNumber = nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
        listener: cbPush,       //设置listener, 处理交易返回信息
        callback: callbackUrl
    });


    Storage.save("bottles",bottleId);

    intervalQuery = setInterval(function () {
        funcIntervalQuery();
    }, 10000);
}

function  cbSearch(callback,resp){
    if(resp){
        var result = resp.result;
        var json = JSON.parse(result);
        // console.log('>>>>>>>>>>>>>>>>>>>>查询返回结果>>>>>>>>>>>>>>>>>>>')  
        // console.log(result)
        //保存在localStorage
        // console.log('>>>>>>>>>>>>>>>>>>>>查询返回结果>>>>>>>>>>>>>>>>>>>')
        callback(json)
    }else{
        callback({
            state:'fail'
        })
    }
   
    
}
var intervalQuery

function funcIntervalQuery() {
    var options = {
        callback: callbackUrl
    }
    nebPay.queryPayInfo(serialNumber,options)   //search transaction result from server (result upload to server by app)
        .then(function (resp) {
            // console.log(">>>>>>>>>>tx result: " + resp)   //resp is a JSON string
            var respObject = JSON.parse(resp)
            if(respObject.code === 0){
                clearInterval(intervalQuery);
                // console.log(`set value succeed!`);
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}


function cbPush(resp) {
    // console.log(">>>>>>>>>> send of push: " + JSON.stringify(resp))
    var respString = JSON.stringify(resp);
    if(respString.search("rejected by user") !== -1){
        clearInterval(intervalQuery)
        // alert(respString)
    }else if(respString.search("txhash") !== -1){
        // console.log("wait for tx result: " + resp.txhash)
    }

    //定时移除安装星云钱包按钮；
    removeInstallNebulasWalletDiv();
}


function getBottleFromStorage(k){
    return Storage.get(k);
}


function removeBottleFromStorage(k,v){
    Storage.remove(k,v)
}


function removeInstallNebulasWalletDiv(){
    var div = document.getElementsByClassName('install-background')[0];
    if(div){
        div.parentNode.removeChild(div);
    }
   
}

export default{
    sendMsg,
    pickBottle,
    responseMsg,
    getBottleFromStorage,
    removeBottleFromStorage
}