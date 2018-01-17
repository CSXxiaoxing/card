import axios from 'axios'
// 192.168.1.25
// var baseUrl = 'http://192.168.31.84:666/';
var baseUrl = 'http://192.168.31.142:3000';

axios.create({
  baseURL: 'http://192.168.31.142:3000',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
})

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

var filterUrl = function(url){
	if(url.startsWith('http')){
		return url;
	}
	return baseUrl + url;
}

export default {
	get: (opts) => new Promise((resolve, reject) => {
		if(opts.vm){
			opts.vm[opts.loading || 'loadingShow'] = true;
		}
		axios.get(filterUrl(opts.url), opts.params).then(function(response){
			if(opts.vm){
				opts.vm[opts.loading || 'loadingShow'] = false;
			}
			resolve(response);
		}).catch(function(error){
			if(opts.vm){
				opts.vm[opts.loading || 'loadingShow'] = false;
			}			
			reject(error);
		})
	}),

	post: (opts) => new Promise((resolve, reject) => {
		if(opts.vm){
			opts.vm[opts.loading || 'loadingShow'] = true;
		}

		console.log(JSON.stringify(opts.params))
		axios.post(filterUrl(opts.url), JSON.stringify(opts.params))
		.then(function(response){
			if(opts.vm){
				opts.vm[opts.loading || 'loadingShow'] = false;
			}
			resolve(response);
		}).catch(function(error){
			resolve(error);
			if(opts.vm){
				// alert('请求有误');
				opts.vm[opts.loading || 'loadingShow'] = false;
			}
			reject(error);
		})
	})
	// post: (opts) => new Promise((resolve, reject) => {
	// 	if(opts.vm){
	// 		opts.vm[opts.loading || 'loadingShow'] = true;
	// 	}
	// 	axios.post(filterUrl(opts.url), opts.params).then(function(response){
	// 		if(opts.vm){
	// 			opts.vm[opts.loading || 'loadingShow'] = false;
	// 		}
	// 		resolve(response);
	// 	}).catch(function(error){
	// 		if(opts.vm){
	// 			alert('请求有误');
	// 			opts.vm[opts.loading || 'loadingShow'] = false;
	// 		}			
	// 		reject(error);
	// 	})
	// })
}