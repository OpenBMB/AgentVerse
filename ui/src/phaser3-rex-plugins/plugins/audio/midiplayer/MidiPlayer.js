import midiParser from '../../utils/midi-parser/midi-parser.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;

class MidiPlayer {
    constructor(config) {
        this.resetFromJSON(config);
    }

    /**
     * Reset status by JSON object
     * @param {object} o JSON object
     * @returns {object} this object
     */
    resetFromJSON(o) {
        this.tracks = [];
        this.tickPeriod = 0;
        this.beatPeriod = 0;

        // -status-
        this.IsPlaying = false;
        this.playingTrackCnt = 0;
        return this;
    }

    /**
     * Return status in JSON object
     * @returns JSON object
     */
    toJSON() {
        return {

        };
    }

    destroy() {
        this.shutdown();
    }

    load(arrayBuffer) {
        var midi = midiParser.parse(new Uint8Array(arrayBuffer));
        if (!midi) {
            return this;
        }
        this.clear();

        this.setTickPeriod(midi);

        // load tracks
        this.tracks.length = 0;
        var tracks = midi.track;
        var i, cnt = tracks.length,
            t;
        for (var i = 0, len = tracks.length; i < len; i++) {
            t = new TrackKlass(this, i);
            t.Load(tracks[i]);
            this.tracks.push(t);
        }
    }

    clear() {};

    setTickPeriod(midi) {
        var timeDivision = midi.timeDivision;
        if (typeof (timeDivision) === "number") // Pulses per quarter note
            this.tickPeriod = this.beatPeriod / timeDivision;
        else // Frames per second
            this.tickPeriod = 1 / (timeDivision[0] * timeDivision[1]);
    };

    eachNote(callback, scope) {

    }

    play() {

    }

    stop() {

    }

    pause() {

    }

    resume() {
        
    }
}

export default MidiPlayer;