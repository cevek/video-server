import * as React from 'react';

class Route<URL_PARAMS> {
    constructor(public url:string, public component:any) {

    }

    addChild(route:Route<{}>):this {
        return this;
    }

    onEnter<RESOLVED_DATA>(onEnter:(params:URL_PARAMS)=>Promise<RESOLVED_DATA>):this {
        return this;
    }
}

interface RouteComponent<T> {
    onEnter?():Promise<T>
    onLeave?():Promise<T>
    new (props:{}):React.Component<{}, {}>
}

class Store {
    pos:Pos;

    static fetch() {
        return new Promise((resolve) => {
            resolve(new Store);
        });
    }
}

class Pos {
    id:number;
}

class Profile {
    userId:number;

    constructor(public store:Store) {

    }

    static fetch(store:Store) {
        return new Promise((resolve, reject) => {
            resolve(new Profile(store));
        });
    }
}



class WithdrawalStore {
    items:Withdrawal[]
    static fetch(store: Store, profile: Profile){
        return new Promise((resolve, reject) => {
            resolve(new WithdrawalStore());
        });
    }
}

class Withdrawal {
    id:number;
    static fetch(store: Store){
        return new Promise((resolve, reject) => {
            resolve(new Withdrawal());
        });
    }
}


/*
const index = new Route<{}>('/', IndexView).onEnter((params) => Store.fetch());
const profile = index.addChild(new Route<{}>('profile', ProfileView).onEnter(params => Profile.fetch(params)));

const profileWithdrawals = profile.addChild(new Route('withdrawals', ProfileWithdrawalsView));
const profileWithdrawalItem = profileWithdrawals.addChild(new Route<{id:number}>(':id', ProfileWithdrawalItemView));
*/


class R<T> {
    protected onEnter(data: {}): Promise<{}>{
        return null;
    }

    toUrl(params:T) {

    }
}


interface WithdrawalItemURL {id:number}

interface IndexResolved {store:Store}
interface ProfileResolved {profile:Profile}
interface WithdrawalsResolved {withdrawals:WithdrawalStore}
interface WithdrawalItemResolved {withdrawalItem:Withdrawal}


const indexR = new class IndexR extends R<{}> {
    protected component = IndexView;

    protected onEnter():Promise<IndexResolved> {
        return Store.fetch().then(data => ({store: data}))
    }

    profile = new class extends R<{}> {
        protected component = ProfileView;

        protected onEnter(data: IndexResolved):Promise<ProfileResolved> {
            return Profile.fetch(data.store).then(data => ({profile: data}))
        }

        withdrawals = new class extends R<{}> {
            protected component = ProfileWithdrawalsView;

            protected onEnter(data:IndexResolved & ProfileResolved): Promise<WithdrawalsResolved> {
                return WithdrawalStore.fetch(data.store, data.profile).then(data => ({withdrawals: data}))
            }

            item = new class extends R<WithdrawalItemURL> {
                protected component = ProfileWithdrawalItemView;

                protected onEnter(data:IndexResolved): Promise<WithdrawalItemResolved> {
                    return Withdrawal.fetch(data.store).then(data => ({withdrawalItem: data}))
                }
            }
        }
    }
}


indexR.profile.withdrawals.item.toUrl({id: 123})



class IndexView {
}

class ProfileView {
}

class ProfileWithdrawalsView {
}

class ProfileWithdrawalItemView extends React.Component<{}, {}> {
}