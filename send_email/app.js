var nodemailer = require('nodemailer');
var smtpstransport = require('nodemailer-smtp-transport');

	var config = {
		host:'smtp.163.com',
		port:'25',
		auth:{
			user:'hn2cyy@163.com',
			pass:'cyy430422'
		}
};

var transporter = nodemailer.createTransport(smtpstransport(config));


var oa_center = "OA Center<hn2cyy@163.com>";

/**
	function:send_err_email
		@description:
			send email to developer when system have some errors.
		@param  from		string	email addr the email sender.
		@param 	to  		string	the email address ,which to  recevie email
		@param 	subject   	string	the email subject;
		@param 	text		string	the email plaintext
*/
function send_err_email(from,to,subject,text){
	var err_option = new Object();
	err_option.from = from;
	err_option.to = to;
	err_option.subject = subject;
	err_option.text = text;
	err_option.html = '<b style="color:red;">'+text+'</b>';
	transporter.sendMail(err_option,function(err,info){
		if(err)	
			return console.log(err);
		console.log('Sent Message:'+ info.response);
	});
}

function send_reg_email(from,to,info){
	var reg_option = new Object();
	reg_option.from = from;
	reg_option.to = to;
	reg_option.subject = "register information:"+info.alias;
	var html = '<div>\
					<label><b>用户名：</b></labe><span>'+info.username+'</span><br>\
					<label><b>姓名：</b></labe><span>'+info.alias+'</span><br>\
					<label><b>部门：</b></labe><span>'+info.department+'</span><br>\
				</div>';
	var text = html.replace(/<br>/g,'\n').replace(/<\/?[a-z|A-Z].*?>/g,'');
	reg_option.text = text;
	reg_option.html = html;
	transporter.sendMail(reg_option,function(err,info){
		if(err)	
			return console.log(err);
		console.log('Sent Message:'+ info.response);
	});
}

// try{
	
	// throw new Error("this test error");
// }catch(e){
	// send_err_email(oa_center,'940594502@qq.com',e.toString(),e.stack);
// }


var info = {
	username:'admin',
	alias:'张三',
	department:'研发部'
};
send_reg_email(oa_center,'940594502@qq.com',info);


exports.send_reg_email = send_reg_email;
exports.send_err_email = send_err_email;

