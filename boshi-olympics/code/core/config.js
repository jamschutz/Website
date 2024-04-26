// api vars
const API_BASE_URL = 'http://127.0.0.1:5000';
// racer apis
const GET_RACERS_API = 'GetRacers';
const GET_RACER_API = 'GetRacer';
const REGISTER_RACER_API = 'RegisterRacer';
const UPDATE_RACER_API = 'UpdateRacer';
// cheer apis
const SEND_CHEER_API = 'Cheer';
// game apis
const GET_GAME_ID_API = 'GetMostRecentGame';


var GAME_INFO;
async function fetchAndStoreGameInfo() {
    let response = await fetch(`${API_BASE_URL}/${GET_GAME_ID_API}`);
    GAME_INFO = await response.json();
}
fetchAndStoreGameInfo();