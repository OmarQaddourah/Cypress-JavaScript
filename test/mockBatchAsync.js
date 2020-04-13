const mockBatchAsync = (config, ret) => {
	Object.values(config).forEach((val) => {
		if (val.task) {
			const arg = [];
			if (val.params) {
				arg.push(val.params);
			}
			val.task.apply(null, arg);
		}
	});

	return ret;
};

module.exports = {
	mockBatchAsync,
};
