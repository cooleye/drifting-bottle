<template>
    <div class="mine">
        <header>
            <router-link to="/index">
                <el-button    type="text" size="small" round icon="el-icon-arrow-left">返回</el-button>
            </router-link>
               <span>我的瓶子</span>
        </header>

        <div class="warning"  v-if="warning">
            <h1>您还没有捞起任何瓶子，快去捞一个吧</h1>
        </div>
        <div class="bottle-list" v-if="bottles">

            <router-link  class="bottle-item"  v-for="(bottle,i) in bottles"   v-if="i!='length'" :to="'/theBottle?bid='+bottle"   :key="i">
              
             <i class="iconfont icon-12"></i>
            {{bottle}}  <i  style="float:right;margin-top:21px;margin-right:10px;"  class="el-icon-arrow-right"></i>

            </router-link>

        </div>
        
        
    </div>
</template>

<script>


import store from '@/store';

export default {

    data(){
        return{
            bottles:null,
            warning:true
        }
    },
    mounted(){
        let bottles = store.getBottleFromStorage("bottles");
       
        if(bottles && bottles.length > 0){
            
            this.bottles = bottles;
            this.warning = false;
        }else{
            this.warning = true;
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
    display: block;
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
    color: #555;
}


.warning{
    text-align: center;
    padding-top: 100px;
    color: #666;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

button{
    color:#fff;
}
button:hover{
    color: #fff;
}
.bottle-list .bottle-item i{
    color:deepskyblue;
}
.bottle-list .bottle-item:hover{
    background-color: #f0faff;
}
</style>
