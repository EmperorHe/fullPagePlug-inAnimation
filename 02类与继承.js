/*
	在ES6之前没有类class关键字，实现类的功能如下：	
*/
// function Animal(name) {
// 	this.name = name;remove()
// }
// //在原型上添加方法
// Animal.prototype.showName = function() {
// 	console.log(this.name);
// }
// var cat = new Animal("Tom");
// cat.showName();   //打印Tom

/*
	在ES6中使用class关键字
*/
class Animal{
	//在class中还可以通过关键字static 声明静态方法
	//静态方法只能通过类名调用，实例对象调用无效
	static showInfo(){
		console.log("It's an animal");
	}
	//构造函数,表示要传入的参数
	constructor(name){
		this.name = name;
	}
	showName(){
		console.log(this.name);
	}
}
let dog = new Animal('汪汪');
dog.showName();
//dog.showInfo();   dog.showInfo is not a function
Animal.showInfo();

//继承  关键字 --> extends
class Dog extends Animal{
	constructor(name, color){
		super(name);    //super用来调用父类
		this.color = color;
	}
	showColor(){
		console.log(this.color);
	}
}
let wangcai = new Dog("旺财","yellow");
wangcai.showName();    //旺财
wangcai.showColor();   //yellow
Dog.showInfo();        //It's an animal