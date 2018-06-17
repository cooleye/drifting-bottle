<template>
    <div class="container">
        <footer>
            <div><el-button round type="success" @click="pickBottle">捡一个瓶子</el-button></div>
            <div><el-button round type="danger" @click="throwBottle">扔一个瓶子</el-button></div>
        </footer>

    <PickedBottle  v-show="showPickedBottle" @throwIntoSea="throwHandle"  @responseBottle="responseHandle"/>
    <SendBottle v-show="showSendBottle" @sendMsg="sendMsg" @cancelMsg="cancelMsg"/>
    </div>
</template>

<script>

import PickedBottle from '@/components/PickedBottle';
import SendBottle from '@/components/SendBottle';

import store from '@/store';

export default {
    data(){
        return{
            showPickedBottle:false,
            showSendBottle:false
        }
    },
    name:"Index",
    components:{PickedBottle,SendBottle},
    mounted(){
        store.add();
    },
    methods:{
        pickBottle(){
            console.log('捡瓶子。。。。')
            this.showPickedBottle = true;
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
            console.log("响应他》。。。。。")
            this.showPickedBottle = false;
            this.showSendBottle = true;
        },
        sendMsg(){
            this.showSendBottle = false;
        },
        cancelMsg(){
            this.showSendBottle = false;
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
