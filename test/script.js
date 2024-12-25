import {getGeolocation} from "node-ip-geolocation";

async function test() {
    let response = await getGeolocation();
    console.log("This is the resonse",response);
}

test();