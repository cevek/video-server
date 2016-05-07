import {Atom, TaskType, IDMap, AtomAffectStatus, AtomStatus} from "./index";
class ComponentAtom extends Atom {
    protected cmp:any;

    constructor(cmp:any) {
        super();
        this.getter(cmp.constructor.name + '.render', cmp, cmp.mainRender);
        this.cmp = cmp;
    }

    protected update(transactionId: number) {
        const masters = this.masters;
        if (masters && masters.length > 1) {
            for (let i = 0, len = masters.length; i < len; i++) {
                const master = masters[i] as ComponentAtom;
                if (master.counter === transactionId && master.status === AtomStatus.CALCULATING) {
                    return;
                }
            }
        }

        console.info("Update", this.cmp.constructor.name);


        if (Atom.debugAtoms && (Atom.debugAtoms[this.field] || Atom.debugAtoms[this.id])) {
            Atom.debug();
        }
        if (this.status === AtomStatus.CALCULATING) {
            this.cmp.forceUpdate();
            this.status = AtomStatus.GETTER;
        }
    }
}

export const autowatch = function (cls:any) {
    cls.prototype.componentAtom = null;
    cls.prototype.mainRender = cls.prototype.render;
    cls.prototype.shouldComponentUpdate = function (nextProps:any) {
        for (const prop in nextProps) {
            if (this.props[prop] !== nextProps[prop]) {
                return true;
            }
        }
        for (const prop in this.props) {
            if (this.props[prop] !== nextProps[prop]) {
                return true;
            }
        }
        return false;
    }
    cls.prototype.componentWillUnmount = function () {
        this.componentAtom.destroy();
    }
    cls.prototype.render = function () {
        if (this.componentAtom) {
            return this.componentAtom.getWithForceCalc();
        }
        else {
            return (this.componentAtom = new ComponentAtom(this)).getWithForceCalc();
        }
    }
}
