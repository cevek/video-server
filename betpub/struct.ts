class AMap<T> {
    protected map:{[key:string]:T | undefined} = {};

    constructor() {

    }

    get(key:string | number) {
        return this.map[key];
    }

    getOrThrow(key:string | number):T {
        const val = this.map[key];
        if (val == null) {
            throw new Error('Not Found');
        }
        return val;
    }

    getOrCreate(key:string | number, factory:()=>T) {
        let val = this.map[key];
        if (val == null) {
            val = this.map[key] = factory();
        }
        return val;
    }

    has(key:string | number):boolean {
        return this.map[key] != null;
    }

    set(key:string | number, val:T) {
        if (!this.map[key]) {
            this.map[key] = val;
            this.length++;
        }
        return val;
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


type RT<J> = {id:number, fromJSON(json:J):void};
type RJSON = {id:number};

class RegistryFourArgs<T extends RT<J>, J extends RJSON, A, B, C> {
    protected map = new AMap<T>();

    constructor(protected factory:(json:J, arg1:any, arg2:any, arg3:any)=>T) {}

    create(json:J, arg1?:any, arg2?:any, arg3?:any): T {
        const val = this.map.get(json.id);
        if (val) {
            val.fromJSON(json);
            return val;
        }
        return this.map.set(json.id, this.factory(json, arg1, arg2, arg3));
    }

    findOrThrow(id:number): T {
        const val = this.map.get(id);
        if (!val) {
            throw new Error('Not Found');
        }
        return val;
    }

    find(id:number) {
        return this.map.get(id);
    }
}

class RegistryThreeArg<T extends RT<J>, J extends RJSON, A, B> extends RegistryFourArgs<T, J, A, B, {}> {
    protected factory:(json:J, arg1:A, arg2:B)=>T;

    create(json:J, arg1:A, arg2:B) {
        return super.create(json, arg1, arg2);
    }
}

class RegistryTwoArg<T extends RT<J>, J extends RJSON, A> extends RegistryFourArgs<T, J, A, {}, {}> {
    protected factory:(json:J, arg1:A)=>T;

    create(json:J, arg1:A) {
        return super.create(json, arg1);
    }
}
class Registry<T extends RT<J>, J extends RJSON> extends RegistryFourArgs<T, J, {}, {}, {}> {
    protected factory:(json:J)=>T;

    create(json:J) {
        return super.create(json);
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


function patch<T>(origArray:T[], newArray:T[]) {
    origArray.length = 0;
    origArray.push.apply(origArray, newArray);
}


interface FantasyEventRaw {
    id:number;
    league:LeagueRaw;
    events:EEventRaw[];
    lineup:LineupRaw;
}

class FantasyEvent {
    id:number;
    league:League;
    events:EEvent[] = [];
    liveMode = false;
    lineup:Lineup;
    selectedPos:FantasyPosition | null = null;
    selectedTeam:EventTeam | null = null;

    private constructor(json:FantasyEventRaw) {
        this.fromJSON(json);
    }

    fromJSON(json:FantasyEventRaw) {
        this.id = json.id;
        this.league = League.registry.create(json.league);
        patch(this.events, json.events.map(e => EEvent.registry.create(e)));
        this.lineup = Lineup.registry.create(json.lineup, this);
    }

    static registry = new Registry<FantasyEvent, FantasyEventRaw>(json => new FantasyEvent(json));

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

    private constructor(json:EEventRaw) {
        this.fromJSON(json);
    }

    fromJSON(json:EEventRaw) {
        this.id = json.id;
        this.teamA = EventTeam.registry.create(json.teamA, this);
        this.teamB = EventTeam.registry.create(json.teamB, this);
    }

    static registry = new Registry<EEvent, EEventRaw>(json => new EEvent(json));

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
    fantasyPositions:FantasyPosition[] = [];

    private constructor(json:LeagueRaw) {
        this.fromJSON(json);
    }

    fromJSON(json:LeagueRaw) {
        this.id = json.id;
        this.name = json.name;
        this.maxSalary = json.maxSalary;
        patch(this.fantasyPositions, json.fantasyPositions.map(p => FantasyPosition.registry.create(p)));
    }

    static registry = new Registry<League, LeagueRaw>(json => new League(json));
}


interface EventTeamRaw {
    id:number;
    team:TeamRaw;
    players:EventPlayerRaw[];
}

class EventTeam {
    id:number;
    event:EEvent;
    team:Team;
    players:EventPlayer[] = [];

    private constructor(json:EventTeamRaw, event:EEvent) {
        this.event = event;
        this.fromJSON(json);
    }

    fromJSON(json:EventTeamRaw) {
        this.id = json.id;
        this.team = Team.registry.create(json.team);
        patch(this.players, json.players.map(p => EventPlayer.registry.create(p, this.event)));
    }

    static registry = new RegistryTwoArg<EventTeam, EventTeamRaw, EEvent>((json, event) => new EventTeam(json, event));
}

class TeamRaw {
    id:number;
}

class Team {
    id:number;

    private constructor(json:TeamRaw) {
        this.fromJSON(json);
    }

    fromJSON(json:TeamRaw) {
        this.id = json.id;
    }

    static registry = new Registry<Team, TeamRaw>(json => new Team(json));

}

interface LineupRaw {
    id:number;
    playerPositions:LineupPositionRaw[];
}

class Lineup {
    id:number;
    fantasyEvent:FantasyEvent;
    playerPositions:LineupPosition[] = [];

    private constructor(json:LineupRaw, fantasyEvent:FantasyEvent) {
        this.fantasyEvent = fantasyEvent;
        this.fromJSON(json);
    }

    fromJSON(json:LineupRaw) {
        this.id = json.id;
        patch(this.playerPositions, json.playerPositions.map(p => LineupPosition.registry.create(p)));
        json.playerPositions.forEach(pp => {
            if (pp.playerId) {
                const player = this.fantasyEvent.allPlayers.filter(player => player.player.id == pp.playerId).pop()!;
                const position = FantasyPosition.registry.findOrThrow(pp.positionId);
                if (!this.addPlayerToPosition(player, position)) {
                    throw new Error('Cannot add player');
                }
            }
        });
    }

    static registry = new RegistryTwoArg<Lineup, LineupRaw, FantasyEvent>((json, fantasyEvent) => new Lineup(json, fantasyEvent));


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

    private constructor(json:LineupPositionRaw) {
        this.fromJSON(json);
    }

    fromJSON(json:LineupPositionRaw) {
        this.id = json.id
        this.position = FantasyPosition.registry.findOrThrow(json.positionId);
    }

    static registry = new Registry<LineupPosition, LineupPositionRaw>(json => new LineupPosition(json));
}



interface FantasyPositionRaw {
    id:number;
    name:string;
    positions:PPositionRaw[];
}

class FantasyPosition {
    id:number;
    name:string;
    positions:PPosition[] = [];

    private constructor(json:FantasyPositionRaw) {
        this.fromJSON(json);
    }

    fromJSON(json:FantasyPositionRaw) {
        this.id = json.id;
        this.name = json.name;
        patch(this.positions, json.positions.map(p => PPosition.registry.create(p)));
    }

    static registry = new Registry<FantasyPosition, FantasyPositionRaw>(json => new FantasyPosition(json));

}

interface PPositionRaw {
    id:number;
    name:string;
}
class PPosition {
    id:number;
    name:string;

    private constructor(json:PPositionRaw) {
        this.fromJSON(json);
    }

    fromJSON(json:PPositionRaw) {
        this.id = json.id;
        this.name = json.name;
    }

    static registry = new Registry<PPosition, PPositionRaw>(json => new PPosition(json));
}


interface EventPlayerRaw {
    id:number;
    player:PlayerRaw;
    positionIds:number[];
    score:number;
    salary:number;
}



class EventPlayer {
    id:number;
    event:EEvent;
    player:Player;
    positions:PPosition[] = [];
    score:number;
    salary:number;

    private constructor(json:EventPlayerRaw, event:EEvent) {
        this.event = event;
        this.fromJSON(json);
    }

    fromJSON(json:EventPlayerRaw) {
        this.player = Player.registry.create(json.player);
        patch(this.positions, json.positionIds.map(id => PPosition.registry.findOrThrow(id)));
        this.score = json.score;
        this.salary = json.salary;
    }

    static registry = new RegistryTwoArg<EventPlayer, EventPlayerRaw, EEvent>((json, event) => new EventPlayer(json, event))
}

interface PlayerRaw {
    id:number;
    name:string;
}

class Player {
    id:number;
    name:string;

    private constructor(json:PlayerRaw) {
        this.fromJSON(json);
    }

    fromJSON(json:PlayerRaw) {
        this.id = json.id;
        this.name = json.name;
    }

    static registry = new Registry<Player, PlayerRaw>(json => new Player(json));
}


const json:FantasyEventRaw = {
    id: 1,
    lineup: {
        id: 1,
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
                id: 1,
                team: {
                    id: 1,
                },
                players: [
                    {
                        id: 1,
                        score: 1,
                        salary: 1000,
                        player: {
                            id: 1,
                            name: 'Ricky Martin'
                        },
                        positionIds: [1, 2]
                    },
                    {
                        id: 2,
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
                id: 2,
                team: {
                    id: 2,
                },
                players: [
                    {
                        id: 3,
                        score: 2,
                        salary: 2000,
                        player: {
                            id: 2,
                            name: 'Adam Sandler'
                        },
                        positionIds: [1, 2]
                    },
                    {
                        id: 4,
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


const fe = FantasyEvent.registry.create(json);
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










