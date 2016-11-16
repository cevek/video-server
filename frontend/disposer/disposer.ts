export class DisposerItem {
    pos: number;
    bottomSpace = 0;
    power: number;
    realPos: number;

    get top() {
        return this.pos - this.height / 2;
    }

    get bottom() {
        return this.pos + this.height / 2;
    }

    get realHeight() {
        return this.realBottom - this.realTop;
    }

    constructor(public realTop: number, public realBottom: number, top: number, public height: number) {
        this.pos = top + height / 2;
        this.realPos = this.realTop + (this.realBottom - this.realTop) / 2;
        this.power = this.realPos - this.pos;
    }
}

interface GG {
    top: number;
    bottom: number;
    height: number;
}


export function disposer(values: GG[]): DisposerItem[] {
    let len = values.length;
    if (len == 0) {
        return [];
    }
    let top = 0;
    const stage: DisposerItem[] = new Array(len);
    for (let i = 0; i < len; i++) {
        let value = values[i];
        stage[i] = new DisposerItem(value.top, value.bottom, top, value.height);
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
                    value.bottomSpace -= eatSpaceSize;
                    value.power -= eatSpaceSize;
                    value.pos += eatSpaceSize;
                    if (k > 0) {
                        const nextEl = stage[k - 1];
                        nextEl.bottomSpace += eatSpaceSize;
                    }
                }
            }
            if (power <= 0) {
                break;
            }
        }
    }
    return stage;
}


export function disposerWithGroup(groups: {start: number; end: number}[], values: GG[]) {
    const groupValues: GG[] = [];
    for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        let posSum = 0;
        let heightSum = 0;
        for (let j = group.start; j <= group.end; j++) {
            let val = values[j];
            posSum += val.top + (val.bottom - val.top) / 2;
            heightSum += val.height;
        }
        const middle = values[group.start].top + (values[group.end].bottom - values[group.start].top) / 2; //posSum / (group.end - group.start + 1);
        const item = {top: middle - 10, bottom: middle + 10, height: heightSum};
        groupValues.push(item);
    }
    const generated = disposer(groupValues);
    console.log(generated);

    const newArr: DisposerItem[] = [];
    for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        let top = generated[i].top;
        for (let j = group.start; j <= group.end; j++) {
            const value = values[j];
            const item = new DisposerItem(value.top, value.bottom, top, value.height);
            top += value.height;
            newArr.push(item);
        }
    }
    return newArr;
}
const gr = [{"start": 0, "end": 5}, {"start": 6, "end": 11}, {"start": 12, "end": 14}, {
    "start": 15,
    "end": 41
}, {"start": 42, "end": 49}, {"start": 50, "end": 64}, {"start": 65, "end": 69}, {"start": 70, "end": 80}, {
    "start": 81,
    "end": 81
}, {"start": 82, "end": 82}, {"start": 83, "end": 84}, {"start": 85, "end": 85}, {"start": 86, "end": 87}, {
    "start": 88,
    "end": 88
}, {"start": 89, "end": 89}, {"start": 90, "end": 103}, {"start": 104, "end": 108}, {
    "start": 109,
    "end": 113
}, {"start": 114, "end": 121}, {"start": 122, "end": 127}, {"start": 128, "end": 145}, {
    "start": 146,
    "end": 146
}, {"start": 147, "end": 163}, {"start": 164, "end": 172}, {"start": 173, "end": 178}, {
    "start": 179,
    "end": 190
}, {"start": 191, "end": 191}, {"start": 192, "end": 194}, {"start": 195, "end": 213}, {
    "start": 214,
    "end": 217
}, {"start": 218, "end": 250}, {"start": 251, "end": 251}, {"start": 252, "end": 252}, {
    "start": 253,
    "end": 254
}, {"start": 255, "end": 265}, {"start": 266, "end": 267}, {"start": 268, "end": 275}, {
    "start": 276,
    "end": 284
}, {"start": 285, "end": 285}, {"start": 286, "end": 286}, {"start": 287, "end": 287}, {
    "start": 288,
    "end": 296
}, {"start": 297, "end": 297}, {"start": 298, "end": 298}, {"start": 299, "end": 301}, {
    "start": 302,
    "end": 324
}, {"start": 325, "end": 333}, {"start": 334, "end": 341}, {"start": 342, "end": 342}, {
    "start": 343,
    "end": 347
}, {"start": 348, "end": 350}, {"start": 351, "end": 351}, {"start": 352, "end": 363}, {
    "start": 364,
    "end": 364
}, {"start": 365, "end": 366}, {"start": 367, "end": 370}, {"start": 371, "end": 372}];
const test = [{"top": 731, "bottom": 755.7499999999999, "height": 50}, {
    "top": 792.25,
    "bottom": 822.5,
    "height": 50
}, {"top": 822.5, "bottom": 904.25, "height": 50}, {
    "top": 905.5,
    "bottom": 978.2499999999999,
    "height": 50
}, {"top": 999, "bottom": 1031.75, "height": 50}, {"top": 1034.5, "bottom": 1117, "height": 50}, {
    "top": 1285.5,
    "bottom": 1305.25,
    "height": 50
}, {"top": 1305.5, "bottom": 1311.75, "height": 50}, {"top": 1312.25, "bottom": 1328.25, "height": 50}, {
    "top": 1328.25,
    "bottom": 1355.25,
    "height": 50
}, {"top": 1374.5, "bottom": 1411.75, "height": 50}, {"top": 1414.5, "bottom": 1461.5, "height": 50}, {
    "top": 1603.25,
    "bottom": 1666.75,
    "height": 50
}, {"top": 1677.25, "bottom": 1746.75, "height": 50}, {"top": 1747.75, "bottom": 1836.25, "height": 50}, {
    "top": 1996,
    "bottom": 2031.0000000000002,
    "height": 50
}, {"top": 2066.75, "bottom": 2093.25, "height": 50}, {"top": 2099, "bottom": 2125.5, "height": 50}, {
    "top": 2126.75,
    "bottom": 2161.75,
    "height": 50
}, {"top": 2164.75, "bottom": 2180.75, "height": 50}, {"top": 2181, "bottom": 2204.5, "height": 50}, {
    "top": 2278,
    "bottom": 2315.7500000000005,
    "height": 50
}, {"top": 2316.75, "bottom": 2354.5, "height": 50}, {"top": 2355, "bottom": 2413, "height": 50}, {
    "top": 2413.25,
    "bottom": 2458.75,
    "height": 50
}, {"top": 2475.75, "bottom": 2511.5, "height": 50}, {"top": 2511.75, "bottom": 2571, "height": 50}, {
    "top": 2584.75,
    "bottom": 2612.75,
    "height": 50
}, {"top": 2616.75, "bottom": 2676.5, "height": 50}, {"top": 2697.5, "bottom": 2733.75, "height": 50}, {
    "top": 2734,
    "bottom": 2798.25,
    "height": 50
}, {"top": 2798.25, "bottom": 2826, "height": 50}, {"top": 2874, "bottom": 2944, "height": 50}, {
    "top": 2944,
    "bottom": 2987.75,
    "height": 50
}, {"top": 2988.25, "bottom": 3051, "height": 50}, {"top": 3052.25, "bottom": 3127.25, "height": 50}, {
    "top": 3159.5,
    "bottom": 3238.25,
    "height": 50
}, {"top": 3240.75, "bottom": 3276.5, "height": 50}, {"top": 3276.75, "bottom": 3339.75, "height": 50}, {
    "top": 3365,
    "bottom": 3434.5,
    "height": 50
}, {"top": 3461, "bottom": 3517.75, "height": 50}, {"top": 3517.75, "bottom": 3556, "height": 50}, {
    "top": 3734.5,
    "bottom": 3759.25,
    "height": 50
}, {"top": 3799, "bottom": 3886.5, "height": 50}, {"top": 3887.75, "bottom": 3984.5, "height": 50}, {
    "top": 3985.25,
    "bottom": 4053,
    "height": 50
}, {"top": 4054.75, "bottom": 4089.75, "height": 50}, {
    "top": 4090.75,
    "bottom": 4139.75,
    "height": 50
}, {"top": 4141.75, "bottom": 4209, "height": 50}, {"top": 4209, "bottom": 4292, "height": 50}, {
    "top": 4570.5,
    "bottom": 4617.25,
    "height": 50
}, {"top": 4621.25, "bottom": 4695, "height": 50}, {"top": 4730, "bottom": 4764.5, "height": 50}, {
    "top": 4764.5,
    "bottom": 4796.5,
    "height": 50
}, {"top": 4797.75, "bottom": 4864, "height": 50}, {"top": 4906, "bottom": 4945, "height": 50}, {
    "top": 5014.25,
    "bottom": 5039,
    "height": 50
}, {"top": 5042.75, "bottom": 5098, "height": 50}, {"top": 5098.5, "bottom": 5153, "height": 50}, {
    "top": 5207.25,
    "bottom": 5260,
    "height": 50
}, {"top": 5270.25, "bottom": 5338, "height": 50}, {"top": 5361.75, "bottom": 5416.5, "height": 50}, {
    "top": 5416.5,
    "bottom": 5462.5,
    "height": 50
}, {"top": 5469.5, "bottom": 5510, "height": 50}, {"top": 5510, "bottom": 5587.25, "height": 50}, {
    "top": 5673.25,
    "bottom": 5732.75,
    "height": 50
}, {"top": 5736, "bottom": 5783.25, "height": 50}, {"top": 5783.25, "bottom": 5835.75, "height": 50}, {
    "top": 5836.75,
    "bottom": 5889.5,
    "height": 50
}, {"top": 5890, "bottom": 5940.25, "height": 50}, {"top": 6051.5, "bottom": 6079.75, "height": 50}, {
    "top": 6095.5,
    "bottom": 6121.75,
    "height": 50
}, {"top": 6124.75, "bottom": 6155.25, "height": 50}, {"top": 6155.5, "bottom": 6174, "height": 50}, {
    "top": 6176,
    "bottom": 6230.5,
    "height": 50
}, {"top": 6230.5, "bottom": 6279.5, "height": 50}, {"top": 6334.5, "bottom": 6392.25, "height": 50}, {
    "top": 6431.75,
    "bottom": 6498.5,
    "height": 50
}, {"top": 6542.5, "bottom": 6617, "height": 50}, {"top": 6617.5, "bottom": 6651.75, "height": 50}, {
    "top": 6652,
    "bottom": 6730.249999999999,
    "height": 50
}, {"top": 6783.750000000001, "bottom": 6824.75, "height": 50}, {
    "top": 7012.75,
    "bottom": 7094,
    "height": 50
}, {"top": 7514, "bottom": 7548.25, "height": 50}, {"top": 7595.5, "bottom": 7702.75, "height": 50}, {
    "top": 7875.5,
    "bottom": 7914.5,
    "height": 50
}, {"top": 8012.25, "bottom": 8035.5, "height": 50}, {"top": 8081, "bottom": 8189.25, "height": 50}, {
    "top": 8240.5,
    "bottom": 8356,
    "height": 50
}, {"top": 8431, "bottom": 8464.25, "height": 50}, {"top": 8836.75, "bottom": 8860.75, "height": 50}, {
    "top": 8863.25,
    "bottom": 8907.749999999998,
    "height": 50
}, {"top": 8909, "bottom": 8944.250000000002, "height": 50}, {
    "top": 8974,
    "bottom": 9023.25,
    "height": 50
}, {"top": 9035.5, "bottom": 9060.5, "height": 50}, {"top": 9079.5, "bottom": 9114.25, "height": 50}, {
    "top": 9135.5,
    "bottom": 9158.75,
    "height": 50
}, {"top": 9175, "bottom": 9200, "height": 50}, {"top": 9200, "bottom": 9231.5, "height": 50}, {
    "top": 9239.5,
    "bottom": 9284.75,
    "height": 50
}, {"top": 9294.5, "bottom": 9319.5, "height": 50}, {
    "top": 9360,
    "bottom": 9455.999999999998,
    "height": 50
}, {"top": 9456.75, "bottom": 9545.5, "height": 50}, {"top": 9546.75, "bottom": 9616.75, "height": 50}, {
    "top": 9681.75,
    "bottom": 9715,
    "height": 50
}, {"top": 9718, "bottom": 9759.25, "height": 50}, {"top": 9760, "bottom": 9836, "height": 50}, {
    "top": 9860.5,
    "bottom": 9940.75,
    "height": 50
}, {"top": 9942.75, "bottom": 10049.499999999998, "height": 50}, {
    "top": 10079.5,
    "bottom": 10115,
    "height": 50
}, {"top": 10115, "bottom": 10149.75, "height": 50}, {"top": 10150, "bottom": 10179, "height": 50}, {
    "top": 10179.5,
    "bottom": 10209,
    "height": 50
}, {"top": 10217.75, "bottom": 10252.5, "height": 50}, {
    "top": 10349,
    "bottom": 10381.75,
    "height": 50
}, {"top": 10386.75, "bottom": 10410.25, "height": 50}, {
    "top": 10434,
    "bottom": 10461.25,
    "height": 50
}, {"top": 10472.75, "bottom": 10497.000000000002, "height": 50}, {
    "top": 10524,
    "bottom": 10606.75,
    "height": 50
}, {"top": 10606.75, "bottom": 10651.249999999998, "height": 50}, {
    "top": 10668.25,
    "bottom": 10715,
    "height": 50
}, {"top": 10722.75, "bottom": 10774.25, "height": 50}, {
    "top": 10865,
    "bottom": 10934.750000000002,
    "height": 50
}, {"top": 10989.25, "bottom": 11081, "height": 50}, {"top": 11081.75, "bottom": 11169, "height": 50}, {
    "top": 11170.75,
    "bottom": 11218.249999999998,
    "height": 50
}, {"top": 11221, "bottom": 11324.499999999998, "height": 50}, {
    "top": 11325.5,
    "bottom": 11403,
    "height": 50
}, {"top": 11500.5, "bottom": 11520.5, "height": 50}, {"top": 11546, "bottom": 11611.75, "height": 50}, {
    "top": 11614,
    "bottom": 11651.25,
    "height": 50
}, {"top": 11674, "bottom": 11715.75, "height": 50}, {
    "top": 11719.75,
    "bottom": 11773.750000000002,
    "height": 50
}, {"top": 11776.25, "bottom": 11805.75, "height": 50}, {
    "top": 11807.75,
    "bottom": 11856.5,
    "height": 50
}, {"top": 11856.5, "bottom": 11889, "height": 50}, {"top": 11896.5, "bottom": 11949.5, "height": 50}, {
    "top": 12001.5,
    "bottom": 12076,
    "height": 50
}, {"top": 12077.25, "bottom": 12146, "height": 50}, {
    "top": 12175.5,
    "bottom": 12224.499999999998,
    "height": 50
}, {"top": 12224.5, "bottom": 12284.25, "height": 50}, {"top": 12315.5, "bottom": 12342, "height": 50}, {
    "top": 12342,
    "bottom": 12371.5,
    "height": 50
}, {"top": 12371.75, "bottom": 12404, "height": 50}, {"top": 12417, "bottom": 12438.5, "height": 50}, {
    "top": 12452.75,
    "bottom": 12502.000000000002,
    "height": 50
}, {"top": 12635.5, "bottom": 12728, "height": 50}, {
    "top": 12762.25,
    "bottom": 12864.500000000002,
    "height": 50
}, {"top": 12885, "bottom": 12927.25, "height": 50}, {
    "top": 12935.25,
    "bottom": 12995.999999999998,
    "height": 50
}, {"top": 13041.5, "bottom": 13072.25, "height": 50}, {
    "top": 13074.25,
    "bottom": 13107.500000000002,
    "height": 50
}, {"top": 13107.499999999998, "bottom": 13130.249999999998, "height": 50}, {
    "top": 13131.75,
    "bottom": 13229.249999999998,
    "height": 50
}, {"top": 13254, "bottom": 13287, "height": 50}, {"top": 13287.75, "bottom": 13372, "height": 50}, {
    "top": 13375.5,
    "bottom": 13401.749999999998,
    "height": 50
}, {"top": 13407.499999999998, "bottom": 13463, "height": 50}, {
    "top": 13465,
    "bottom": 13548.000000000002,
    "height": 50
}, {"top": 13576, "bottom": 13610.999999999998, "height": 50}, {
    "top": 13632.499999999998,
    "bottom": 13700.75,
    "height": 50
}, {"top": 13714.500000000002, "bottom": 13778.5, "height": 50}, {
    "top": 13802.75,
    "bottom": 13836.75,
    "height": 50
}, {"top": 13919.75, "bottom": 13976.999999999998, "height": 50}, {
    "top": 14130.25,
    "bottom": 14171.5,
    "height": 50
}, {"top": 14212.75, "bottom": 14287.25, "height": 50}, {
    "top": 14289.500000000002,
    "bottom": 14367.500000000002,
    "height": 50
}, {"top": 14368.75, "bottom": 14427.75, "height": 50}, {
    "top": 14429,
    "bottom": 14463.749999999998,
    "height": 50
}, {"top": 14464.500000000002, "bottom": 14517.500000000002, "height": 50}, {
    "top": 14519,
    "bottom": 14554,
    "height": 50
}, {"top": 14620.500000000002, "bottom": 14670.750000000002, "height": 50}, {
    "top": 14676.249999999998,
    "bottom": 14710.25,
    "height": 50
}, {"top": 14829.249999999998, "bottom": 14860.499999999998, "height": 50}, {
    "top": 14924.5,
    "bottom": 14973.000000000002,
    "height": 50
}, {"top": 14981, "bottom": 15047, "height": 50}, {
    "top": 15048.500000000002,
    "bottom": 15104.750000000002,
    "height": 50
}, {"top": 15105.5, "bottom": 15163.750000000002, "height": 50}, {
    "top": 15191.5,
    "bottom": 15234.25,
    "height": 50
}, {"top": 15332.499999999998, "bottom": 15382, "height": 50}, {
    "top": 15425.5,
    "bottom": 15491.5,
    "height": 50
}, {"top": 15492.75, "bottom": 15529.250000000002, "height": 50}, {
    "top": 15530.5,
    "bottom": 15592.250000000002,
    "height": 50
}, {"top": 15606, "bottom": 15653.75, "height": 50}, {
    "top": 15654.249999999998,
    "bottom": 15725.25,
    "height": 50
}, {"top": 15726, "bottom": 15831.5, "height": 50}, {"top": 15835, "bottom": 15889.75, "height": 50}, {
    "top": 15917.75,
    "bottom": 15980.75,
    "height": 50
}, {"top": 15982.25, "bottom": 16016, "height": 50}, {
    "top": 16029.249999999998,
    "bottom": 16053,
    "height": 50
}, {"top": 16072.75, "bottom": 16106.5, "height": 50}, {
    "top": 16356.75,
    "bottom": 16428.25,
    "height": 50
}, {"top": 16790.5, "bottom": 16853, "height": 50}, {
    "top": 16878.25,
    "bottom": 16942.75,
    "height": 50
}, {"top": 16943.25, "bottom": 16980, "height": 50}, {"top": 17109, "bottom": 17131.5, "height": 50}, {
    "top": 17134,
    "bottom": 17163,
    "height": 50
}, {"top": 17165, "bottom": 17222, "height": 50}, {"top": 17254.5, "bottom": 17285.5, "height": 50}, {
    "top": 17286.75,
    "bottom": 17370.5,
    "height": 50
}, {"top": 17386, "bottom": 17411.5, "height": 50}, {"top": 17411.5, "bottom": 17438, "height": 50}, {
    "top": 17438.25,
    "bottom": 17513.5,
    "height": 50
}, {"top": 17523.25, "bottom": 17571.75, "height": 50}, {
    "top": 17588.25,
    "bottom": 17628.75,
    "height": 50
}, {"top": 17628.75, "bottom": 17654.25, "height": 50}, {
    "top": 17655.5,
    "bottom": 17700.25,
    "height": 50
}, {"top": 17700.5, "bottom": 17754.25, "height": 50}, {
    "top": 17775,
    "bottom": 17840.5,
    "height": 50
}, {"top": 17863.25, "bottom": 17909, "height": 50}, {
    "top": 17940.5,
    "bottom": 18002.75,
    "height": 50
}, {"top": 18053.25, "bottom": 18122, "height": 50}, {
    "top": 18123.25,
    "bottom": 18181.75,
    "height": 50
}, {"top": 18182.25, "bottom": 18251.75, "height": 50}, {
    "top": 18404,
    "bottom": 18441.75,
    "height": 50
}, {"top": 18454.5, "bottom": 18491, "height": 50}, {"top": 18494, "bottom": 18567.25, "height": 50}, {
    "top": 18567.25,
    "bottom": 18632.5,
    "height": 50
}, {"top": 18747.75, "bottom": 18796.75, "height": 50}, {"top": 18804, "bottom": 18859, "height": 50}, {
    "top": 18859,
    "bottom": 18941.5,
    "height": 50
}, {"top": 18942.75, "bottom": 18967.75, "height": 50}, {"top": 19019, "bottom": 19073, "height": 50}, {
    "top": 19075,
    "bottom": 19142.75,
    "height": 50
}, {"top": 19175, "bottom": 19240.75, "height": 50}, {"top": 19274.5, "bottom": 19315.25, "height": 50}, {
    "top": 19325,
    "bottom": 19403.75,
    "height": 50
}, {"top": 19408.25, "bottom": 19472.500000000004, "height": 50}, {
    "top": 19492.75,
    "bottom": 19535.250000000004,
    "height": 50
}, {"top": 19540, "bottom": 19594.25, "height": 50}, {"top": 19596, "bottom": 19680, "height": 50}, {
    "top": 19684.5,
    "bottom": 19714.5,
    "height": 50
}, {"top": 19719.5, "bottom": 19770.999999999996, "height": 50}, {
    "top": 19818.25,
    "bottom": 19907,
    "height": 50
}, {"top": 19907.75, "bottom": 19987.249999999996, "height": 50}, {
    "top": 19988.25,
    "bottom": 20063,
    "height": 50
}, {"top": 20091.75, "bottom": 20154.25, "height": 50}, {
    "top": 20154.5,
    "bottom": 20245.999999999996,
    "height": 50
}, {"top": 20246, "bottom": 20322.5, "height": 50}, {
    "top": 20352.25,
    "bottom": 20376.75,
    "height": 50
}, {"top": 20376.5, "bottom": 20413.25, "height": 50}, {
    "top": 20417.75,
    "bottom": 20461.5,
    "height": 50
}, {"top": 20507.75, "bottom": 20611, "height": 50}, {"top": 20612.75, "bottom": 20665.75, "height": 50}, {
    "top": 20666,
    "bottom": 20736.75,
    "height": 50
}, {"top": 20763, "bottom": 20799.5, "height": 50}, {
    "top": 20803.25,
    "bottom": 20856.5,
    "height": 50
}, {"top": 20857.75, "bottom": 20893.249999999996, "height": 50}, {
    "top": 20955.5,
    "bottom": 21024.75,
    "height": 50
}, {"top": 21026, "bottom": 21053, "height": 50}, {"top": 21085, "bottom": 21158.25, "height": 50}, {
    "top": 21332.25,
    "bottom": 21430.499999999996,
    "height": 50
}, {"top": 21457.5, "bottom": 21485, "height": 50}, {"top": 21616, "bottom": 21641, "height": 50}, {
    "top": 21646.75,
    "bottom": 21709.25,
    "height": 50
}, {"top": 21787.25, "bottom": 21832.5, "height": 50}, {
    "top": 21865.5,
    "bottom": 21931,
    "height": 50
}, {"top": 21932.25, "bottom": 21958.25, "height": 50}, {
    "top": 22056,
    "bottom": 22077.75,
    "height": 50
}, {"top": 22127.75, "bottom": 22167.75, "height": 50}, {
    "top": 22169.5,
    "bottom": 22209.5,
    "height": 50
}, {"top": 22211, "bottom": 22237, "height": 50}, {"top": 22237.75, "bottom": 22265.5, "height": 50}, {
    "top": 22266.75,
    "bottom": 22345.5,
    "height": 50
}, {"top": 22359, "bottom": 22419.75, "height": 50}, {"top": 22420, "bottom": 22492.25, "height": 50}, {
    "top": 22694.75,
    "bottom": 22732.5,
    "height": 50
}, {"top": 22741.75, "bottom": 22814.749999999996, "height": 50}, {
    "top": 22867.25,
    "bottom": 22942.5,
    "height": 50
}, {"top": 22943.25, "bottom": 23015, "height": 50}, {"top": 23054, "bottom": 23095.5, "height": 50}, {
    "top": 23154,
    "bottom": 23231.75,
    "height": 50
}, {"top": 23266.75, "bottom": 23294.75, "height": 50}, {
    "top": 23339.5,
    "bottom": 23388.250000000004,
    "height": 50
}, {"top": 23392.75, "bottom": 23449.25, "height": 50}, {
    "top": 23450.5,
    "bottom": 23513.75,
    "height": 50
}, {"top": 23585, "bottom": 23596, "height": 50}, {
    "top": 23596,
    "bottom": 23619.750000000004,
    "height": 50
}, {"top": 23676, "bottom": 23755.499999999996, "height": 50}, {
    "top": 23761,
    "bottom": 23802,
    "height": 50
}, {"top": 23807.25, "bottom": 23835.25, "height": 50}, {
    "top": 23860.5,
    "bottom": 23924.499999999996,
    "height": 50
}, {"top": 23961, "bottom": 24020.25, "height": 50}, {"top": 24021, "bottom": 24084, "height": 50}, {
    "top": 24118.25,
    "bottom": 24184.5,
    "height": 50
}, {"top": 24309.5, "bottom": 24364.5, "height": 50}, {
    "top": 24499,
    "bottom": 24575.750000000004,
    "height": 50
}, {"top": 24654, "bottom": 24681.75, "height": 50}, {"top": 24809, "bottom": 24855, "height": 50}, {
    "top": 24922.25,
    "bottom": 24941,
    "height": 50
}, {"top": 24952.75, "bottom": 25017.25, "height": 50}, {
    "top": 25019,
    "bottom": 25059.5,
    "height": 50
}, {"top": 25059.25, "bottom": 25080, "height": 50}, {"top": 25127.25, "bottom": 25221, "height": 50}, {
    "top": 25222.25,
    "bottom": 25331.5,
    "height": 50
}, {"top": 25341.75, "bottom": 25428.25, "height": 50}, {"top": 25430, "bottom": 25505.75, "height": 50}, {
    "top": 25575,
    "bottom": 25597,
    "height": 50
}, {"top": 25749.5, "bottom": 25862.5, "height": 50}, {
    "top": 25894.5,
    "bottom": 25976.5,
    "height": 50
}, {"top": 25980.5, "bottom": 26011.5, "height": 50}, {
    "top": 26069.5,
    "bottom": 26156.75,
    "height": 50
}, {"top": 26498.25, "bottom": 26554.000000000004, "height": 50}, {
    "top": 26555,
    "bottom": 26592.5,
    "height": 50
}, {"top": 26593.5, "bottom": 26639.25, "height": 50}, {
    "top": 26641.75,
    "bottom": 26720.750000000004,
    "height": 50
}, {"top": 26722.250000000004, "bottom": 26757.000000000004, "height": 50}, {
    "top": 26800,
    "bottom": 26832.5,
    "height": 50
}, {"top": 26846.499999999996, "bottom": 26866.499999999996, "height": 50}, {
    "top": 26866.500000000004,
    "bottom": 26891.000000000004,
    "height": 50
}, {"top": 26920, "bottom": 26977, "height": 50}, {
    "top": 26977.499999999996,
    "bottom": 27063.75,
    "height": 50
}, {"top": 27064.749999999996, "bottom": 27105.75, "height": 50}, {
    "top": 27135.5,
    "bottom": 27162.5,
    "height": 50
}, {"top": 27172.750000000004, "bottom": 27195.250000000004, "height": 50}, {
    "top": 27208.749999999996,
    "bottom": 27299.249999999996,
    "height": 50
}, {"top": 27317.25, "bottom": 27381.5, "height": 50}, {"top": 27382.75, "bottom": 27449, "height": 50}, {
    "top": 27449,
    "bottom": 27510.000000000004,
    "height": 50
}, {"top": 27511.75, "bottom": 27553.250000000004, "height": 50}, {
    "top": 27554.000000000004,
    "bottom": 27618.75,
    "height": 50
}, {"top": 27644.5, "bottom": 27690.249999999996, "height": 50}, {
    "top": 27691.000000000004,
    "bottom": 27756.5,
    "height": 50
}, {"top": 27757.75, "bottom": 27827.499999999996, "height": 50}, {
    "top": 27829.000000000004,
    "bottom": 27894.750000000004,
    "height": 50
}, {"top": 28021.499999999996, "bottom": 28054.249999999996, "height": 50}, {
    "top": 28077,
    "bottom": 28099.75,
    "height": 50
}, {"top": 28116.000000000004, "bottom": 28140.250000000004, "height": 50}, {
    "top": 28150.5,
    "bottom": 28169,
    "height": 50
}, {"top": 28170.5, "bottom": 28194.5, "height": 50}, {
    "top": 28203.250000000004,
    "bottom": 28249.25,
    "height": 50
}, {"top": 28262.25, "bottom": 28298.25, "height": 50}, {
    "top": 28298.25,
    "bottom": 28352.750000000004,
    "height": 50
}, {"top": 28378.250000000004, "bottom": 28401.000000000004, "height": 50}, {
    "top": 28507.25,
    "bottom": 28547.249999999996,
    "height": 50
}, {"top": 28566.75, "bottom": 28619.75, "height": 50}, {
    "top": 28681.75,
    "bottom": 28717.75,
    "height": 50
}, {"top": 28751.75, "bottom": 28797.749999999996, "height": 50}, {
    "top": 28807.25,
    "bottom": 28853.249999999996,
    "height": 50
}, {"top": 28877.499999999996, "bottom": 28916.499999999996, "height": 50}, {
    "top": 28926.75,
    "bottom": 28952,
    "height": 50
}, {"top": 28980, "bottom": 29035.5, "height": 50}, {
    "top": 29117.25,
    "bottom": 29202.500000000004,
    "height": 50
}, {"top": 29243.25, "bottom": 29272.500000000004, "height": 50}, {
    "top": 29291.000000000004,
    "bottom": 29322.250000000004,
    "height": 50
}, {"top": 29324.5, "bottom": 29342.75, "height": 50}, {
    "top": 29356.75,
    "bottom": 29404.000000000004,
    "height": 50
}, {"top": 29438.75, "bottom": 29475, "height": 50}, {
    "top": 29570.999999999996,
    "bottom": 29603.749999999996,
    "height": 50
}, {"top": 29605, "bottom": 29681.5, "height": 50}, {
    "top": 29727,
    "bottom": 29758.499999999996,
    "height": 50
}, {"top": 29856, "bottom": 29932, "height": 50}, {"top": 30091.75, "bottom": 30135.75, "height": 50}, {
    "top": 30189,
    "bottom": 30227.499999999996,
    "height": 50
}, {"top": 30269.5, "bottom": 30296.499999999996, "height": 50}, {
    "top": 30309.500000000004,
    "bottom": 30363.750000000004,
    "height": 50
}, {"top": 30364.749999999996, "bottom": 30425.5, "height": 50}, {
    "top": 30427,
    "bottom": 30489.999999999996,
    "height": 50
}, {"top": 30510.000000000004, "bottom": 30577.000000000004, "height": 50}, {
    "top": 30577,
    "bottom": 30603.999999999996,
    "height": 50
}, {"top": 30604.5, "bottom": 30634.000000000004, "height": 50}, {
    "top": 30642.75,
    "bottom": 30668,
    "height": 50
}, {"top": 30672.250000000004, "bottom": 30714.750000000004, "height": 50}, {
    "top": 30715.249999999996,
    "bottom": 30772.499999999996,
    "height": 50
}, {"top": 31026, "bottom": 31068.25, "height": 50}, {"top": 31532.75, "bottom": 31612.25, "height": 50}, {
    "top": 31655,
    "bottom": 31720.25,
    "height": 50
}, {"top": 31805.5, "bottom": 31859.500000000004, "height": 50}, {
    "top": 31906,
    "bottom": 31944.75,
    "height": 50
}, {"top": 31951, "bottom": 31989.25, "height": 50}, {
    "top": 31990.249999999996,
    "bottom": 32054.749999999996,
    "height": 50
}, {"top": 32152.499999999996, "bottom": 32207, "height": 50}, {"top": 32238.25, "bottom": 32293.25, "height": 50}];

const result = disposerWithGroup(gr, test);

/*
 const result = disposer(stage.map((value, i) => ({
 value,
 height: 20
 })));
 */
// console.log(JSON.stringify(result));
console.log(result);

render(result);


function render(result: DisposerItem[]) {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    for (let i = 0; i < result.length; i++) {
        const item = result[i];
        ctx.moveTo(70, item.realPos);
        ctx.lineTo(100, item.pos);
        ctx.rect(20, item.realTop, 50, item.realHeight);
        ctx.rect(100, item.top, 50, item.height);
        ctx.fillText(item.power.toFixed(1), 120, item.pos);
    }
    ctx.stroke();
    debugger;
}



