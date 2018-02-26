//http://visionmedia.github.io/superagent/
import request from 'superagent';

const LOCAL_SERVER = 'http://game.hengpukj.com';
// const LOCAL_SERVER = 'http://www.wanjiba888.com';
// const LOCAL_SERVER = 'http://192.168.31.142:3000';

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
        
        if(vm){ vm['loading'] = true }
    	
        if (formdata) {
            formdata['token'] = localStorage.oxToken || '' ;
            formdata['uid'] = localStorage.oxUid || '' ;
        }
        request
            .post(getUrl(path))
            .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
            .query(query)
            .send(formdata)
            .end((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.body);
                }
                if(vm)(vm['loading'] = false)
            });
    })
};

export default HttpClient;