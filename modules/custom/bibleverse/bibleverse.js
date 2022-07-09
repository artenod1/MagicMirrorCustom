/* Magic Mirror
 * Module: bibleverse
 */
Module.register("bibleverse", {
	// Module config defaults.
	defaults: {
		verseArrays: {
			tozerKnowlegeOfTheHoly: [
				['PSA.46.10'],
				['JHN.1.1'],
				['PSA.50.21'],
				['ROM.1.21'],
				['EZK.1.13'],
				// ['EZK.1.26', 'EZK.1.27', 'EZK.1.28'],
				['JOB.22.21'],
				// ['JOB.11.7', 'JOB.11.8'],
				['MAT.11.27'],
				['ROM.7.25'],
				['MAT.5.8'],
				['1CO.2.11'],
				['JOB.28.23'],
				['ROM.3.4'],
				['JER.22.29'],
				['JHN.14.23'],
				['JHN.10.30'],
				['JHN.14.28'],
				['JHN.1.18'],
				['JHN.3.13'],
				// ['JHN.1.1', 'JHN.1.2', 'JHN.1.3'],
				// ['COL.1.16', 'COL.1.17'],
				['EXO.3.14'],
				['ISA.53.6'],
				['MAT.16.24'],
				['GAL.2.20'],
				['JHN.5.26'],
				['EXO.19.21'],
				['EXO.33.20'],
				['PHP.2.13'],
				['PSA.90.2'],
				['REV.4.8'],
				// ['ISA.46.9', 'ISA.46.10'],
				['PSA.90.1'],
				['PSA.90.12'],
				['ECC.3.11'],
				['2TI.1.10'],
				['ROM.5.20'],
				['JHN.3.16'],
				['2CO.3.18'],
				['COL.3.10'],
				['HEB.10.9'],
				['MAT.11.28'],
				['MAL.3.6'],
				// ['ISA.40.13', 'ISA.40.14'],
				['ROM.11.34'],
				['ISA.40.28'],
				['TIT.1.2'],
				['LUK.1.37'],
				['1CO.2.11'],
				['PSA.90.8'],
				// ['PSA.139.7', 'PSA.139.11', 'PSA.139.12'],
				['ISA.54.10'],
				// ['DAN.2.20', 'DAN.2.21', 'DAN.2.22'],
				['REV.7.12'],
				['PSA.147.5'],
				['1TI.1.17'],
				['GEN.1.31'],
				['ROM.8.20'],
				['JHN.20.29'],
				['1TI.3.16'],
				['ECC.3.14'],
				['ISA.42.16'],
				// ['ISA.45.2', 'ISA.45.3'],
				['LUK.24.1'],
				['REV.19.6'],
				['PSA.62.11'],
				['EXO.3.14'],
				['LUK.11.2'],
				['ISA.57.15'],
				['PSA.36.1'],
				['ISA.6.5'],
				// ['DAN.10.6', 'DAN.10.7', 'DAN.10.8', 'DAN.10.9'],
				['ACT.9.6'],
				['PRO.14.27'],
				['HEB.11.6'],
				['JHN.14.1'],
				['2CO.6.10'],
				['JHN.14.9'],
				['GEN.18.25'],
				['PSA.97.2'],
				// ['PSA.94.1', 'PSA.94.2', 'PSA.94.3'],
				['DAN.9.7'],
				// ['REV.15.3', 'REV.15.4'],
				['JHN.1.9'],
				['ROM.10.2'],
				['HEB.4.2'],
				// ['EPH.1.5', 'EPH.1.6', 'EPH.1.7'],
				['JHN.1.17'],
				['GEN.6.8'],
				['EXO.33.17'],
				['ROM.5.20'],
				['1JN.4.8'],
				['1JN.4.18'],
				['JHN.15.14'],
				['JHN.15.13'],
				['PSA.104.31'],
				['ZEP.3.17'],
				// ['JOB.38.4', 'JOB.38.7'],
				['ROM.5.8'],
				['1JN.3.17'],
				['ISA.6.5'],
				['ROM.10.17'],
				['HAB.1.12'],
				['1PE.1.16'],
				['ISA.44.6'],
				['DAN.4.35'],
				['MAT.12.30'],
				['JHN.14.6'],
				['MAT.5.8']
			],
			ericGriffinBiblePack: [],
		},
		updateInterval: 1000*10,
		// updateInterval: 1000*60*60*24,
		remoteFile: null,
		fadeSpeed: 4000,
		morningStartTime: 3,
		morningEndTime: 12,
		afternoonStartTime: 12,
		afternoonEndTime: 17,
		random: true,
		mockDate: null,
		API_KEY: `148916b5a49aa6297f1fe25e258485b3`,
		bibleVersionID: 'de4e12af7f28f599-01'
	},
	
	lastIndexUsed: -1,


	// Define start sequence.
	start: function () {
		Log.info("Starting module: " + this.name);

		this.lastVerseIndex = -1;

		// Schedule update timer.
		setInterval(() => {
			this.updateDom(this.config.fadeSpeed);
		}, this.config.updateInterval);
	},

	
	randomIndex: function (verses) {
		if (verses.length === 1) {
			return 0;
		}

		const generate = function () {
			return Math.floor(Math.random() * verses.length);
		};

		let verseIndex = generate();

		while (verseIndex === this.lastVerseIndex) {
			verseIndex = generate();
		}

		this.lastVerseIndex = verseIndex;

		return verseIndex;
	},

	randomVerse: function () {

		const verses = this.config.verseArrays.tozerKnowlegeOfTheHoly;
		// variable for index to next message to display
		let index;
		// are we randomizing
		if (this.config.random) {
			// yes
			index = this.randomIndex(verses);
		} else {
			// no, sequential
			// if doing sequential, don't fall off the end
			index = this.lastIndexUsed >= verses.length - 1 ? 0 : ++this.lastIndexUsed;
		}

		return verses[index] || "";
	},


	getBibleVerse: function (bibleVersionID, bibleVerseID) {
		
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.withCredentials = false;
			xhr.addEventListener(`readystatechange`, function () {
			  if (this.readyState === this.DONE) {
				const response = JSON.parse(this.responseText);
				resolve(response.data);
			  }
			});
			xhr.open(
			  `GET`,
			  `https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/verses/${bibleVerseID}?include-chapter-numbers=false&include-verse-numbers=true`
			);
			xhr.setRequestHeader(`api-key`, this.config.API_KEY);
			xhr.onerror = () => reject(xhr.statusText);
			xhr.send();
		  });
	},

	// Override dom generator.
	// Verses are displayed out of order
	getDom: function () {
		const wrapper = document.createElement("div");
		const bibleVerseTitle = document.createElement("span");
		const bibleVerseTitleFirstVerse = document.createElement("i");
		const bibleVerseTitleLastVerse = document.createElement("i");
		const bibleVerseList = document.createElement("span");

		wrapper.className = this.config.classes ? this.config.classes : "thin medium bright pre-line";
		const bibleVerseID = this.randomVerse()

		for (let i=0; i<bibleVerseID.length; i++) {
			this.getBibleVerse(this.config.bibleVersionID, bibleVerseID[i]).then(
				(data) => {
					bibleVerseList.innerHTML += data.content;

					if(i===0) {
						// split reference on colon, grab number after
						bibleVerseTitleFirstVerse.innerHTML = data.reference
					} else if (i===bibleVerseID.length-1) {
						bibleVerseTitleLastVerse.innerHTML += '-'
						bibleVerseTitleLastVerse.innerHTML += data.reference.split(':')[1]
					}			
				})
			wrapper.append(bibleVerseList)
		}
		wrapper.append(bibleVerseTitle)
		bibleVerseTitle.append(bibleVerseTitleFirstVerse)
		bibleVerseTitle.append(bibleVerseTitleLastVerse)
		wrapper.append(bibleVerseTitle)

		return wrapper
	},
});
