const expect = require('expect');

const {Users} = require('./users');

describe('Users',()=>{
	var users;
	beforeEach(()=>{
		users = new Users();
		users.users = [{
			id:'1',
			name:'sumit',
			room:'Node Course'
		},
		{
			id:'2',
			name:'kumar',
			room:'Other Course'
		},
		{
			id:'3',
			name:'thakur',
			room:'Node Course'
		}];
	});

	it('should add new user',()=>{
		var users = new Users();
		var user = {
			id:'123',
			name:'sumit',
			room:'Friends'
		};
		var resUsers = users.addUsers(user.id,user.name,user.room);
		expect(users.users).toEqual([user]);
	});

	it('should remove a user',()=>{
		var userId = '1';
		var user = users.removeUser(userId);
		expect(user.id).toBe(userId);
		expect(users.users.length).toBe(2);
	});

	it('should not remove a user',()=>{
		var userId = '99';
		var user = users.removeUser(userId);
		expect(user).toNotExist();
		expect(users.users.length).toBe(3);
	});

	it('should find a user',()=>{
		var userId = '2';
		var user = users.getUser(userId);
		expect(user.id).toBe(userId);
	});

	it('should not find user',()=>{
		var userId = '99';
		var user = users.getUser(userId);
		expect(user).toNotExist();
	});

	it('should return name for node course',()=>{
		var userList = users.getUserList('Node Course');
		expect(userList).toEqual(['sumit','thakur']);
	});
	it('should return name for other course',()=>{
		var userList = users.getUserList('Other Course');
		expect(userList).toEqual(['kumar']);
	});
})