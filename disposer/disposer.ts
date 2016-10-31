class Item {
    pos: number;
    bottomSpace = 0;
    power: number

    constructor(public realPos: number, top: number, public height: number) {
        this.pos = top + height / 2;
        this.power = realPos - this.pos;
    }

    move(len: number) {
        this.bottomSpace -= len;
        this.power -= len;
        this.pos += len;
    }
}

interface GG {
    value: number;
    height: number;
}

function disposer(values: GG[]) {
    let len = values.length;
    if (len == 0) {
        return [];
    }
    let top = 0;
    const stage: Item[] = new Array(len);
    for (let i = 0; i < len; i++) {
        let value = values[i];
        stage[i] = new Item(value.value, top, value.height);
        top += value.height;
    }
    stage[len - 1].bottomSpace = Infinity;
    for (let i = len - 1; i >= 0; i--) {
        let value = stage[i];
        if (value.power <= 0) {
            continue;
        }
        let count = 0;
        let power = 0;
        for (let j = i; j < len; j++) {
            let value = stage[j];
            count++;
            power += value.power;
            const eatSpaceSize = Math.min(value.bottomSpace, Math.ceil(power / count));
            power -= eatSpaceSize * count;
            if (eatSpaceSize != 0) {
                for (let k = j; k >= i; k--) {
                    let value = stage[k];
                    value.move(eatSpaceSize);
                    if (k > 0) {
                        const nextEl = stage[k - 1];
                        nextEl.bottomSpace += eatSpaceSize;
                    }
                    render(stage);
                }
            }
            if (power <= 0) {
                break;
            }
        }
    }
    return stage;
}


const stage = [10, 20, 30, 120, 160, 170, 180, 220, 280, 340, 345, 350, 400, 450, 480, 490, 500, 520, 600, 610];
const result = disposer(stage.map((value, i) => ({value, height: i % 2 ? 15 : 40 })));
console.log(JSON.stringify(result));
render(result);


function render(result: Item[]) {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    for (let i = 0; i < result.length; i++) {
        const item = result[i];
        ctx.moveTo(70, item.realPos);
        ctx.lineTo(100, item.pos);
        ctx.rect(100, item.pos - item.height / 2, 50, item.height);
        ctx.fillText(item.power.toFixed(1), 120, item.pos);
    }
    ctx.stroke();
}


function tests() {
    const h25 = [{"realPos": 10, "height": 25, "bottomSpace": 0, "pos": 12.5, "power": -2.5}, {
        "realPos": 20,
        "height": 25,
        "bottomSpace": 0,
        "pos": 37.5,
        "power": -17.5
    }, {"realPos": 30, "height": 25, "bottomSpace": 33, "pos": 62.5, "power": -32.5}, {
        "realPos": 120,
        "height": 25,
        "bottomSpace": 0,
        "pos": 120.5,
        "power": -0.5
    }, {"realPos": 160, "height": 25, "bottomSpace": 0, "pos": 145.5, "power": 14.5}, {
        "realPos": 170,
        "height": 25,
        "bottomSpace": 0,
        "pos": 170.5,
        "power": -0.5
    }, {"realPos": 180, "height": 25, "bottomSpace": 0, "pos": 195.5, "power": -15.5}, {
        "realPos": 220,
        "height": 25,
        "bottomSpace": 35,
        "pos": 220.5,
        "power": -0.5
    }, {"realPos": 280, "height": 25, "bottomSpace": 15, "pos": 280.5, "power": -0.5}, {
        "realPos": 340,
        "height": 25,
        "bottomSpace": 0,
        "pos": 320.5,
        "power": 19.5
    }, {"realPos": 345, "height": 25, "bottomSpace": 0, "pos": 345.5, "power": -0.5}, {
        "realPos": 350,
        "height": 25,
        "bottomSpace": 5,
        "pos": 370.5,
        "power": -20.5
    }, {"realPos": 400, "height": 25, "bottomSpace": 13, "pos": 400.5, "power": -0.5}, {
        "realPos": 450,
        "height": 25,
        "bottomSpace": 0,
        "pos": 438.5,
        "power": 11.5
    }, {"realPos": 480, "height": 25, "bottomSpace": 0, "pos": 463.5, "power": 16.5}, {
        "realPos": 490,
        "height": 25,
        "bottomSpace": 0,
        "pos": 488.5,
        "power": 1.5
    }, {"realPos": 500, "height": 25, "bottomSpace": 0, "pos": 513.5, "power": -13.5}, {
        "realPos": 520,
        "height": 25,
        "bottomSpace": 29,
        "pos": 538.5,
        "power": -18.5
    }, {"realPos": 600, "height": 25, "bottomSpace": 0, "pos": 592.5, "power": 7.5}, {
        "realPos": 610,
        "height": 25,
        "bottomSpace": null,
        "pos": 617.5,
        "power": -7.5
    }]
    const h20 = [{"realPos": 10, "height": 20, "bottomSpace": 0, "pos": 10, "power": 0}, {
        "realPos": 20,
        "height": 20,
        "bottomSpace": 0,
        "pos": 30,
        "power": -10
    }, {"realPos": 30, "height": 20, "bottomSpace": 50, "pos": 50, "power": -20}, {
        "realPos": 120,
        "height": 20,
        "bottomSpace": 10,
        "pos": 120,
        "power": 0
    }, {"realPos": 160, "height": 20, "bottomSpace": 0, "pos": 150, "power": 10}, {
        "realPos": 170,
        "height": 20,
        "bottomSpace": 0,
        "pos": 170,
        "power": 0
    }, {"realPos": 180, "height": 20, "bottomSpace": 10, "pos": 190, "power": -10}, {
        "realPos": 220,
        "height": 20,
        "bottomSpace": 40,
        "pos": 220,
        "power": 0
    }, {"realPos": 280, "height": 20, "bottomSpace": 25, "pos": 280, "power": 0}, {
        "realPos": 340,
        "height": 20,
        "bottomSpace": 0,
        "pos": 325,
        "power": 15
    }, {"realPos": 345, "height": 20, "bottomSpace": 0, "pos": 345, "power": 0}, {
        "realPos": 350,
        "height": 20,
        "bottomSpace": 15,
        "pos": 365,
        "power": -15
    }, {"realPos": 400, "height": 20, "bottomSpace": 28, "pos": 400, "power": 0}, {
        "realPos": 450,
        "height": 20,
        "bottomSpace": 0,
        "pos": 448,
        "power": 2
    }, {"realPos": 480, "height": 20, "bottomSpace": 0, "pos": 468, "power": 12}, {
        "realPos": 490,
        "height": 20,
        "bottomSpace": 0,
        "pos": 488,
        "power": 2
    }, {"realPos": 500, "height": 20, "bottomSpace": 0, "pos": 508, "power": -8}, {
        "realPos": 520,
        "height": 20,
        "bottomSpace": 47,
        "pos": 528,
        "power": -8
    }, {"realPos": 600, "height": 20, "bottomSpace": 0, "pos": 595, "power": 5}, {
        "realPos": 610,
        "height": 20,
        "bottomSpace": null,
        "pos": 615,
        "power": -5
    }];
    const h28 = [{"realPos": 10, "height": 28, "bottomSpace": 0, "pos": 14, "power": -4}, {
        "realPos": 20,
        "height": 28,
        "bottomSpace": 0,
        "pos": 42,
        "power": -22
    }, {"realPos": 30, "height": 28, "bottomSpace": 0, "pos": 70, "power": -40}, {
        "realPos": 120,
        "height": 28,
        "bottomSpace": 0,
        "pos": 98,
        "power": 22
    }, {"realPos": 160, "height": 28, "bottomSpace": 0, "pos": 126, "power": 34}, {
        "realPos": 170,
        "height": 28,
        "bottomSpace": 0,
        "pos": 154,
        "power": 16
    }, {"realPos": 180, "height": 28, "bottomSpace": 10, "pos": 182, "power": -2}, {
        "realPos": 220,
        "height": 28,
        "bottomSpace": 32,
        "pos": 220,
        "power": 0
    }, {"realPos": 280, "height": 28, "bottomSpace": 9, "pos": 280, "power": 0}, {
        "realPos": 340,
        "height": 28,
        "bottomSpace": 0,
        "pos": 317,
        "power": 23
    }, {"realPos": 345, "height": 28, "bottomSpace": 0, "pos": 345, "power": 0}, {
        "realPos": 350,
        "height": 28,
        "bottomSpace": 0,
        "pos": 373,
        "power": -23
    }, {"realPos": 400, "height": 28, "bottomSpace": 3, "pos": 401, "power": -1}, {
        "realPos": 450,
        "height": 28,
        "bottomSpace": 0,
        "pos": 432,
        "power": 18
    }, {"realPos": 480, "height": 28, "bottomSpace": 0, "pos": 460, "power": 20}, {
        "realPos": 490,
        "height": 28,
        "bottomSpace": 0,
        "pos": 488,
        "power": 2
    }, {"realPos": 500, "height": 28, "bottomSpace": 0, "pos": 516, "power": -16}, {
        "realPos": 520,
        "height": 28,
        "bottomSpace": 19,
        "pos": 544,
        "power": -24
    }, {"realPos": 600, "height": 28, "bottomSpace": 0, "pos": 591, "power": 9}, {
        "realPos": 610,
        "height": 28,
        "bottomSpace": null,
        "pos": 619,
        "power": -9
    }];
}