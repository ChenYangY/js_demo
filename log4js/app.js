var log4js = require('log4js');

var log_config = {
	"appenders":[
		{
			type:'console',
			category:'test'
		},
		{
			type:'file',
			filename:'./log/run.log',
			maxLogSize:1024000,
			backups:10,
			category:'RUN'
		}
	],
	replaceConsole:true
};

log4js.configure(log_config);
var run_logger = log4js.getLogger('RUN');
var test_logger = log4js.getLogger('test');


var i = 0;
while(i<70000){
	i++
	run_logger.info(i);
}

exports.run_logger = run_logger;
exports.test_logger = test_logger;


