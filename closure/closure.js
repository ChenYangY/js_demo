/* var a = 0,b = 0,c =0;
for(var i=1;i<=3;i++){
    var i2 = i;
    (function(){
        var i3 = i;
        setTimeout(function(){
            a += i;
            b += i2;
            c += i3;
        },1);
    })();
}
setTimeout(function(){
    console.log(a,b,c);
},100); */


var foo = 1;
function main()
{
	console.log(foo);
	var foo = 2;
	console.log(this.foo);
	this.foo = 3;
}
main();
new main();