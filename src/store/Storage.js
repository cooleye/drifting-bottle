
//本地数据存储
var Storage = {
    save(k,v){
        // console.log('---------save:',k,v);

        if(window.localStorage.getItem(k)){
            var str = window.localStorage.getItem(k)
            var json = JSON.parse(str);
            if(json[v]){
                json[v] = v;
            }else{
                json[v] = v;
                json.length++;
            }
        
            window.localStorage.setItem(k,JSON.stringify(json));
        }else{
            var arr = {length:1};
            arr[v] = v;
            window.localStorage.setItem(k,JSON.stringify(arr));
        }  
    },
    get(k){
        return JSON.parse(window.localStorage.getItem(k));
    },
    remove(k,v){
        // console.log(k,v)
        var str = window.localStorage.getItem(k)
        if(str){
            var json = JSON.parse(str);
            delete json[v];
            window.localStorage.setItem(k,JSON.stringify(json));
        }else{
            console.log('没有找到数据....')
        }
        
    }
}

export default Storage;