const appKey = '73d4b04e88b35c905f3812f0f4579cba';

$('document').ready(() => {
	$('#weather').hide();
	if (navigator.geolocation) {
		let currentPosition = '';
		navigator.geolocation.getCurrentPosition((position) => {
			currentPosition = position;
			//set lat and long
			const lat = currentPosition.coords.latitude;
			const long = currentPosition.coords.longitude;
			console.log(lat);
			console.log(long);
			const url = `http://api.weatherstack.com/current?access_key=${appKey}&query=nigeria&lat=${lat}&lon=${long}`;

			$.getJSON(url, (data) => {
				console.log(data);
			});
		});
	}
});
