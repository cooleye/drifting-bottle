<template>
    <div class="container">
        
        <Loading      v-show="loading"/>

        <footer>
            <div><el-button round type="success" @click="pickBottle">捡一个瓶子</el-button></div>
            <div><el-button round type="danger" @click="throwBottle">扔一个瓶子</el-button></div>
        </footer>

    <PickedBottle  :bottle="bottle"  v-show="showPickedBottle" @throwIntoSea="throwHandle"  @responseBottle="responseHandle"/>
    <SendBottle v-show="showSendBottle" @sendMsg="sendMsg" @cancelMsg="cancelMsg"/>
    <ResponsePage v-show="showResponsePage"  @responseMsg="responseMsg"/>
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
                var json = JSON.parse(res);
                this.bottle = json.bottle;
                this.showPickedBottle = true;
                this.loading = false;
            });
        },
        throwBottle(){
            console.log('扔瓶子......')
            this.showSendBottle = true;
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
           var bottleId = this.bottle.id;
           store.responseMsg(msg,bottleId)
        },
        sendMsg(msg){
            this.showSendBottle = false;
            console.log('msg:',msg)
            store.sendMsg(msg);
        },
        cancelMsg(){
            this.showSendBottle = false;
            this.showResponsePage = false;
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
    padding:5px 0px;
    text-align: center;
    width:10rem;
}

footer div{
    flex: 1;
}

</style>
