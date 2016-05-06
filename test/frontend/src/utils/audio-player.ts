import {FFT} from "sound-utils/FFT";
import {SoundLoader} from "sound-utils/SoundLoader";
import {Play} from "sound-utils/Play";

var audioContext = new AudioContext();

class GradiendGenerator {
    constructor(protected points:[number,number,number,number][]) {}

    generate(len:number) {
        const colorMap:number[] = [];
        let pointIndex = 0;
        for (var i = 0; i < len; i++) {
            const currPercent = i / (len - 1);
            if (currPercent > this.points[pointIndex + 1][0]) {
                pointIndex++;
            }
            const prevPoint = this.points[pointIndex];
            const nextPoint = this.points[pointIndex + 1];
            const pointPercent = (currPercent - prevPoint[0]) / (nextPoint[0] - prevPoint[0]);
            let red = Math.round(prevPoint[1] + pointPercent * (nextPoint[1] - prevPoint[1]));
            let green = Math.round(prevPoint[2] + pointPercent * (nextPoint[2] - prevPoint[2]));
            let blue = Math.round(prevPoint[3] + pointPercent * (nextPoint[3] - prevPoint[3]));
            let color = (red << 16) + (green << 8) + blue;
            colorMap.push(color);
        }
        return colorMap;
    }
}

const colorSize = 10000;
const gradient = new GradiendGenerator([
    [0, 0, 0, 0],
    [.15, 0, 0, 150],
    [.25, 150, 50, 255],
    [.5, 255, 100, 0],
    [.75, 255, 255, 0],
    [1, 255, 255, 255],
]).generate(colorSize);


export class AudioPlayer {
    currentTime:number = 0;
    duration:number = 0;
    player = new Play(audioContext);
    soundLoaded = false;

    spectrogramData:Uint8ClampedArray[];
    audioBuffer:AudioBuffer;

    loadSound(url:string) {
        return new SoundLoader(audioContext).fromUrl(url).then(audioBuffer => {
            this.audioBuffer = audioBuffer;
            this.duration = audioBuffer.duration;
            this.player.setAudio(audioBuffer);
            const sampleRate = 4000;

            const leftChannel = audioBuffer.getChannelData(0);
            const step = audioBuffer.sampleRate / sampleRate;
            const xLeftChannel = new Float32Array(leftChannel.length / step | 0);
            for (var i = 0; i < leftChannel.length; i++) {
                xLeftChannel[i / step | 0] += leftChannel[i] / step;
            }
            this.spectrogramData = this.process(xLeftChannel, 128);
            this.soundLoaded = true;

        });
    }

    applySpectrogramToCanvas(canvas:HTMLCanvasElement) {
        const data = this.spectrogramData;
        const ctx = canvas.getContext('2d');
        var timeLen = data.length;
        var valsLen = data[0].length;
        canvas.width = valsLen;
        canvas.height = timeLen;

        var imd = new ImageData(valsLen, timeLen);
        var imdd = imd.data;
        for (var i = 0; i < timeLen; i++) {
            var vals = data[i];
            for (var j = 0; j < valsLen; j++) {
                var val = Math.min(vals[j] * 700000 | 0, colorSize - 1); // max 300
                if (j == 0) {
                    val = 0;
                }
                var pos = (i * valsLen + valsLen - j) * 4;

                const color = gradient[val];
                imdd[pos] = color >> 16 & 0xFF;
                imdd[pos + 1] = color >> 8 & 0xFF;
                imdd[pos + 2] = color & 0xFF;
                imdd[pos + 3] = 255;
            }
        }
        ctx.putImageData(imd, 0, 0);
        return imd;
    }

    private process(signal:Float32Array, fftSize:number) {
        const data:Uint8ClampedArray[] = [];
        var fft = new FFT(fftSize, 0);
        for (var i = 0; i < signal.length - fftSize + 1; i += fftSize) {
            const bb = signal.subarray(i, i + fftSize);
            fft.forward(bb);
            data.push(fft.spectrum.slice());
        }
        console.log(data);

        return data;
    }
}
