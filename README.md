# isotropic

[![npm version](https://img.shields.io/npm/v/isotropic.svg)](https://www.npmjs.com/package/isotropic)
[![License](https://img.shields.io/npm/l/isotropic.svg)](https://github.com/ibi-group/isotropic/blob/main/LICENSE)
![](https://img.shields.io/badge/tests-passing-brightgreen.svg)
![](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)

A collection of utilities for large JavaScript projects with a consistent API.

## Overview

Isotropic is a modular library of JavaScript utilities that work together to provide a cohesive development experience for complex applications. Rather than importing this package directly, you'll typically want to import only the specific isotropic packages your project needs.

This package serves as:
1. A central location for documentation and discovery of the entire isotropic ecosystem
2. A reference implementation demonstrating how the packages integrate
3. A convenient way to explore the capabilities of all isotropic packages

## Philosophy

The isotropic library follows several core principles:

### 1. Consistent API Design

All isotropic packages follow similar API patterns and naming conventions, making them predictable and easy to learn.

### 2. Functional Approach

Most utilities favor a functional programming approach, prioritizing immutability and composability.

### 3. Prototype-Based Object Model

Isotropic embraces JavaScript's prototype-based inheritance model rather than trying to force class-based paradigms onto it.

### 4. Event-Driven Architecture

Many components use a publish-subscribe pattern for extensibility and loose coupling.

### 5. Predictable Lifecycle Management

Objects that need initialization follow consistent patterns for setup and teardown.

## Core Packages

The isotropic ecosystem consists of numerous specialized packages. Here are some of the most commonly used:

### isotropic-make

A powerful factory function that creates constructor/factory functions with support for inheritance, mixins, and initialization.

**Key Features:**
- Works both as a constructor (with `new`) and factory function (without `new`)
- Clean prototype inheritance with explicit parent references
- Multiple inheritance through mixins
- Static properties and initialization
- Predictable inheritance patterns

**Example:**
```javascript
import _make from 'isotropic-make';

// Create a Person constructor
const _Person = _make('Person', {
    greet() {
        return `Hello, my name is ${this.name}`;
    },
    _init({
        age,
        name
    }) {
        this.age = age;
        this.name = name;

        return this;
    }
});

// Create an Employee that inherits from Person
const _Employee = _make('Employee', _Person, {
    work() {
        return `${this.name} is working on ${this.project}`;
    },
    _init({
        age,
        name,
        project
    }) {
        // Call parent initialization
        Reflect.apply(_Person.prototype._init, this, [{
            age,
            name
        }]);

        this.project = project;

        return this;
    }
});

// Use either as constructor or factory
const john = new _Employee({
    age: 30,
    name: 'John',
    project: 'Website'
});

const jane = _Employee({
    age: 28,
    name: 'Jane',
    project: 'API'
});
```

### isotropic-pubsub

A powerful and flexible event system implementing the publish-subscribe pattern with advanced lifecycle features.

**Key Features:**
- Complete event lifecycle with before, on, and after stages
- Event distribution through object hierarchies
- Prevention, stopping, or modification of events during their lifecycle
- Customizable dispatcher behavior for each event type
- Type-based message routing

**Example:**
```javascript
import _Pubsub from 'isotropic-pubsub';

// Create a pubsub instance
const pubsub = _Pubsub();

// Subscribe to different lifecycle stages
pubsub.before('save', event => {
    if (!event.data.isValid) {
        event.preventDefault(); // Prevents the default action
    }
});

pubsub.on('save', event => {
    console.log('Saving data:', event.data);
});

pubsub.after('save', event => {
    console.log('Save completed at:', Date.now());
});

// Publish an event
pubsub.publish('save', {
    data: { id: 123, name: 'Test' },
    isValid: true
});
```

### isotropic-initializable

An observable initialization lifecycle for JavaScript objects ensuring parent-to-child initialization sequence.

**Key Features:**
- Predictable parent-to-child initialization order
- Support for both synchronous and promise-based initialization
- Observable lifecycle events
- Selective initialization of specific classes in the hierarchy
- Built-in error propagation

**Example:**
```javascript
import _Initializable from 'isotropic-initializable';
import _make from 'isotropic-make';

// Base component with initialization
const _BaseComponent = _make('BaseComponent', _Initializable, {
    _initialize() {
        console.log('Base initializing...');
        this.baseReady = true;
        // Can return a Promise for async initialization
    }
});

// Derived component
const _EnhancedComponent = _make('EnhancedComponent', _BaseComponent, {
    _initialize() {
        console.log('Enhanced initializing...');
        // Safe to use this.baseReady here
        this.enhancedReady = true;
    }
});

// Create with delayed initialization
const component = _EnhancedComponent({
    initialize: false
});

// Start initialization when needed
component.initialize();
```

### isotropic-cluster

A reusable platform to manage Node.js process clusters with a clean API for primary/worker communication.

**Key Features:**
- Simple API for cluster management
- Reliable worker lifecycle
- Structured message passing between primary and workers
- Built-in round-robin worker selection
- Error handling and worker replacement
- Observable events for worker lifecycle

## All Packages

The isotropic ecosystem includes the following packages:

| Package | Description |
|--------|-------------|
| **eslint-plugin-isotropic** | Lint rules and configuration |
| **isotropic** | This package |
| **isotropic-backoff** | Escalating backoff strategies for retrying failed tasks |
| **isotropic-cancel** | Manage the cancellation of asynchronous operations |
| **isotropic-character-fold** | Replaces special characters with their basic counterparts |
| **isotropic-cluster** | Manages Node.js process clusters |
| **isotropic-console** | Configured instance of the Node.js console |
| **isotropic-create** | Creates objects with specific prototypes while maintaining constructor properties |
| **isotropic-dev-dependencies** | Shared toolkit |
| **isotropic-duration-to-string** | Converts duration values to human-readable strings |
| **isotropic-error** | Enables nested error objects with complete stack traces |
| **isotropic-for-in** | Object iteration utility similar to Array.forEach |
| **isotropic-initializable** | Observable initialization lifecycle for objects |
| **isotropic-later** | Consistent interface for asynchronous timers |
| **isotropic-lexer** | Split a string by a bunch of other strings |
| **isotropic-logger** | Singleton logger using Pino |
| **isotropic-logger-pretty** | Format logs for humans |
| **isotropic-make** | Factory function for creating constructors with inheritance and mixins |
| **isotropic-mixin** | Utility for creating mixins |
| **isotropic-mixin-prototype-chain** | Utilities for working with prototype chains in mixins |
| **isotropic-mutex** | Local-process advisory access locks |
| **isotropic-natural-sort** | Sorting function that handles strings in a natural way |
| **isotropic-property-chainer** | Establishes prototype chains among object properties |
| **isotropic-prototype-chain** | Utilities for working with prototype chains |
| **isotropic-pubsub** | Flexible publish-subscribe event system |
| **isotropic-request** | A convenient HTTP request function |
| **isotropic-state** | A utility to manage observable state changes |
| **isotropic-temporal-format** | Parse and render Temporal timestamp values |
| **isotropic-throttle** | Wait until the appropriate time to continue |
| **isotropic-timeout-cancel** | Manage the cancellation of asynchronous operations with time limits |
| **isotropic-timeout** | Implements timeouts for promises or callback functions |
| **isotropic-value-to-source** | Serializes data to formatted JavaScript code |

## Development Tools

The isotropic ecosystem includes development tools that ensure consistent code quality:

### eslint-plugin-isotropic

A set of ESLint rules and configurations designed specifically for isotropic projects:

- Enforces consistent code style
- Encourages proper module structure
- Promotes use of modern JavaScript features
- Provides natural sorting for variables and object keys
- Enforces underscore-prefixed module-level variables

### isotropic-dev-dependencies

A shared package of common development dependencies and configurations:

- Single source of truth for development dependencies
- Shared configurations for ESLint, c8, and other tools
- Automated setup of git hooks
- High code coverage standards (100% targets)

## Getting Started

Instead of installing the full isotropic package, we recommend installing only the specific packages you need:

```bash
npm install isotropic-make isotropic-pubsub
```

Then import and use them in your code:

```javascript
import _make from 'isotropic-make';
import _Pubsub from 'isotropic-pubsub';

// Your implementation here
```

## Design Decisions

### Underscore Prefix Convention

You may notice that isotropic modules use underscore prefixes for variables. This convention helps distinguish module-level (top-scope) variables from local variables and follows the "Approachable Encapsulation" philosophy described in the isotropic-make documentation.

### Functional Factory Pattern

The isotropic-make package uses a pattern that combines constructor functions with factory functions, providing the best of both worlds. This approach:

1. Eliminates issues with forgetting the `new` keyword
2. Provides clear inheritance patterns
3. Supports multiple inheritance through mixins
4. Offers flexible initialization

### Event Lifecycle

The event system in isotropic-pubsub provides before/on/after stages for each event, giving fine-grained control over the event lifecycle. This enables:

1. Validation before an event executes
2. Main processing during the event
3. Cleanup or notification after the event

## Contributing

Please refer to [CONTRIBUTING.md](https://github.com/ibi-group/isotropic/blob/main/CONTRIBUTING.md) for contribution guidelines.

## Issues

If you encounter any issues, please file them at https://github.com/ibi-group/isotropic/issues
