import {defineStore} from "pinia";
import axios from "axios";

const apiUrl = 'https://server.brocup.fr';

export const useCupStore = defineStore('cup', {
        state: () => ({
            token: '',
            adminMode: false,
            loginFailed: false,
            group_stage: defaultGroupStage,
            group_ranking: null,
            tournament_match: null,
            tournament_tree: null,
            current_game: null,
            timeTable: null,
        }),
        actions: {
            async login(username, password) {
                this.loginFailed = false;
                const response = await axios.post(`${apiUrl}/login`, {username, password}, {validateStatus: _ => true});
                console.log(response);

                if (response.status === 200) {
                    this.token = response.data.token;
                    this.adminMode = true;
                    console.log('Received auth token:' + this.token);
                } else if (response.status === 401) {
                    console.log('Login failed');
                    this.loginFailed = true;
                }
            },
            async update() {
                const response = await axios.get(`${apiUrl}/cup/`);
                if (response.status === 200) {
                    this.group_stage = response.data.group_stage;
                    this.group_ranking = response.data.group_rank;
                    this.tournament_match = response.data.tournament_match;
                    this.tournament_tree = response.data.tournament_tree.tournamentTree;
                    this.current_game = response.data.current_game;
                    this.timeTable = this.generateTimetable();
                    console.log('updated:');
                    console.log(this.group_stage);
                    console.log(this.group_ranking);
                    console.log(this.tournament_match);
                    console.log(this.tournament_tree);
                    console.log(this.current_game);
                    console.log(this.timeTable);
                } else {
                    console.error(response);
                }
            },
            async drawPlayer() {
                await this.update();

                axios.post(
                    `${apiUrl}/select_player`,
                    {},
                    {
                        headers: {
                            'Authorization': 'Bearer ' + this.token,
                        },
                    },
                ).then(this.update);
            },
            async setGroupGame(groupIndex, gameIndex) {
                await axios.post(
                    `${apiUrl}/change_group_game/${groupIndex}/${gameIndex}`,
                    {},
                    {
                        headers: {
                            'Authorization': 'Bearer ' + this.token,
                        }
                    },
                ).then(this.update);
            },
            async sendGroupResults(groupIndex, gameIndex, result) {
                await axios.post(
                    `${apiUrl}/poules/${groupIndex}/${gameIndex}`,
                    {
                        result
                    },
                    {
                        headers: {
                            'Authorization': 'Bearer ' + this.token,
                        }
                    },
                ).then(this.update);
            },
            async sendGroupBonus(groupIndex, result) {
                await axios.post(
                    `${apiUrl}/poules_bonus/${groupIndex}`,
                    {
                        result
                    },
                    {
                        headers: {
                            'Authorization': 'Bearer ' + this.token,
                        }
                    },
                ).then(this.update);
            },
            async setTournamentScore(matchId, playerIndex, score) {
                await axios.post(
                    `${apiUrl}/tournament/${matchId}/${playerIndex}/${score}`,
                    {},
                    {
                        headers: {
                            'Authorization': 'Bearer ' + this.token,
                        }
                    },
                ).then(this.update);
            },
            async setBan(matchId, playerIndex, ban) {
                await axios.post(
                    `${apiUrl}/tournament_ban/${matchId}/${playerIndex}/${ban}`,
                    {},
                    {
                        headers: {
                            'Authorization': 'Bearer ' + this.token,
                        }
                    },
                ).then(this.update);
            },
            generateTimetable() {
                const timeTable = {};

                for (let match of this.tournament_match.match_list) {
                    if (timeTable[match.date] === undefined)
                        timeTable[match.date] = [];
                    timeTable[match.date].push(match);
                }

                return timeTable;
            },
            async resetCup() {
                await axios.post(
                    `${apiUrl}/reset`,
                    {},
                    {
                        headers: {
                            'Authorization': 'Bearer ' + this.token,
                        }
                    },
                );
                await this.update();
            }
        },
    })
;

const defaultGroupStage = {
    group: [
        {
            game_index: 1, players: [
                {"id": 0, "name": "???", "score": 0, "ranking": [0, 0, 0, 0, 0]},
                {"id": 1, "name": "???", "score": 0, "ranking": [0, 0, 0, 0, 0]},
                {"id": 2, "name": "???", "score": 0, "ranking": [0, 0, 0, 0, 0]},
                {"id": 3, "name": "???", "score": 0, "ranking": [0, 0, 0, 0, 0]},
                {"id": 4, "name": "???", "score": 0, "ranking": [0, 0, 0, 0, 0]},
                {"id": 5, "name": "???", "score": 0, "ranking": [0, 0, 0, 0, 0]},
                {"id": 6, "name": "???", "score": 0, "ranking": [0, 0, 0, 0, 0]},
                {"id": 7, "name": "???", "score": 0, "ranking": [0, 0, 0, 0, 0]},
            ],
        },
        {
            "game_index": 1, "players": [
                {"id": 0, "name": "???", "score": 0, "ranking": [0, 0, 0, 0, 0]},
                {"id": 1, "name": "???", "score": 0, "ranking": [0, 0, 0, 0, 0]},
                {"id": 2, "name": "???", "score": 0, "ranking": [0, 0, 0, 0, 0]},
                {"id": 3, "name": "???", "score": 0, "ranking": [0, 0, 0, 0, 0]},
                {"id": 4, "name": "???", "score": 0, "ranking": [0, 0, 0, 0, 0]},
                {"id": 5, "name": "???", "score": 0, "ranking": [0, 0, 0, 0, 0]},
                {"id": 6, "name": "???", "score": 0, "ranking": [0, 0, 0, 0, 0]},
                {"id": 7, "name": "???", "score": 0, "ranking": [0, 0, 0, 0, 0]},
            ],
        },
    ],
};
