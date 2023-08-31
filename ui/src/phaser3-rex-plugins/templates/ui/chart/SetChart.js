var SetChart = function (config) {
    if (!window.Chart) {
        var msg = `Can not find chartjs! Load chartjs in preload stage.
scene.load.script('chartjs', 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.8.0/Chart.min.js');`
        console.error(msg);
        return this;
    }

    if (this.chart) {
        this.chart.destroy();        
    }
    this.chart = new Chart(this.context, FillConfig(this, config));
    return this;
}

var FillConfig = function (canvas, config) {
    // Get options
    if (config === undefined) {
        config = {};
    }
    if (config.options === undefined) {
        config.options = {};
    }
    var options = config.options;

    // Fill options
    options.responsive = false;
    options.maintainAspectRatio = false;
    if (!options.hasOwnProperty('devicePixelRatio')) {
        options.devicePixelRatio = 1;
    }

    // Get animation config
    var noAnimation = false;
    if (options.animation === undefined) {
        options.animation = {};
    } else if (options.animation === false) {
        noAnimation = true;
        options.animation = {};
    }
    var animationConfig = options.animation;

    // Fill animation config
    if (noAnimation) {
        animationConfig.duration = 0;
    }

    var onProgress = animationConfig.onProgress;
    animationConfig.onProgress = function (animation) {
        if (onProgress) {
            onProgress(animation);
        }
        canvas.needRedraw();
    }

    var onComplete = animationConfig.onComplete;
    animationConfig.onComplete = function (animation) {
        if (onComplete) {
            onComplete(animation);
        }
        canvas.needRedraw();
    }
    return config;
}

export default SetChart;