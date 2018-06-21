
//本地数据存储
var Storage = {
    save(k,v){
        console.log('---------save:',k,v);

        if(window.localStorage.getItem(k)){
            var str = window.localStorage.getItem(k)
            var json = JSON.parse(str);
            if(json[v]){
                json[v] = v;
            }else{
                json[v] = v;
                json.length++;
            }
            // if(json.size > 0){
                
               
            // }
            // if(json.length > 0){
            //     for(var i = 0;i < json.length;i++){
            //         if(json[i] == v){
            //             break;
            //         }else{
            //             json.push(v);
            //         }
            //     }
            // }else{
            //     json.push(v);
            // }
            
            console.log('1本地存储：',json)
            window.localStorage.setItem(k,JSON.stringify(json));
        }else{
            var arr = {length:0};
            arr[v] = v;


            console.log('2本地存储：',arr)
            window.localStorage.setItem(k,JSON.stringify(arr));
        }  
    },
    get(k){
        return JSON.parse(window.localStorage.getItem(k));
    },
    remove(k,v){
        console.log(k,v)
        var str = window.localStorage.getItem(k)
        if(str){
            var json = JSON.parse(str);
            // for(let i = 0; i < json.length;i++){
            //     if(v == json[i]){
            //         json.splice(i,1)
            //     }
            // }
            delete json[v];
            window.localStorage.setItem(k,JSON.stringify(json));
        }else{
            console.log('没有找到数据....')
        }
        
    }
}

export default Storage;