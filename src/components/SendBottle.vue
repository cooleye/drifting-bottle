<template>
    <div class="send-container">
        <div class="cover">
            <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="textarea">
            </el-input>
            <div>
                <el-button  round type="success" style="width:100%;margin-top:10px;" @click="send">发 送</el-button>
            </div>
            <div>
                <el-button  round type="danger" style="width:100%;margin-top:10px;" @click="cancel">取 消</el-button>
            </div>
            
            
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return{
            textarea:""
        }
    },
    methods:{
        send(){
            this.$emit('sendMsg')
        },
        cancel(){
            this.$emit('cancelMsg')
        }
    }
}
</script>

<style scoped>

.send-container{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.75);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
}

.send-container .cover{
    width: 8rem;
    margin: 1rem auto;
}
textarea{
    font-size: 0.5rem;
}
</style>
