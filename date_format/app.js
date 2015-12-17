
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
        "M": date.getMonth() + 1, //�·� 
        "D": date.getDate(), //�� 
        "h": date.getHours(), //Сʱ 
        "m": date.getMinutes(), //�� 
        "s": date.getSeconds(), //�� 
        "q": Math.floor((date.getMonth() + 3) / 3), //���� 
        "S": date.getMilliseconds() //���� 
    };
    format = format.replace(/([YMDhmsqS])\1+/g, function(all, t){
        var v = map[t];
        if(v !== undefined){
            if(all.length > 1){
                v = '0' + v;
				v = v.substr(v.length-all.length);
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
var res = date_format('YYYYMMDDhhmmssSSS');
console.log(res);
console.timeEnd('date_format');