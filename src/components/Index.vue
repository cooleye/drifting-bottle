<template>
    <div class="container">
        
        <!-- <div class="audio" id="audio"  ref="audio">
            <audio src="/static/pick.mp3" id="m_pick"></audio>
            <audio src="/static/throw.mp3" ref="m_throw"></audio>
        </div> -->

        <!-- 微信端提示 -->
        <div class="wxwarning" v-if="wxwarning"></div>

        <transition name="fade">
        <div class="tip" v-show="tip.show">
            {{tip.value}}
        </div>
        </transition>

        <Loading    v-show="loading"/>

        <footer>
            <div class="f1"><el-button round type="success" @click="pickBottle">捡一个瓶子</el-button></div>
             <div class="f2">
                 <el-button type="primary" icon="iconfont icon-wode" circle  @click="tomine"   style="width:65px;height:65px;margin-top:-25px;"></el-button>
             </div>
            <div class="f1"><el-button round type="danger" @click="throwBottle">扔一个瓶子</el-button></div>
        </footer>

    <PickedBottle  :bottle="bottle"  v-show="showPickedBottle" @throwIntoSea="throwHandle"  @responseBottle="responseHandle"/>
    <SendBottle v-show="showSendBottle" @sendMsg="sendMsg" @cancelMsg="cancelMsg"/>
    <ResponsePage v-show="showResponsePage"  @responseMsg="responseMsg"  @cancelRes="cancelRes"/>
    </div>
</template>

<script>

import PickedBottle from '@/components/PickedBottle';
import SendBottle from '@/components/SendBottle';
import ResponsePage from '@/components/responsePage';
import Loading from '@/components/loading';
import store from '@/store';

export default {
    data(){
        return{
            showPickedBottle:false,
            showSendBottle:false,
            showResponsePage:false,
            bottle:{},
            loading:false,
            tip:{
                value:"捡到了一个贝壳，再试一下",
                show:false,
            },
            time:0,
            tipTimer:null,
            wxwarning:false
        }
    },
    name:"Index",
    components:{PickedBottle,SendBottle,Loading,ResponsePage},
    mounted(){
       
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
　　　　    //微信
            this.wxwarning = true;
　　　　  }else{
            this.wxwarning = false;
　　　　 }

        // this.m_pick = this.$refs.audio;
    },
    watch:{
            time(){
                if(this.tipTimer){
                    if(this.time > 10){
                        this.tip.show = true;
                        clearInterval(this.tipTimer)
                        this.loading = false;
                        setTimeout( ()=>{
                            this.tip.show = false;
                        },2000)
                        this.time = 0;
                    }
                }
                
            }
        },
    methods:{
        pickBottle(){
            
            this.loading = true;
            this.tip.show = false;

            this.tipTimer = setInterval( ()=>{
                                this.time++
                            },1000)
           

            store.pickBottle( res =>{
                if(res){
                    if(res.state == 'fail'){
                         this.loading = false;
                         this.tip.show = true;
                         clearInterval(this.tipTimer);
                         this.time = 0;
                         console.log('海里还没有瓶子,,,,,,,1')
                    }else{
                        this.bottle = res.bottle;
                        if(this.bottle == null || res.size <=0){
                            console.log('海里还没有瓶子,,,,,,,2')
                            this.loading = false;
                            this.tip.show = false;
                        }else{
                            if(this.time < 10){
                                clearInterval(this.tipTimer);
                                this.time = 0;
                                this.showPickedBottle = true;
                                this.loading = false;
                            }
                            
                        } 
                    }
                }else{
                    console.log('海里还没有瓶子,,,,,,,3')
                    this.tip.show = true;
                    this.loading = false;
                    clearInterval(this.tipTimer);
                    this.time = 0;
                }
                
            });
        },
        
        throwBottle(){
            this.showSendBottle = true;
        },
        throwHandle(){
            this.showPickedBottle = false;
        },
        responseHandle(){
            this.showPickedBottle = false;
            this.showResponsePage = true;
        },
        responseMsg(msg){
           this.showResponsePage = false;
           if(msg){
               var bottleId = this.bottle.id;
               store.responseMsg(msg,bottleId)
           }
           
        },
        sendMsg(msg){
            this.showSendBottle = false;
            if(msg){
                store.sendMsg(msg);
            }
            
        },
        cancelMsg(){
            this.showSendBottle = false;
            this.showResponsePage = false;
        },
        cancelRes(){
            this.showResponsePage = false;
        },
        tomine(){
            this.$router.push("/mine");
        }   


    }
}
</script>

<style scoped>

.container{
    width: 10rem;
    min-width: 320px;
    height: 100%;
    background: url(../assets/stbgn.png) no-repeat #f3d889;
    background-size: 100% auto;
    position: relative;
    overflow: hidden;
}

footer{
    position: fixed;
    bottom: 0;
    background: #333;
    width: 100%;
    display: flex;
    padding:8px 0px;
    text-align: center;
    width:10rem;
}

footer .f1{
    flex: 2;
}

footer .f2{
    flex: 1;
}

footer .f2 button{
    border: solid 5px #333;
}

.tip{
    margin-top: 10rem;
    font-size: 24px;
}

.wxwarning{
    width: 100%;
    height: 100%;
    background: url(../assets/tip.png) no-repeat rgba(0, 0, 0, 0.75);
    background-size: 100%;
    text-align:center;
    z-index: 9999999;
    position: absolute;
    color: #fff;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
