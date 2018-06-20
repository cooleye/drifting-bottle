<template>
    <transition name="fade">
    <div class="picked-container">
       <div class="cover">
            
            <div class="panel">
                <div class="panel-header">
                    <span style="font-weight:800">来自：</span><span>{{bottleDate.author}}</span>
                </div>
                <div class="content"  v-if="messages">
                    
                    <div v-for="(item,index) in messages" :key="index">
                            <div class="msg-item">
                                
                                <div class="msg-addr">
                                    <div><img :src="item.imgUrl" alt=""></div>
                                    <div>{{item.from}}</div>
                                </div>
                                <div class="msg-cont">{{item.value}}</div>
                            </div>
                    </div>
                 
                </div>
                
            </div>
            <div class="picked-footer">
                <div><el-button type="danger" round @click="throwHandle">扔回海里</el-button></div>
                <div><el-button type="primary" round @click="responseHandle">回应他/她</el-button></div>
            </div>
       </div>
    </div>
    </transition>
</template>

<script>

import Identicon from 'identicon.js';
import crypto from 'crypto';

export default {
props:['bottle'],
computed:{
    bottleDate(){
        return this.bottle;
    },
    messages(){

        if(this.bottleDate && this.bottleDate.message){
            var messages = this.bottleDate.message;
            var msgArr = JSON.parse(messages);

            if( typeof msgArr == 'object' && msgArr instanceof Array){
                for(var i = 0;i < msgArr.length;i++){
                    let hash = crypto.createHash('md5')
                    hash.update(msgArr[i].from); // 传入用户名
                    let imgData = new Identicon(hash.digest('hex')).toString()
                    var imgUrl = 'data:image/png;base64,'+imgData // 这就是头像的base64码
                    msgArr[i].imgUrl = imgUrl;
                }
                return msgArr;
            }
        }
        
    }
},
methods:{
    throwHandle(){
        this.$emit('throwIntoSea')
    },
    responseHandle(){
        this.$emit('responseBottle');
    }

}
}
</script>

<style scoped>
.picked-container{
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0,0.75);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
}

.picked-container .cover{
    width: 9rem;
    height: 11rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-4.5rem,-6rem);
}

.picked-container .panel{
    width: 8rem;
    height: 10rem;
    background: #fff;
    border-radius: 5px;
    margin: 0 auto;
    padding: 0.25rem;
    overflow: hidden;;
    position:relative;
}
.picked-container .panel .content{
    width: 100%;
    height: 8.7rem;
    margin-bottom: 5px;
    overflow:scroll;
    margin-bottom: 10px;
    /* background: #eee; */
    border-radius: 5px;
    margin-top: 53px;
    text-align: left;
    /* font-size: 0.5rem */
}


.picked-container .panel .panel-header{
    position: fixed;
    top: 0;
    width: 7.5rem;
    height: 45px;
    background: #fff;
    border-bottom: solid 1px #eee;
    line-height: 25px;
    text-align: center;
    font-size: 12px;
    padding-top: 5px;
    padding-bottom: 5px;
}


.picked-footer{
    width: 100%;
    display: flex;
    margin-top: 10px;
}

.picked-footer div{
    flex:1;
}

.msg-item{
    border-bottom: solid 1px #eee;
    padding-top: 5px;
    padding-bottom: 5px;
}

.msg-item img{
    width: 30px;height: 30px;
    /* border-radius: 15px; */
}

.msg-item .msg-addr{
    font-size: 12px;
    color: #999;
    overflow: hidden;
    line-height: 30px;
}
.msg-item .msg-addr div{
    float: left;
}


.msg-item .msg-cont{
    font-size: 16px;
    color: #000;
    margin-top: 3px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
