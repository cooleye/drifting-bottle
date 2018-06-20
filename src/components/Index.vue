<template>
    <div class="container">
        
        <div class="audio" ref="audio">
            <audio src="/static/pick.mp3" ref="pick"></audio>
            <audio src="/static/throw.mp3" ref="throw"></audio>
        </div>

        <div class="tip" v-show="tip.show">
            {{tip.value}}
        </div>

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
                time:0
            },
            tipTimer:null
        }
    },
    name:"Index",
    components:{PickedBottle,SendBottle,Loading,ResponsePage},
    mounted(){
        console.log(this.$refs.audio)
    },
    watch:{
            tipTimer(){
                console.log(this.tipTimer)
                if(this.tipTimer){
                    if(this.tip.time >=1){
                        this.tip.show = true;
                        clearInterval(this.tipTimer)
                        setTimeout( ()=>{
                            this.tip.show = false;
                        },2000)
                        this.tip.time = 0;
                    }
                }
                
            }
        },
    methods:{
        pickBottle(){
            
            this.loading = true;

            this.tipTimer = setInterval( ()=>{
                                this.time++
                            },1000)
           

            store.pickBottle( res =>{
                this.bottle = res.bottle;

                if(this.bottle == null || res.size <=0){
                    console.log('海里还没有瓶子,,,,,,,')
                    this.loading = false;
                }else{
                    this.showPickedBottle = true;
                    this.loading = false;
                } 
            });
        },
        
        throwBottle(){
            // console.log('扔瓶子......',this.$refs.audio.style.color="red")
            this.showSendBottle = true;
            // console.log(this.$refs.throw)
        },
        throwHandle(){
            console.log('扔回海里。。。。')
            this.showPickedBottle = false;
        },
        responseHandle(){
            console.log("回应他。。。。。")
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
            console.log('msg:',msg)
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
    background: url(../assets/st.png) no-repeat #f3d889;
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
</style>
