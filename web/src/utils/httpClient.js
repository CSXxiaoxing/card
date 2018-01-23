//http://visionmedia.github.io/superagent/
import request from 'superagent';

const LOCAL_SERVER = 'http://192.168.31.142:3000';
// const LOCAL_SERVER = 'http://192.168.31.83:666';
const DEV_SERVER = '';
const PRO_SERVER = '';

function getUrl(path) {
    if (path.startsWith('http')) {
        return path;
    }
    return `${LOCAL_SERVER}${path}`;
}

const HttpClient = {
    get: (path, query) => new Promise((resolve, reject) => {
        var req = request
            .get(getUrl(path))
            .query(query)
            .end((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.body);
                }
            });
    }),

    post: (path, formdata, query, vm) => new Promise((resolve, reject) => {
    	// if(vm){ vm['loadingShow'] = true }
        
        if (formdata) {
            formdata['token'] = localStorage.oxToken || '' ;
            formdata['uid'] = localStorage.oxUid || '' ;
        }
        console.log(formdata)
        request
            .post(getUrl(path))
            .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
            .query(query)
            .send(formdata)
            .end((err, res) => {
                if (err) {
                    reject(err);
                    console.log('请求错误')
                    // vm['loadingShow'] = false;
                } else {
                    resolve(res.body);
                    // vm['loadingShow'] = false;
                }
            });
    })
};


export default HttpClient;