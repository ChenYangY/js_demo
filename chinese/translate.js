var node ={
	his:{
		ver:2,         /* 版本，每次更新增加1 */
		create:{
			time:31241212,		/* seconds from 1970-01-01T00:00:00 */
			user:13				/* create user id */
		},
		update:{
			time:"2015-06-01T15:01:01",
			user:12
		}
	},
	base:{id:2, parent:0, flag:0, title:"wifi模块校验"},
	doc:{ /* docid 为字符串，通过mmd_doc_get获得内容 */
		docid:"0123009312490192301",  
		comments:["934124012134124","23194124214"], //node
		attachments:[{title:"logo", mime:"image/wiki", docid:"32104312843124"}]
	},
	task:{
		 plan_start_time:"2015-06-01T15:01:01",
		 plan_end_time:"2015-06-01T15:01:01",
		 real_start_time:"2015-06-01T15:01:01",
		 real_end_time:"2015-06-01T15:01:01",
		 replay_time:10,			//
		 process:100,				// 任务进度
		 priority:5					//优先级
	}
}

var str = JSON.stringify(node);
var buff = new Buffer(str,'utf8');
// var arr = new Uint8Array(buff.length);
var t = new Uint8Array(buff);

/* for(var i=0,j=buff.length;i<j;i++)
{
	arr[i] = buff.readUInt8(i);
}
var result = new Buffer(arr); */
var result = new Buffer(t);
console.log(result.toString('utf8',0,result.length));
var obj = JSON.parse(result.toString('utf8',0,result.length));
console.log(obj);


/* for(i=0;i<arr.length;i++)
{
	result[i] = arr[i];
}

console.log(result.toString('utf8',0,result.length)); */