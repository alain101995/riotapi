request({url: `ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/588.png` , method: 'GET', headers: { 'user-agent': opts.userAgent}, encoding: null}, function (error, response, body) {
		if(!error && response.statusCode == 200) {
				var img = new Image
				  , canvas = new Canvas
				  , ctx = canvas.getContext('2d');

				img.onload = function() {
					canvas.width = img.width;
					canvas.height = img.height;
					ctx.fillStyle = 'white';
					ctx.fillRect(0, 0, canvas.width, canvas.height);
					ctx.drawImage(img, 0, 0);

					var n = 5; // number of colors
					var colors = palette(canvas, n);

					// ... do some more stuff

					return someData;
				};

				img.onerror = function() {
				  // ... probably want to handle this
				};

				img.src = body;
		}
});
