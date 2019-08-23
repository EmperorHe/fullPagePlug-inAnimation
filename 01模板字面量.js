/*
	模板字面量
*/

let user1 = {
	username: "张三",
	age: "18",
	gender: "男",
	tel: "13456456745"
}
let flag = `
	<div>
		<span>${user1.username}</span>
		<span>${user1.age}</span>
		<span>${user1.gender}</span>
		<span>${user1.tel}</span>
	</div>
`
console.log(flag);