<template>
    <div class="container">
        <Loading v-show="loading"/>
         <header>
            <el-button   type="text" size="small" round icon="el-icon-arrow-left" @click="back">返回</el-button>   <span>我的瓶子</span>
        </header>

        <div class="content">
                    
            <div class="content-scroll">
                <div v-for="(item,index) in messages" :key="index">
                    <div class="msg-item">
                        
                        <div class="msg-addr">
                            <div><img :src="item.imgUrl" alt=""></div>
                            <div style="margin-left:5px;">{{item.from}}</div>
                        </div>
                        <div class="msg-cont">{{item.msg}}</div>
                    </div>
            </div>
            </div>
                 
        </div>

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

export default {
    data(){
        return{
            bottle:{},
            loading:false
        }
    },
    components:{Loading},
    created(){
        this.loading = true;
        let bid = this.$route.query.bid;
        store.pickBottle(res =>{
            this.bottle = res.bottle;
            console.log(this.bottle)
            this.loading = false;
        },bid)
    },
    computed:{
    bottleDate(){
        return this.bottle;
    },
    messages(){
        var messages = this.bottle.message;
        if(messages){
            var msgArr = messages.split("%startid%");
            var newArr = [];
            console.log('newArr:::::::',newArr)
            for(var i = 1;i < msgArr.length;i++){
                var marr = msgArr[i].split("%startmsg%");

                let hash = crypto.createHash('md5')
                hash.update(marr[0]); // 传入用户名
                let imgData = new Identicon(hash.digest('hex')).toString()
                var imgUrl = 'data:image/png;base64,'+imgData // 这就是头像的base64码
                var mobj = {
                        from:marr[0],
                        msg:marr[1],
                        imgUrl:imgUrl
                    };
                
                newArr.push(mobj);
            }

            return newArr;
        }
         
    }
},
    methods:{
        back(){
            history.back();
        }
    }
}
</script>

<style scoped>

.container{
    position: relative;
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

}

header button{
    position: absolute;
    left: 5px;
    top: 5px;
}

.content{
    width: 100%;
    /* padding: 10px; */
    overflow-x: hidden;
    overflow-y: scroll;
    margin-top: 45px;
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
    background-color: #eee;
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


.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
