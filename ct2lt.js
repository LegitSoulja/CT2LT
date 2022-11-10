(function(){
	
	// replace names and functions with LunarEngine relatives.
	const REPLACE = [
		/Cheat/g, 'Lunar',
		/CE/g, 'LE',
		/CheatTable/g, 'LunarTable',
		/CheatEntries/g, 'LunarEntries',
		/CheatEntry/g, 'LunarEntry',
		/CEForm/g, 'LEForm',
		/hideAllCEWindows/g, 'hideAllLEWindows',
		/unhideMainCEwindow/g, 'unhideMainLEwindow',
		/closeCE/g, 'closeLE',
		/getCEVersion/g, 'getLEVersion',
		/connectToCEServer/g, 'connectToLEServer',
		/CETrainer/g, 'LETrainer',
		/<Signature>[\.\t\w\W\s\S]*<\/Signature>/g, ''
	];
	
	async function convert(data) {
		for(let i = 0; i < REPLACE.length; i+=2) {
			data = data.replace(REPLACE[i], REPLACE[i+1]);
		}
		return data;
	}
	
	function download(data, filename, type) {
		let blob = new Blob([data], {type: type});
		/*
		if(window.navigator.msSaveOrOpenBlob){
			window.navigator.msSaveOrOpenBlob(blob, filename);
			return;
		}
		*/
		let url = window.URL.createObjectURL(blob)
		let a = document.body.appendChild(Object.assign(
			document.createElement('a'),
			{
				href: url,
				download: filename,
				style: { display: 'none' }
			}
		));
		a.click();
		URL.revokeObjectURL(url);
		a.remove();
	}
	
	const form = document.querySelector('form');
	form.querySelector('input[type=file]').addEventListener('change', function(e){
		let name = e.target.files[0].name.split('.');
		e.target.files[0].text().then(xml => convert(xml).then(data => {
			if(data.length <= 0) {
				alert('No content provided in trainer table.');
				return;
			}
			let newname = [...name];
			newname[0] += '_LUNARENGINE';
			download(data, newname.join('.'), 'text/html');
		}).finally(() => form.reset()));
	});
})();
