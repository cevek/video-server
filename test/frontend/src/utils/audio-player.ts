import {FFT} from "sound-utils/FFT";
import {SoundLoader} from "sound-utils/SoundLoader";
import {Play} from "sound-utils/Play";

var audioContext = new AudioContext();
export class AudioPlayer {
    currentTime:number = 0;
    duration:number = 0;
    player = new Play(audioContext);
    soundLoaded = false;

    spectrogramData:Uint8ClampedArray[];
    audioBuffer:AudioBuffer;

    loadSound(url: string) {
        return new SoundLoader(audioContext).fromUrl(url).then(audioBuffer => {
            this.audioBuffer = audioBuffer;
            this.duration = audioBuffer.duration;
            this.player.setAudio(audioBuffer);
            this.spectrogramData = this.process(audioBuffer, 128);
            // this.spectrogram.process(audioBuffer);
            this.soundLoaded = true;

        });
    }

    applySpectrogramToCanvas(canvas: HTMLCanvasElement) {
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
                var val = 255 - vals[j] * 5;
                var pos = (i * valsLen + valsLen - j) * 4;
                imdd[pos + 0] = val;
                imdd[pos + 1] = val;
                imdd[pos + 2] = val;
                imdd[pos + 3] = 255;
            }
        }
        ctx.putImageData(imd, 0, 0);
        return imd;
    }

    private process(audioBuffer:AudioBuffer, fftSize:number) {
        const data:Uint8ClampedArray[] = [];
        const koef = 30;
        var bufferSize = fftSize;
        var bufferDataSize = fftSize * koef;
        var fft = new FFT(bufferSize, 0);
        var signal:Float32Array = audioBuffer.getChannelData(0);
        var bufferSignal = new Float32Array(bufferSize);
        var k = 0;
        while (signal.length > k + bufferDataSize) {
            const bb = signal.subarray(k, k + bufferDataSize);
            const kk = new Float32Array(bufferSize);
            for (var i = 0; i < bb.length; i += koef) {
                kk[i / koef | 0] = bb[i];
            }
            bufferSignal.set(kk);
            k += bufferDataSize;
            fft.forward(bufferSignal);
            var spectrum = fft.spectrum;
            var arr = new Uint8ClampedArray(spectrum.length);
            for (var j = 0; j < spectrum.length; j++) {
                // equalize, attenuates low freqs and boosts highs
                //arr[j] = spectrum[j] * -1 * Math.log((bufferSize / 2 - j) * (0.5 / bufferSize / 2)) * bufferSize | 0;
                arr[j] = spectrum[j] * 5000;
            }
            data.push(arr);
        }
        return data;
    }
}
