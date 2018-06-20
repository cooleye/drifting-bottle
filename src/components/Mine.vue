<template>
    <div class="mine">
        <header>
            <el-button    type="text" size="small" round icon="el-icon-arrow-left" @click="back">返回</el-button>   <span>我的瓶子</span>
        </header>

        <div class="bottle-list">

            <router-link :to="'/theBottle?bid='+bottle"  v-for="(bottle,i) in bottles"  :key="i">
            <div class="bottle-item" >
                <i class="iconfont icon-12"></i>
                {{bottle}}  <i  style="float:right;margin-top:21px;margin-right:10px;"  class="el-icon-arrow-right"></i>
            </div>
            </router-link>

        </div>
        
        
    </div>
</template>

<script>


import store from '@/store';


export default {

    data(){
        return{
            bottles:[]
        }
    },
    mounted(){
        let bottles = store.getBottleFromStorage("bottles");
        console.log('========>',bottles);
        this.bottles = bottles;
    },
    methods:{
        back(){
            history.back();
        }
    }
}
</script>

<style scoped>

.mine{
    width: 10rem;
    min-width: 320px;
    height: 100%;
    background-color: #fff;
    /* background: url(../assets/st.png) no-repeat #f3d889; */
    background-size: 100% auto;
    position: fixed;
    overflow: scroll
}

header{
    width: 10rem;
    height: 45px;
    background: #333;
    /* border-bottom: solid 1px #ccc; */
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

.bottle-list{
    width: 100%;
    overflow: scroll;
    text-align: left;
    margin-top: 45px;
}

.bottle-list .bottle-item{
    width: 9rem;
    height: 60px;
    margin: 0 auto;
    background-color:rgba(255, 255, 255, 0.95);
    margin-top: 5px;
    line-height: 60px;
    padding-left: 15px;
    font-size: 18px;
    border-radius: 5px;
    border-bottom: solid 1px #eee;
    color: #999;
}
.bottle-list .bottle-item i{
    color:deepskyblue;
}
.bottle-list .bottle-item:hover{
    background-color: #eee;
}
</style>
