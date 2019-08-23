/*
	1）Promise是一个承诺对象，可以通过new关键字创建，用于对异步操作进行消息传递
	2）promise总共有三种状态：
		1.pendding   等待中
		2.resolve    成功
		3.reject     失败
		只有1到2状态或1到3状态
	3）在promise对象中传入一个函数作为参数，函数内有两个参数：
			1.resolve  成功
			2.reject   失败
		let p = new Promise(function(resolve,reject){...})
	4）通过Promise对象的then方法传入两个函数作为参数，分别表示成功和失败的处理结果
		p.then(function(data){...},function(err){...})
*/

const fs = require('fs');
let pr1 = new Promise(function (resolve,reject) {
	fs.readFile("./01模板字面量.js",(err,fileContent)=>{
		if(err){
			reject('读取文件失败');
		}
		else{
			resolve(fileContent.toString());
		}
	});
});
pr1.then(function (data) {
	console.log(data + "\n");
})

let pr2 = new Promise(function(resolve,reject){
	fs.readFile("./02类与继承.js",(err,fileContent)=>{
		if(err){
			reject('读取文件失败');
		}
		else{
			resolve(fileContent.toString());
		}
	});
});
pr2.then(function(data){
	console.log(data);
})


//利用Promise对象的all方法可以手动调整输出的顺序，这里可以传入参数[pr1,pr2],也可以传入[pr2,pr1]
// Promise.all([pr1,pr2]).then(function(data){
// 	console.log(data);
// },function(err){
// 	console.log(err);
// })


