/**
* 利用sort函数实现orderBy排序
* 主要是明白sort的 -1 0 1
* 其次就是遍历获取各个col的比对结果
*/
function mySort(a, b, orders) {
	let result = [];
	for(let i = 0; i < orders.length; i++){
		let val = compare(a[orders[i].col], b[orders[i].col], orders[i].isAsc);
		result.push(val);
		if(val === 1|| val === -1) break;
	}

	for(let k = 0; k < result.length; k++) {
		if (result[k] === 1 || result[k] === -1) return result[k];
	}
	return 0;
}

function compare(a,b,isAsc) {
	if(a > b){
		return isAsc ? 1 : -1;
	} else if(a < b) {
		return isAsc ? -1 : 1;
	} else {
		return 0;
	}
}

function orderBy(collection, orders){
	return collection.sort((a,b) => {
		return mySort(a,b,orders);
	})
}
