import {
    describe,
    it
} from 'mocha';

import {
    mixinPrototypeChainFromInstanceObject,
    mixinPrototypeChainFromPrototypeObject,
    mixinPrototypeChainFromStaticObject
} from '../js/mixin-prototype-chain.js';

import Pubsub, {
    defaultSymbol as pubsubDefaultSymbol,
    Dispatcher as PubsubDispatcher,
    Event as PubsubEvent,
    Subscription as PubsubSubscription
} from '../js/pubsub.js';

import asap from '../js/asap.js';

import create from '../js/create.js';

import Error from '../js/error.js';

import {
    expect
} from 'chai';

import forIn from '../js/for-in.js';

import Initializable from '../js/initializable.js';

import later from '../js/later.js';

import line from '../js/line.js';

import loggerGlobal from '../js/logger-global.js';

import make from '../js/make.js';

import mixin from '../js/mixin.js';

import PropertyChainer from '../js/property-chainer.js';

import prototypeChain from '../js/prototype-chain.js';

import timeout from '../js/timeout.js';

import valueToSource from '../js/value-to-source.js';

describe('isotropic', () => {
    it('should export all isotropic APIs', () => {
        expect(asap).to.be.a('function');
        expect(create).to.be.a('function');
        expect(Error).to.be.a('function');
        expect(forIn).to.be.a('function');
        expect(Initializable).to.be.a('function');
        expect(later).to.be.a('function');
        expect(line).to.be.a('function');
        expect(__line).to.be.a('number');
        expect(__logger).to.be.an('object');
        expect(loggerGlobal).to.equal(__logger);
        expect(make).to.be.a('function');
        expect(mixin).to.be.a('function');
        expect(mixinPrototypeChainFromInstanceObject).to.be.a('generatorfunction');
        expect(mixinPrototypeChainFromPrototypeObject).to.be.a('generatorfunction');
        expect(mixinPrototypeChainFromStaticObject).to.be.a('generatorfunction');
        expect(PropertyChainer).to.be.a('function');
        expect(prototypeChain).to.be.a('generatorfunction');
        expect(Pubsub).to.be.a('function');
        expect(pubsubDefaultSymbol).to.be.a('symbol');
        expect(PubsubDispatcher).to.be.a('function');
        expect(PubsubEvent).to.be.a('function');
        expect(PubsubSubscription).to.be.a('function');
        expect(timeout).to.be.a('function');
        expect(valueToSource).to.be.a('function');
    });
});
