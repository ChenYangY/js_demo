
var unzip = require('unzip');
var fs = require('fs');
var upath = require('path');
var process =  require('process');
var packer = require('zip-stream');
var archive =  new packer();
var output = fs.createWriteStream('./string.zip');
var coutput = fs.createWriteStream('./test.zip');
var archiver = require('archiver');
var EventEmitter = require('events');
var arch = archiver.create('zip',{});


var dpath = './decompress';
var	filename = 'iojs-v2.3.3.zip';
var	dst = 'project.zip';
var EventProxy = require('eventproxy');

var ep = new EventProxy();
var emitter = new EventEmitter();

ep.all('create',function(msg){
	fs.exists(msg.dpath,function(flag){
		if(!flag){
			fs.mkdir(msg.dpath,function(err){
				if(err){
					console.log(err);
				}
				ep.emit('decompress',msg);
			});
		}
	});
});

ep.all('clear',function(msg){
	fs.exists(msg.dpath,function(flag){
		if(flag){
			console.time('deldir');
			deldir(msg.dpath);
			console.timeEnd('deldir');
		}
		ep.emit('create',msg);
	});
});

function deldir(path){
	var dirs = null;
	var i = 0 ,j = 0;
	if(fs.existsSync(path)){
		var stat = fs.statSync(path);
		if(stat.isDirectory()){
			dirs = fs.readdirSync(path);
			for(i=0,j=dirs.length;i<j;i++){
				deldir(upath.resolve(path,dirs[i]));
			}
			fs.rmdirSync(path);
		}else if(stat.isFile()){
			fs.unlinkSync(path);
		}
	}
}
ep.all('ergodic',function(msg){
	read_dir(msg.dpath,msg.dpath,function(){
		console.log('hello');
	});
});
ep.all('decompress',function(msg){
	console.time('decompress');
	console.log('--------------');
	try{
		var input = fs.createReadStream(msg.filename);
		input.pipe(unzip.Extract({path:msg.dpath})).on('close',function(err){
			if(err){
				console.log(err);
			}else{
				console.timeEnd('decompress');
				console.log('decompress success');
				ep.emit('ergodic',msg);
			}
		});
	}catch(e){
		console.log(e);
		console.log(e.stack);
	}
});

function ergodic_dir_sync(path){
	if(fs.existsSync(path)){
		var stat = fs.statSync(path);
		var files = null;
		var i = 0,j=0; 
		console.log(path);
		if(stat.isDirectory()){
			files = fs.readdirSync(path);
			for(i=0,j=files.length;i<j;i++){
				console.log(files[i]);
				ergodic_dir(upath.resolve(path,files[i]));
			}	
		}
	}
}
	


/***/
function read_dir(path,dpath,cb){
	// counter
	var queue = [];
	emitter.on('end',function(){
		console.log('ergodic success');
		cb();
	});
	ergodic_dir(path,dpath);
	function ergodic_dir(path,dpath){
		if(fs.existsSync(path)){
			var stat = fs.statSync(path);
			var files = null;
			var i = 0,j=0; 
			console.log(upath.relative(dpath,path));
			if(stat.isDirectory()){
				 fs.readdir(path,function(err,files){
					if(err){
						console.log(err);
					}else{
						for(i=0,j=files.length;i<j;i++){
							queue.push(files[i]);
							ergodic_dir(upath.join(path,files[i]),dpath);
						}
					}
					var res = queue.pop();
					if(!res){
						emitter.emit('end');
					}
					
				});
				
			}else if(stat.isFile()){
				var res = queue.pop();
				if(!res){
					emitter.emit('end');
				}
			}
			
		}
	}
}
arch.on('error',function(err){
	if(err){
		console.log(err);
		throw err;
	}
});


function compress_file(msg){
	
	var output = fs.createWriteStream(msg.filename);
	output.on('close',function(){
	 	console.log('compress success');
	});
	arch.pipe(output);
	ergodic(msg.dpath);	
	function ergodic(path){
		var files = null;
		var i = 0,j = 0;
		if(fs.existsSync(path)){
			var stat = fs.statSync(path);
			var files = null;
			var rpath = upath.relative(msg.dpath,path);
			console.log(rpath);
			if(stat.isDirectory()){
				if(rpath)arch.append(null,{name:rpath+'/'});
				files = fs.readdirSync(path);
				for(i=0,j=files.length;i<j;i++){
					ergodic(upath.resolve(path,files[i]));
				}
				if(path === msg.dpath) arch.finalize();
			
			}else if(stat.isFile()){
				arch.file(path,{name:rpath});
			}
		}
	}
}


ep.emit('clear',{dpath:dpath,filename:'project'});

//compress_file({dpath:dpath,filename:dst});

//ep.emit('clear',{filename:filename,dpath:dpath});

// archive.on('finish',function(err){
	// console.log('archive finished!');
	// archive.pipe(output);
// });
 
// pipe archive where you want it (ie fs, http, etc) 
// listen to the destination's end, close, or finish event 

 
// archive.entry('string contents', { name: 'string.txt' }, function(err, entry) {
  // if (err) throw err;
  // archive.entry(null, { name: 'directory/' }, function(err, entry) {
		// if (err) throw err;
		// archive.entry('124213',{name:'directory/abc.txt'},function(err,entry){
			// if(err) throw err;
			// archive.finish();
		// });
  // });
	
// });