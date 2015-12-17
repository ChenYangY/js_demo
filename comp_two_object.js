/*
		function:	object_compare
			description:
				compare two object and it's content
			@param	one		object
			@param	two		object
			return:
				if two	objects are equal then return 1;
				else return 0;
*/
function compare_object(one,two) {
	var type_one = typeof(one),
		type_two = typeof(two),
		ret = 0,t = null, i = 0, j = 0,m = 0, n = 0, flag = 1;
	if(type_one === type_two && one){
		if(one.constructor === Array && one.length === two.length){
			for(i=0,j=one.length;i<j;i++){
				for(n=0,m=two.length;n<m;n++){
					flag = compare_object(one[i],two[n]);
					if(flag === 1){
						two.splice(n,1);
						break;
					}
				}
				if(flag === 0){
					ret = 0;
					break;
				}
			}
			if(flag === 1){
				ret = 1;
			}else{
				ret = 0;
			}
		}
		else if(type_one === 'string' || type_one === 'number'){
			if(one === two) ret = 1;
		}else{
			for(var t in one){
				flag = compare_object(one[t],two[t]);
				if(flag === 1)
					continue;
				else{
					ret = 0;
					break;
				}
			}
			if(flag === 1){
				ret = 1;
			}else{
				ret = 0;
			}
		}
	}
	else if(type_one === type_two) ret = 1;
	return ret;
}
