import {defineStore} from "pinia";
import axios from "axios";

export const useCupStore = defineStore('cup', {
    state: () => ({
        token: '',
        adminMode: false,
        group_stage: defaultGroupStage,
        group_ranking: null,
        match_list: null,
        timeTable: null,
        tournamentTree: null,
    }),
    actions: {
        async login(username, password) {
            console.log('login');
            const response = await axios.post('http://localhost:3000/login', {username, password});
            console.log(response);

            if (response.status === 200) {
                this.token = response.data.token;
                this.adminMode = true;
                console.log('Received auth token:' + this.token)
            }
        },
        update() {
            this.updateGroupStage().then();
            this.updateGroupRanking().then();
            this.updateMatchList().then();
            this.updateTournament().then();
        },
        async updateGroupStage() {
            console.log('updateGroupStage');
            const response = await axios.get('http://localhost:3000/poules/');
            if (response.status === 200) {
                this.group_stage = response.data;
            } else {
                console.error(response);
            }
        },
        async updateGroupRanking() {
            console.log('updateGroupRanking');
            const response = await axios.get('http://localhost:3000/poules_rank/');
            if (response.status === 200) {
                this.group_ranking = response.data;
            } else {
                console.error(response);
            }
        },
        async updateMatchList() {
            console.log('updateMatchList');
            const response = await axios.get('http://localhost:3000/tournament/');
            if (response.status === 200) {
                this.match_list = response.data.match_list;
                this.timeTable = this.generateTimetable();
            } else {
                console.error(response);
            }
        },
        async updateTournament() {
            console.log('updateTournament');
            const response = await axios.get('http://localhost:3000/tournament_tree/');
            if (response.status === 200) {
                this.tournamentTree = response.data.tournamentTree;
            } else {
                console.error(response);
            }
        },
        async drawPlayer() {
            await this.update();

            axios.post(
                `http://localhost:3000/select_player`,
                {},
                {
                    headers: {
                        'Authorization': 'Bearer ' + this.token,
                    },
                },
            ).then(this.update);
        },
        async setGroupGame(groupIndex, gameIndex) {
            console.log(`setGroupGame(${groupIndex}, ${gameIndex})`)
            const response = await axios.post(
                `http://localhost:3000/change_group_game/${groupIndex}/${gameIndex}`,
                {},
                {
                    headers: {
                        'Authorization': 'Bearer ' + this.token,
                    }
                },
            ).then(this.update);
        },
        async sendGroupResults(groupIndex, gameIndex, result) {
            console.log(`sendGroupResults(${groupIndex}, ${gameIndex}, ${result})`)
            const response = await axios.post(
                `http://localhost:3000/poules/${groupIndex}/${gameIndex}`,
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
            console.log(`sendGroupBonus(${groupIndex}, ${result})`)
            const response = await axios.post(
                `http://localhost:3000/poules_bonus/${groupIndex}`,
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
            console.log(`setTournamentScore(${matchId}, ${playerIndex}, ${score})`)
            const response = await axios.post(
                `http://localhost:3000/tournament/${matchId}/${playerIndex}/${score}`,
                {},
                {
                    headers: {
                        'Authorization': 'Bearer ' + this.token,
                    }
                },
            ).then(this.update);
        },
        async setBan(matchId, playerIndex, ban) {
            console.log(`setBan(${matchId}, ${playerIndex}, ${ban})`)
            const response = await axios.post(
                `http://localhost:3000/tournament_ban/${matchId}/${playerIndex}/${ban}`,
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

            for (let match of this.match_list) {
                if (timeTable[match.date] === undefined)
                    timeTable[match.date] = [];
                timeTable[match.date].push(match);
            }

            console.log(timeTable);

            return timeTable;
        }
    },
});

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