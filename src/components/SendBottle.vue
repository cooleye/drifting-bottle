<template>
<transition name="fade">
    <div class="send-container">
        <div class="cover">
            <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            v-model="textarea"
            style="font-size:16px;"
            >
            </el-input>
            <div>
                <el-button  round type="success" style="width:100%;margin-top:10px;" @click="send">发 送</el-button>
            </div>
            <div>
                <el-button  round type="danger" style="width:100%;margin-top:10px;" @click="cancel">取 消</el-button>
            </div>
        </div>
    </div>
</transition>
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
            if(this.textarea === ""){
                return;
            }else{
                this.$emit('sendMsg',this.textarea)
                this.textarea = ""
            }
            
        },
        cancel(){
            this.$emit('cancelMsg')
            this.textarea = ""
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
    position: relative;
}

.send-container .cover{

    width: 8rem;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -4rem;
    margin-top: -4.5rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
