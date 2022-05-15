const env = "product";
module.exports = {
    root: function() {
        let url;
        switch (env) {
            case "dev":
                // url = "http://192.168.31.160:8081/"
                // url = "http://192.168.31.40:8082/"
                // url = "http://192.168.31.189:8082/"
                url = ""
                break;
            case "test":
                url = ""
                break;
            case "product":
                // url = "https://recycle-api.junwuculture.cn/"
                url = ""
                break;
            default:
                url = ""
                break;
        }
        return url;
    }(),
    scoket: function() {
        let url;
        switch (env) {
            case "dev":
                // url = "ws://192.168.31.190:8080/"朱
                // url = "ws://192.168.31.40:8082/"
                url = ""

                break;
            case "test":
                url = ""
                break;
            case "product":
                // url = "wss://recycle-api.junwuculture.cn/"
                url = ""

                break;
            default:
                url = ""
                break;
        }
        return url;
    }(),
    staticURL: (url)=>{
        // return `https://recycle.junwuculture.cn/${url}`
        return `/static/${url}`
        // return `https://junwu-recovery.oss-cn-qingdao.aliyuncs.com/recycleUser/static/${url}`
    },
    uploadURL: (url)=>{
        return `https://123/${url}`
    },
}