
function date_format(date, format) {
    if(format === undefined && typeof(date) ==='string'){
        format = date;
        date = new Date();
    }
	else
	{
		error = new Error('arg errors');
		throw error;
	}
    var map = {
        "M": date.getMonth() + 1, //月份 
        "D": date.getDate(), //日 
        "h": date.getHours(), //小时 
        "m": date.getMinutes(), //分 
        "s": date.getSeconds(), //秒 
        "q": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    format = format.replace(/([YMDhmsqS])\1+/g, function(all, t){
        var v = map[t];
        if(v !== undefined){
            if(all.length > 1){
                v = '0' + v;
				if(t==='S')
				{
					v = v.substr((v.length-3)>0?(v.length-3):0);
				}
                else 
					v = v.substr(v.length-2);
            }
            return v;
        }
        else if(t === 'Y'){
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
}

var date = new Date();
console.time('date_format');
var res = date_format(date);
console.timeEnd('date_format');
