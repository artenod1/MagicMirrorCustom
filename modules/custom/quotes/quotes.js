
/* Magic Mirror
 * Module: quotes
 */
Module.register("quotes", {
	// Module config defaults.
	defaults: {
		updateInterval: 1000*60,
		fadeSpeed: 4000,
		random: true,
	},
	quoteIndex: 0,
	lastIndexUsed: -1,


	// Define start sequence.
	start: function () {
		Log.info("Starting module: " + this.name);

		// Schedule update timer.
		setInterval(() => {
			this.updateDom(this.config.fadeSpeed);
		}, this.config.updateInterval);
	},

	getQuotes: function () {
		return new Promise((resolve, reject) => {
			const url = 'http://127.0.0.1:5000/api/all-quotes';
			const xhr = new XMLHttpRequest();
			xhr.addEventListener(`readystatechange`, function () {
				if (this.readyState === this.DONE) {
					const allQuotes = JSON.parse(this.response);
					resolve(allQuotes.data)
				}
			});
			xhr.open('GET', url, true);
			xhr.onerror = () => reject(xhr.statusText);
			xhr.send();
		})
	},

	// Override dom generator.
	getDom: function () {
		const wrapper = document.createElement('div');
		wrapper.className = this.config.classes ? this.config.classes : "thin medium bright pre-line";
		this.getQuotes().then((quoteList) => {
			if(quoteList.length == 0){
				return wrapper
			}
			if(this.quoteIndex >= quoteList.length){
				this.quoteIndex = 0
			}
			wrapper.innerHTML = quoteList[this.quoteIndex].quote
			wrapper.innerHTML += '<br>'
			wrapper.innerHTML += quoteList[this.quoteIndex].quote_origin
			this.quoteIndex ++
		}).catch((e) => {
			console.log('Start server or add quotes')
		})
		return wrapper;
	},
});
