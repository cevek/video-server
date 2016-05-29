class AMap<T> {
    protected map:{[key:string]:T | undefined} = {};

    constructor() {

    }

    get(key:string | number):T | undefined {
        return this.map[key];
    }

    has(key:string | number):boolean {
        return this.map[key] != null;
    }

    set(key:string | number, val:T) {
        if (!this.map[key]) {
            this.map[key] = val;
            this.length++;
        }
    }

    remove(key:string | number) {
        if (this.map[key]) {
            this.map[key] = void 0;
            this.length--;
        }
    }

    length = 0;

    static fromArray<T>(items:{key:string | number, value:T}[]):AMap<T> {
        const map = new AMap<T>();
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            map.set(item.key, item.value)
        }
        return map;
    }
}


/*function unique<T>(arr:T[]):T[] {
 return null;
 }


 function getBy<T>(arr:T[], key:string | number, value:string | number):T {
 for (var i = 0; i < arr.length; i++) {
 var item = arr[i];
 if (item[key] == )
 }
 }

 */


const dictionary = {
    // leagues: [new League().fromJSON({id: 1, name: 'NBA', maxSalary: 10000, fantasyPositions: [{id: 1}, {id: 2}]})],
    // fantasyPositions: [new FantasyPosition()],
    // teams: [new EventTeam()],
}

class RegistryList<T extends {id:number}, JsonT extends {id:number}> {
    items:T[] = [];


    constructor(protected ctor:new (value:JsonT)=>T) {

    }

    createOrGet(value:JsonT) {
        let val = this.items.filter(item => item.id == value.id).pop();
        if (!val) {
            val = new this.ctor(value);
            this.items.push(val);
        }
        return val;
    }

    get(id:number) {
        const val = this.items.filter(item => item.id == id).pop();
        if (!val) {
            throw new Error('Item not found: ' + id);
        }
        return val;
    }

}


interface FantasyEventRaw {
    league:LeagueRaw;
    events:EEventRaw[];
    lineup:LineupRaw;
}

class FantasyEvent {
    league:League;
    events:EEvent[];
    liveMode = false;
    lineup:Lineup;
    selectedPos:FantasyPosition | null = null;
    selectedTeam:EventTeam | null = null;

    constructor(json:FantasyEventRaw) {
        this.fromJSON(json);
    }

    fromJSON(json:FantasyEventRaw) {
        this.league = registry.leagues.createOrGet(json.league);
        this.events = json.events.map(jevent => new EEvent(jevent));
        this.lineup = new Lineup(json.lineup, this);
    }

    get playersByPositionMap() {
        const map = new AMap<EventPlayer[]>();
        for (var i = 0; i < this.league.fantasyPositions.length; i++) {
            var fp = this.league.fantasyPositions[i];
            const players = this.allPlayers.filter(
                player =>
                fp.positions.some(pos => player.positions.some(pp => pp == pos))
                && (!this.selectedTeam || this.selectedTeam.players.some(player => player == player)))

            map.set(fp.id, players);
        }
        return map;
    }

    get filteredPlayers() {
        return this.selectedPos ? this.playersByPositionMap.get(this.selectedPos.id)! : this.allPlayers;
    }

    get allPlayers():EventPlayer[] {
        return [].concat(...this.events.map(e => e.allPlayers));
    }
}

interface EEventRaw {
    id:number;
    teamA:EventTeamRaw;
    teamB:EventTeamRaw;
}

class EEvent {
    id:number;
    teamA:EventTeam;
    teamB:EventTeam;

    get allPlayers() {
        return this.teamA.players.concat(this.teamB.players);
    }

    constructor(json:EEventRaw) {
        this.fromJSON(json);
    }

    fromJSON(json:EEventRaw) {
        this.id = json.id;
        this.teamA = new EventTeam(json.teamA, this);
        this.teamB = new EventTeam(json.teamB, this);
    }
}

interface LeagueRaw {
    id:number;
    name:string;
    maxSalary:number;
    fantasyPositions:FantasyPositionRaw[];
}

class League {
    id:number;
    name:string;
    maxSalary:number;
    fantasyPositions:FantasyPosition[];

    constructor(json:LeagueRaw) {
        this.fromJSON(json);
    }

    fromJSON(json:LeagueRaw) {
        this.id = json.id;
        this.name = json.name;
        this.maxSalary = json.maxSalary;
        this.fantasyPositions = json.fantasyPositions.map(fp => registry.fantasyPositions.createOrGet(fp));
    }
}


interface EventTeamRaw {
    team:TeamRaw;
    players:EventPlayerRaw[];
}

class EventTeam {
    event:EEvent;
    team:Team;
    players:EventPlayer[];

    constructor(json: EventTeamRaw, event:EEvent) {
        this.event = event;
        this.fromJSON(json);
    }

    fromJSON(json:EventTeamRaw) {
        this.team = registry.teams.createOrGet(json.team);
        this.players = json.players.map(p => new EventPlayer().fromJSON(p, this.event));
    }
}

class TeamRaw {
    id:number;
}

class Team {
    id:number;

    constructor(json:TeamRaw) {
        this.fromJSON(json);
    }

    fromJSON(json:TeamRaw) {
        this.id = json.id;
    }
}

interface LineupRaw {
    playerPositions:LineupPositionRaw[];
}

class Lineup {
    fantasyEvent:FantasyEvent;
    playerPositions:LineupPosition[];

    constructor(json:LineupRaw, fantasyEvent:FantasyEvent) {
        this.fantasyEvent = fantasyEvent;
        this.fromJSON(json);
    }

    fromJSON(json:LineupRaw) {
        this.playerPositions = json.playerPositions.map(pp => LineupPosition.fromJSON(pp));
        json.playerPositions.forEach(pp => {
            if (pp.playerId) {
                const player = this.fantasyEvent.allPlayers.filter(player => player.player.id == pp.playerId).pop()!;
                const position = registry.fantasyPositions.get(pp.positionId);
                if (!this.addPlayerToPosition(player, position)) {
                    throw new Error('Cannot add player');
                }
            }
        });
    }

    canRestore(playerPosition:LineupPosition) {
        if (!playerPosition.player && playerPosition.serverPlayer && this.validate(playerPosition.serverPlayer)) {
            return true;
        }
        return false;
    }

    restore(playerPosition:LineupPosition) {
        if (this.canRestore(playerPosition)) {
            this.addPlayerToPosition(playerPosition.serverPlayer, playerPosition.position);
        }
    }


    removePlayer(player:EventPlayer) {
        const pp = this.playersMap.get(player.player.id);
        if (pp) {
            pp.player = null;
        }
    }

    get availSalary() {
        return this.playerPositions.reduce((salary, item) => salary - (item.player ? item.player.salary : 0), this.fantasyEvent.league.maxSalary);
    }

    get averageSalary() {
        return this.availSalary / (this.playerPositions.length - this.usedPlayers);
    }

    canSalary(player:EventPlayer) {
        return this.availSalary >= player.salary;
    }

    addPlayerToPosition(player:EventPlayer, position?:FantasyPosition) {
        for (var i = 0; i < this.playerPositions.length; i++) {
            var pp = this.playerPositions[i];
            const fitPosition = position ? pp.position == position : pp.position.positions.some(p => player.positions.some(pp2 => pp2 == pp.position));
            if (fitPosition && !pp.player && this.validate(player)) {
                pp.player = player;
                this.fantasyEvent.selectedPos = this.nextFreePosition ? this.nextFreePosition.position : null;
                return true;
            }
        }
        return false;
    }

    get nextFreePosition() {
        return this.playerPositions.filter(pp => pp.player == null).shift();
    }

    get usedPlayers() {
        return this.playerPositions.filter(pp => pp.player != null).length;
    }

    get isFull() {
        return this.usedPlayers == this.playerPositions.length;
    }

    get usedEvents() {
        return AMap.fromArray(this.playerPositions.map(pp => ({key: pp.player ? pp.player.event.id : 0, value: 1})));
    }

    validate(newPlayer:EventPlayer) {
        if (this.availSalary - newPlayer.salary < 0) {
            return false;
        }

        if (this.usedPlayers >= this.playerPositions.length - 1 && this.usedEvents.length < 2 && this.usedEvents.has(newPlayer.event.id)) {
            return false;
        }

        return true;
    }

    get playersMap() {
        return AMap.fromArray(this.playerPositions.map(pp => ({key: pp.player ? pp.player.player.id : 0, value: pp})));
    }

    playerExists(player:EventPlayer) {
        return this.playersMap.get(player.player.id) != null;
    }
}

interface LineupPositionRaw {
    id:number;
    positionId:number;
    playerId?:number;
}

class LineupPosition {
    id:number;
    player:EventPlayer | null;
    serverPlayer:EventPlayer;
    position:FantasyPosition;

    static fromJSON(json:LineupPositionRaw) {
        const obj = new LineupPosition();
        obj.id = json.id
        obj.position = registry.fantasyPositions.get(json.positionId);
        return obj;
    }
}

interface FantasyPositionRaw {
    id:number;
    name:string;
    positions:PPositionRaw[];
}

class FantasyPosition {
    id:number;
    name:string;
    positions:PPosition[];

    constructor(json: FantasyPositionRaw){
        this.fromJSON(json);
    }

    fromJSON(json:FantasyPositionRaw) {
        this.id = json.id;
        this.name = json.name;
        this.positions = json.positions.map(p => registry.positions.createOrGet(p));
    }
}

interface PPositionRaw {
    id:number;
    name:string;
}
class PPosition {
    id:number;
    name:string;

    constructor(json: PPositionRaw){
        this.fromJSON(json);
    }

    fromJSON(json:PPositionRaw) {
        this.id = json.id;
        this.name = json.name;
    }
}


interface EventPlayerRaw {
    player:PlayerRaw;
    positionIds:number[];
    score:number;
    salary:number;
}
class EventPlayer {
    event:EEvent;
    player:Player;
    positions:PPosition[];
    score:number;
    salary:number;

    fromJSON(json:EventPlayerRaw, event:EEvent) {
        this.event = event;
        this.player = registry.players.createOrGet(json.player);
        this.positions = json.positionIds.map(id => registry.positions.get(id));
        this.score = json.score;
        this.salary = json.salary;
        return this;
    }
}

interface PlayerRaw {
    id:number;
    name:string;
}

class Player {
    id:number;
    name:string;

    constructor(json:PlayerRaw) {
        this.fromJSON(json);
    }

    fromJSON(json:PlayerRaw) {
        this.id = json.id;
        this.name = json.name;
    }
}


const json:FantasyEventRaw = {
    lineup: {
        playerPositions: [
            {
                id: 1,
                positionId: 1,
                playerId: 1,
            },
            {
                id: 2,
                positionId: 1,
                playerId: 2,
            },
            {
                id: 3,
                positionId: 2,
                playerId: 3,
            },
            {
                id: 4,
                positionId: 2,
                // playerId: 4,
            }
        ],
    },
    league: {
        id: 1,
        name: 'NBA',
        maxSalary: 10000,
        fantasyPositions: [
            {
                id: 1,
                name: 'F',
                positions: [
                    {
                        id: 1,
                        name: 'FA'
                    },
                    {
                        id: 2,
                        name: 'FB'
                    }
                ]
            },
            {
                id: 2,
                name: 'G',
                positions: [
                    {
                        id: 3,
                        name: 'GA'
                    },
                    {
                        id: 4,
                        name: 'GB'
                    }
                ]
            }
        ]
    },
    events: [
        {
            id: 1,
            teamA: {
                team: {
                    id: 1,
                },
                players: [
                    {
                        score: 1,
                        salary: 1000,
                        player: {
                            id: 1,
                            name: 'Ricky Martin'
                        },
                        positionIds: [1, 2]
                    },
                    {
                        score: 2,
                        salary: 3000,
                        player: {
                            id: 3,
                            name: 'Frey Morgan'
                        },
                        positionIds: [3]
                    }
                ]
            },
            teamB: {
                team: {
                    id: 2,
                },
                players: [
                    {
                        score: 2,
                        salary: 2000,
                        player: {
                            id: 2,
                            name: 'Adam Sandler'
                        },
                        positionIds: [1, 2]
                    },
                    {
                        score: 5,
                        salary: 15000,
                        player: {
                            id: 4,
                            name: 'Ashton Cutcher'
                        },
                        positionIds: [4]
                    }
                ]
            },
        }
    ]
};


class Registry {
    leagues = new RegistryList<League, LeagueRaw>(League);
    fantasyPositions = new RegistryList<FantasyPosition, FantasyPositionRaw>(FantasyPosition);
    positions = new RegistryList<PPosition, PPositionRaw>(PPosition);
    teams = new RegistryList<Team, TeamRaw>(Team);
    players = new RegistryList<Player, PlayerRaw>(Player);
}
const registry = new Registry();


const fe = new FantasyEvent(json);
fe.selectedPos = null//fe.league.fantasyPositions[1];

var lineup = fe.lineup;

console.log('positions', fe.league.fantasyPositions.map(pos => pos == fe.selectedPos ? `=${pos.name}=` : pos.name));

fe.filteredPlayers.map(player => {
    const canSalary = lineup.isFull ? true : lineup.canSalary(player);
    console.log('player', player.positions.map(pos => pos.name), player.player.name, player.score, canSalary ? '' : 'salary limit');


    if (lineup.playerExists(player)) {
        // lineup.removePlayer(player);
    } else {
        // lineup.addPlayerToFitPosition(player);
    }
});

console.log('salary', lineup.averageSalary, lineup.availSalary);

console.log('usedPlayers', lineup.usedPlayers);


lineup.playerPositions.map(pp => {
    console.log('lineup', pp.position.name, pp.player ? pp.player.player.name : 'empty player', lineup.canRestore(pp) ? 'restore' : '');

    if (lineup.canRestore(pp)) {
        // lineup.restore(pp);
    }
    if (pp.player) {
        // lineup.removePlayer(pp.player);
    }
})










