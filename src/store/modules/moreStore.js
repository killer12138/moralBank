
// 进入选点-->选店组合查找配置信息(校验数据)-->选店组合查找配置信息
import Store from '@/store';
const state = {
	cardList: [],      //卡包已选店铺列表
	storeList: [],     //店铺列表
	scanAll: {         //点餐购物车
		count: 0,      //店铺数量
		totalPrice: 0, //合计价格
		totalPrice1: 0,//合计原价
		cart: [],      //购物车店铺列表
		combinationConfigId: ''   // 店铺组合配置规则id
	},
	rule: [],          //配置规则
	passRule: false,   //符合规则
}

const mutations = {
	// 选店组合查找配置信息（初次调用 并校验）
	SET_RULE: (state, data) => {
		state.rule = data
		Store.dispatch('verifyRule')
	},
	// 点餐购物车（更改时 并校验）
	SET_CART: (state, data) => {
		state.scanAll.count = data.count
		state.scanAll.totalPrice = data.totalPrice
		state.scanAll.totalPrice1 = data.totalPrice1
		state.scanAll.cart = data.list
		Store.dispatch('verifyRule')
	},
	// 校验是否符合规则
	verifyRule: (state, {data, flag}) => {
		state.scanAll.totalPrice = data.totalPrice
		state.scanAll.totalPrice1 = data.totalPrice1
		state.scanAll.combinationConfigId = data.combinationConfigId
		state.passRule = flag
	},
	//操作店铺列表 type:add([]新增数组)  del({1索引)   delAll(''清空)
	setStoreList: (state, {type, store}) => {
			if(type == 'add'){
				state.storeList.push(...store)
				Store.dispatch('verifyStore')
			}else if(type == 'del'){
				state.storeList.splice(store,1)
			}else if(type == 'delAll'){
				state.storeList = []
			}
	},
}
const actions = {
	// 校验是否符合规则
	verifyRule: ({state,commit}) => {
		let flag = false;
		let data = {totalPrice: 0,totalPrice1: 0, combinationConfigId: ''}
		let count = state.scanAll.count;
		if(state.rule.length){
			state.rule.forEach((item,index) =>{
				if(item.storeCount == count){
					data.totalPrice = item.depositAmount;
					data.totalPrice1 = item.originAmount;
					data.combinationConfigId = item.id;
					flag = true;
				}
			})
		}
		commit('verifyRule', {data, flag})
	},
	// 校验店铺是否已购买
	verifyStore: ({state,commit}) => {
		state.storeList.forEach((item,index)=>{
			item.disable = false
			state.cardList.forEach((i,key)=>{
				if(i.id == item.store.id){
					item.disable = true
				}
			})
		})
	},
	// 选店组合查找配置信息
	SET_RULE: ({state,commit,dispatch}) => {
		// apiGetCard({current:1,pageSize:10}).then(res=>{
		// 	if(res.data.success){
		// 		state.cardList = []
		// 		let params = {type: 1} //0：非第一次选择 1：第一次选择
		// 		if(res.data.result.storeIPage.total) {
		// 			state.cardList = res.data.result.storeIPage.records;
		// 			dispatch('verifyRule');
		// 			params.type = 0;
		// 		}else{
		// 			params.type = 1;
		// 		}
		// 		// apiFirstFlag(params).then(res=>{
		// 		// 	if(res.data.success){
		// 		// 		commit('SET_RULE', res.data.result)
		// 		// 	}
		// 		// })
		// 	}
		// })
	},
	//操作店铺购物车 type:add(index添加) cancel({}取消)  del({})   delAll('')
	changeCart: ({state,commit}, {type, store}) => {
		let data = {count: 0,list: []}
		let cart = state.scanAll.cart;
		switch(type){
			case 'add':
			cart.push(state.storeList[store].store)
			state.storeList[store].select = true
			break;
			case 'del':
			// 找到id相同的去掉购物车
			cart.forEach((item,index) => {
				if(item.id == store.id){
					cart.splice(index,1)
				}
			})
			state.storeList.forEach((item,index) => {
				if(item.store.id == store.id){
					state.storeList[index].select = false;
				}
			})
			break;
			case 'delAll':
			cart.splice(store,cart.length)
			state.storeList.forEach((item,index) => {
				item.select = false;
			})
			break;
		}
		data.list = cart;
		data.count = cart.length;
		commit('SET_CART', data)
	},
	//操作店铺列表 type:add([]新增数组)  del({}删除一条)   delAll(''清空)
	setStoreList: ({state,commit,dispatch}, {type, store}) => {
		if(type == 'add'){
			store.forEach((item,index)=>{
				item.select = false;
				// 选中处理
				state.scanAll.cart.forEach((i,key)=>{
					if(i.id == item.store.id){
						item.select = true
					}
				})
			})
			commit('setStoreList', {type:'add',store:store})
		}else if(type == 'del'){
			commit('setStoreList', {type:'del',store:store})
		}else if(type == 'delAll'){
			commit('setStoreList', {type:'delAll',store:''})
		}
	}
}
const moreStore = {
	state,
	mutations,
	actions
}

export default moreStore;
