<template>
    <div class="container">
        
        <!-- <div class="audio" ref="audio">
            <audio src="/static/pick.mp3" ref="pick"></audio>
            <audio src="/static/throw.mp3" ref="throw"></audio>
        </div> -->


        <Loading    v-show="loading"/>

        <footer>
            <div class="f1"><el-button round type="success" @click="pickBottle">捡一个瓶子</el-button></div>
             <div class="f2"><el-button type="primary" icon="iconfont icon-wode" circle  @click="tomine" ></el-button></div>
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
            loading:false
        }
    },
    name:"Index",
    components:{PickedBottle,SendBottle,Loading,ResponsePage},
    methods:{
        pickBottle(){
            
            this.loading = true;
           
            store.pickBottle( res =>{
                // var json = JSON.parse(res);
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

fonter .f2{
    flex: 1;
}
</style>
