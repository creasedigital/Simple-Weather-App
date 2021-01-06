const appKey = '73d4b04e88b35c905f3812f0f4579cba';
$('.short').hide();

$('document').ready(() => {
	if (navigator.geolocation) {
		let currentPosition = '';
		navigator.geolocation.getCurrentPosition((position) => {
			currentPosition = position;
			//set lat and long
			const lat = currentPosition.coords.latitude;
			const long = currentPosition.coords.longitude;

			const url = `http://api.weatherstack.com/current?access_key=${appKey}&query=nigeria&lat=${lat}&lon=${long}`;

			$.getJSON(url, (data) => {
				console.log(data);
				const country = data.location.country;
				const city = data.location.name;
				const region = data.location.region;

				const time = data.current.observation_time;
				const humidity = data.current.humidity;
				const cloud = data.current.cloudcover;
				const temperature = data.current.temperature;
				const temperatureFahrenheit = 1.8 * temperature + 32;
				const windSpeed = data.current.wind_speed;

				if (temperature < 18) {
					$('.grey-jumbo').css({
						background:
							'url(https://cdn.pixabay.com/photo/2017/01/17/16/46/snow-1987413_960_720.png)'
					});
					$('#temp').html("<h3>It's a very cold day<hr/></h3>");
				} else {
					$('.grey-jumbo').css({
						background:
							'url(https://cdn.pixabay.com/photo/2012/04/11/16/11/weather-28719_960_720.png)'
					});
					$('#temp').html("<h3>It's a warm and normal weather<hr/></h3>");
				}

				$('.short').show();

				$('#weather').html(`${region}, ${city}, ${country}`);

				$('#info1').html(time);
				$('#info2').html(`Wind Speed: ${windSpeed} Km/hr`);
				$('#info3').html(temperature + ' &deg;' + 'C');

				let yes = true;

				$('#switch').on('click', () => {
					if (yes) {
						$('#info3').html(temperatureFahrenheit + ' &deg;' + 'F');
						$('#switch').text('Show in Celsius');
						yes = false;
					} else {
						$('#info3').html(temperature + ' &deg;' + 'C');
						$('#switch').text('Show in Fahrenheit');
						yes = true;
					}
				});

				if (cloud <= 30) {
					$('#info5').html('Clear Sky');
				} else {
					$('#info5').html('Cloudy Sky');
				}
				$('#info6').html('Humidity: ' + humidity + ' %');
			});
		});
	}
});
