<template>
    <div class="container">
         <Loading v-show="loading"/>
         <header>
            <el-button   type="text" size="small" round icon="el-icon-arrow-left" @click="back">返回</el-button>   <span>来自：{{bottleDate.author | ellipsisAddr}}</span>
        </header>

        <div class="content">
                    
            <div class="content-scroll">
                <div v-for="(item,index) in messages" :key="index">
                    <div class="msg-item">
                        
                        <div class="msg-addr">
                            <div><img :src="item.imgUrl" alt=""></div>
                            <div style="margin-left:5px;">{{item.from}}</div>
                            <div style="float:right">{{index+1}}楼</div>
                        </div>
                        <div class="msg-cont">{{item.value}}</div>
                    </div>
            </div>
            </div>
                 
        </div>


        <ResponsePage v-show="showResponsePage"  @responseMsg="responseMsg"  @cancelRes="cancelRes"/>

        <footer>
            <div><el-button type="danger" round  @click="throwHandle">扔回海里</el-button></div>
            <div><el-button type="primary" round @click="responseHandle">回应他/她</el-button></div>
        </footer>

    </div>
</template>

<script>
import store from '@/store';
import Loading from '@/components/loading';
import Identicon from 'identicon.js';
import crypto from 'crypto';
import ResponsePage from '@/components/responsePage';

export default {
    data(){
        return{
            bottle:{},
            loading:false,
            showResponsePage:false,
        }
    },
    components:{Loading,ResponsePage},
    mounted(){
        this.loading = true;
        let bid = this.$route.query.bid;
        store.pickBottle(res =>{
            this.bottle = res.bottle;
            this.loading = false;
        },bid)
    },
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
    filters:{
        ellipsisAddr(char){

            if(char){
                var start = char.slice(0,5);
                var end = char.slice(char.length-6,-1);
                var str = start + '....' + end;
                return str;
            }else{
                return char;
            }
            
        }
    },
    methods:{
        back(){
            history.back();
        },
        throwHandle(){
            store.removeBottleFromStorage("bottles",this.bottle.id)
            setTimeout( ()=>{
                this.$router.push('/mine')
            })
        },
         responseMsg(msg){
           this.showResponsePage = false;
           if(msg){
               var bottleId = this.bottle.id;
               store.responseMsg(msg,bottleId)
           }
           
        },
        cancelRes(){
            this.showResponsePage = false;
        },
        responseHandle(){
            this.showResponsePage = true;
        }
    }
}
</script>

<style scoped>

.container{
    position: relative;
    background-color: #eee;
}

header{
    width: 10rem;
    height: 45px;
    background: #333;
    color: #fff;
    font-size: 16px;
    text-align: center;
    line-height: 45px;
    position: fixed;
    top: 0;
    z-index: 9999;

}

header button{
    position: absolute;
    left: 5px;
    top: 5px;
    text-align: center;
}

header>span{
    font-size: 16px;
}
.content{
    width: 100%;
    /* padding: 10px; */
    overflow-x: hidden;
    overflow-y: scroll;
    margin-top: 45px;
    margin-bottom: 50px;
    background-color: #fff;
    /* position: fixed; */
}

.content .content-scroll{
    width: 9rem;
    height: auto;
}

.content .msg-item{
    width: 9rem;
    padding: 5px 0.5rem;
    padding-top: 10px;
    border-bottom: solid 1px #eee;
}


.msg-item{
    border-bottom: solid 1px #eef;
    padding-top: 5px;
    padding-bottom: 5px;
    text-align: left;
    padding: 10px 10px;
}

.msg-item:hover{
    background-color: #f0faff;
}

.msg-item img{
    width: 30px;height: 30px;
}

.msg-item .msg-addr{
    font-size: 12px;
    color: #999;
    overflow: hidden;
    line-height: 45px;
}
.msg-item .msg-addr div{
    float: left;
}


.msg-item .msg-cont{
    font-size: 16px;
    color: #000;
    margin-top: 3px;
    margin-left: 25px;
}



footer{
    width: 10rem;
    height: 45px;
    background-color: #fff;
    border-top: solid 1px #eee;
    position: fixed;
    bottom: 0;
    display: flex;
    line-height: 45px;
    padding-top: 5px;
}

footer div{
    flex: 1;
}

button{
    color:#fff;
}
button:hover{
    color: #fff;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
