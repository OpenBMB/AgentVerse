const GetValue = Phaser.Utils.Objects.GetValue;

class AwayTime {
    constructor(config) {
        this.state = IDLE;
        this.setKey(GetValue(config, 'key', 'away'));
        this.setPeriod(GetValue(config, 'period', 1000));
    }

    destroy() {
        this.stop();
    }

    get awayTime() {
        var prevTime = localStorage.getItem(this.key);
        this.start();
        if (prevTime == null) {
            return 0;
        }
        prevTime = parseInt(prevTime);
        var curTime = this.curTime;
        if ((prevTime < 0) || (prevTime > curTime)) {
            return 0;
        }
        // console.log(new Date(prevTime).toLocaleString());
        // console.log(new Date(curTime).toLocaleString());        
        return curTime - prevTime;
    }

    get curTime() {
        return new Date().getTime();
    }

    start() {
        this.stop();
        this.updateTime();
        this.timer = setInterval(this.updateTime.bind(this), this.period);
        this.state = UPDATING;
        return this;
    }

    stop() {
        if (this.state === IDLE) {
            return this;
        }
        clearTimeout(this.timer);
        this.timer = undefined;
        this.state = IDLE;
        return this;
    }

    updateTime() {
        localStorage.setItem(this.key, this.curTime);
        return this;
    }

    setKey(key) {
        this.key = key;
        return this;
    }

    setPeriod(time) {
        this.period = time;
        return this;
    }
}

const IDLE = 0;
const UPDATING = 1;

export default AwayTime;