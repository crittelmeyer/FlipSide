var Block = function (items) {
	items = items || [];
	this.container = items;
};

Block.prototype.has = function (item) {
	return this.container.indexOf(item) !== -1;
};

Block.prototype.add = function (item) {
	return this.container.push(item);
};

Block.prototype.getSize = function () {
	return this.container.length;
};