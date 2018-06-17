<template>
    <div class="picked-container">
       <div class="cover">
            
            <div class="panel">
                <div class="panel-header">
                    <h3>来自：<span>0147nvklkjhb35432ggvbbj3454</span></h3>
                </div>
                <div class="content">
                    <p>
                        小哥哥，网恋吗？
                    </p>
                </div>
                
            </div>
            <div class="picked-footer">
                <div><el-button type="primary" round @click="throwHandle">扔回海里</el-button></div>
                <div><el-button type="primary" round @click="responseHandle">回应他/她</el-button></div>
            </div>
       </div>
    </div>
</template>

<script>
export default {

methods:{
    throwHandle(){
        this.$emit('throwIntoSea')
    },
    responseHandle(){
        this.$emit('responseBottle')
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
    width: 8rem;
    height: 11rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-4rem,-6rem);
}

.picked-container .panel{
    width: 7.5rem;
    height: 10rem;
    background: #fff;
    border-radius: 5px;
    margin: 0 auto;
    padding: 0.25rem;
    overflow: scroll;
    position:relative;
}
.picked-container .panel .content{
    width: 100%;
    height: 8rem;
    margin-bottom: 5px;
    overflow:scroll;
    margin-bottom: 10px;
    /* background: #eee; */
    border-radius: 5px;
    margin-top: 50px;
    text-align: left;
    font-size: 0.5rem
}


.picked-container .panel .panel-header{
    position: fixed;
    top: 0;
    width: 7.5rem;
    height: 45px;
    background: #fff;
    border-bottom: solid 1px #eee;
    line-height: 45px;
}


.picked-footer{
    width: 100%;
    display: flex;
    margin-top: 10px;
}

.picked-footer div{
    flex:1;
}
</style>
