import BaseNode from './BaseNode.js';
import Action from './Action.js';
import Composite from './Composite.js';
import Decorator from './Decorator';
import Service from './Service.js';

import Succeeder from './actions/Succeeder.js';
import Failer from './actions/Failer.js';
import Runner from './actions/Runner.js';
import Error from './actions/Error.js';
import Wait from './actions/Wait.js';

import Selector from './composites/Selector.js';
import Sequence from './composites/Sequence.js';
import Parallel from './composites/Parallel.js';
import IfSelector from './composites/IfSelector.js';
import SwitchSelector from './composites/SwitchSelector.js';
import WeightSelector from './composites/WeightSelector.js';
import RandomSelector from './composites/RandomSelector.js';
import ShuffleSelector from './composites/ShuffleSelector.js';

import Bypass from './decorators/Bypass.js';
import ForceSuccess from './decorators/ForceSuccess.js';
import ForceFailure from './decorators/ForceFailure.js';
import Invert from './decorators/Invert.js';
import TimeLimit from './decorators/TimeLimit.js';
import Cooldown from './decorators/Cooldown.js';
import Repeat from './decorators/Repeat.js';
import RepeatUntilFailure from './decorators/RepeatUntilFailure.js';
import RepeatUntilSuccess from './decorators/RepeatUntilSuccess.js';
import Limiter from './decorators/Limiter.js';
import If from './decorators/If.js';
import ContinueIf from './decorators/ContinueIf.js';
import AbortIf from './decorators/AbortIf.js';

import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';

// Actions
ObjectFactory.register('successAction', function (config) {
    return new Succeeder(config);
});
ObjectFactory.register('failureAction', function (config) {
    return new Failer(config);
});
ObjectFactory.register('runningAction', function (config) {
    return new Runner(config);
});
ObjectFactory.register('errorAction', function (config) {
    return new Error(config);
});
ObjectFactory.register('wait', function (config) {
    return new Wait(config);
});

// Composites
ObjectFactory.register('selector', function (config) {
    return new Selector(config);
});
ObjectFactory.register('sequence', function (config) {
    return new Sequence(config);
});
ObjectFactory.register('parallel', function (config) {
    return new Parallel(config);
});
ObjectFactory.register('ifSelector', function (config) {
    return new IfSelector(config);
});
ObjectFactory.register('switchSelector', function (config) {
    return new SwitchSelector(config);
});
ObjectFactory.register('weightSelector', function (config) {
    return new WeightSelector(config);
});
ObjectFactory.register('randomSelector', function (config) {
    return new RandomSelector(config);
});
ObjectFactory.register('shuffleSelector', function (config) {
    return new ShuffleSelector(config);
});

// Decorators
ObjectFactory.register('bypass', function (config) {
    return new Bypass(config);
});
ObjectFactory.register('forceSuccess', function (config) {
    return new ForceSuccess(config);
});
ObjectFactory.register('forceFailure', function (config) {
    return new ForceFailure(config);
});
ObjectFactory.register('invert', function (config) {
    return new Invert(config);
});
ObjectFactory.register('timeLimit', function (config) {
    return new TimeLimit(config);
});
ObjectFactory.register('cooldown', function (config) {
    return new Cooldown(config);
});
ObjectFactory.register('repeat', function (config) {
    return new Repeat(config);
});
ObjectFactory.register('repeatUntilFailure', function (config) {
    return new RepeatUntilFailure(config);
});
ObjectFactory.register('repeatUntilSuccess', function (config) {
    return new RepeatUntilSuccess(config);
});
ObjectFactory.register('limiter', function (config) {
    return new Limiter(config);
});
ObjectFactory.register('if', function (config) {
    return new If(config);
});
ObjectFactory.register('continueIf', function (config) {
    return new ContinueIf(config);
});
ObjectFactory.register('abortIf', function (config) {
    return new AbortIf(config);
});


SetValue(window, 'RexPlugins.BehaviorTree.Action', Action);
SetValue(window, 'RexPlugins.BehaviorTree.Composite', Composite);
SetValue(window, 'RexPlugins.BehaviorTree.Decorator', Decorator);
SetValue(window, 'RexPlugins.BehaviorTree.Service', Service);

SetValue(window, 'RexPlugins.BehaviorTree.Succeeder', Succeeder);
SetValue(window, 'RexPlugins.BehaviorTree.Failer', Failer);
SetValue(window, 'RexPlugins.BehaviorTree.Runner', Runner);
SetValue(window, 'RexPlugins.BehaviorTree.Error', Error);
SetValue(window, 'RexPlugins.BehaviorTree.Wait', Wait);

SetValue(window, 'RexPlugins.BehaviorTree.Selector', Selector);
SetValue(window, 'RexPlugins.BehaviorTree.Sequence', Sequence);
SetValue(window, 'RexPlugins.BehaviorTree.Parallel', Parallel);
SetValue(window, 'RexPlugins.BehaviorTree.IfSelector', IfSelector);
SetValue(window, 'RexPlugins.BehaviorTree.SwitchSelector', SwitchSelector);
SetValue(window, 'RexPlugins.BehaviorTree.WeightSelector', WeightSelector);
SetValue(window, 'RexPlugins.BehaviorTree.RandomSelector', RandomSelector);
SetValue(window, 'RexPlugins.BehaviorTree.ShuffleSelector', ShuffleSelector);

SetValue(window, 'RexPlugins.BehaviorTree.Bypass', Bypass);
SetValue(window, 'RexPlugins.BehaviorTree.ForceSuccess', ForceSuccess);
SetValue(window, 'RexPlugins.BehaviorTree.ForceFailure', ForceFailure);
SetValue(window, 'RexPlugins.BehaviorTree.Invert', Invert);
SetValue(window, 'RexPlugins.BehaviorTree.TimeLimit', TimeLimit);
SetValue(window, 'RexPlugins.BehaviorTree.Cooldown', Cooldown);
SetValue(window, 'RexPlugins.BehaviorTree.Repeat', Repeat);
SetValue(window, 'RexPlugins.BehaviorTree.RepeatUntilFailure', RepeatUntilFailure);
SetValue(window, 'RexPlugins.BehaviorTree.RepeatUntilSuccess', RepeatUntilSuccess);
SetValue(window, 'RexPlugins.BehaviorTree.Limiter', Limiter);
SetValue(window, 'RexPlugins.BehaviorTree.If', If);
SetValue(window, 'RexPlugins.BehaviorTree.ContinueIf', ContinueIf);
SetValue(window, 'RexPlugins.BehaviorTree.AbortIf', AbortIf);

export {
    BaseNode,
    Composite,
    Decorator,
    Action,

    Succeeder,
    Failer,
    Runner,
    Error,
    Wait,

    Selector,
    Sequence,
    Parallel,
    IfSelector,
    SwitchSelector,
    WeightSelector,
    RandomSelector,
    ShuffleSelector,

    Bypass,
    ForceSuccess,
    ForceFailure,
    Invert,
    TimeLimit,
    Cooldown,
    Repeat,
    RepeatUntilFailure,
    RepeatUntilSuccess,
    Limiter,
    If,
    ContinueIf,
    AbortIf,
};