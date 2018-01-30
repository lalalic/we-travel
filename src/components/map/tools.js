export function distance(lat_a, lng_a, lat_b, lng_b){
	const toRadians=a=>a*(Math.PI/180)
	let earthRadius = 3958.75
    let latDiff = toRadians(lat_b-lat_a)
    let lngDiff = toRadians(lng_b-lng_a)
    let a = Math.sin(latDiff /2) * Math.sin(latDiff /2) +
		Math.cos(toRadians(lat_a)) * Math.cos(toRadians(lat_b)) *
		Math.sin(lngDiff /2) * Math.sin(lngDiff /2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

    return parseInt(earthRadius * c * 1609/1000)	
}

export function place(lat, lng){
	return Promise.resolve("china")
}