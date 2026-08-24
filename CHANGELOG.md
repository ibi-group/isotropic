# isotropic Changelog

All notable changes to `isotropic`, the meta-package that aggregates the whole library.

This package holds no implementation of its own. It re-exports every Isotropic package from `lib/`, and its version tracks the library as a whole. **Every entry below is a roll-up: the real detail lives in each individual package's changelog**, and this file links the version bumps together so you can see which releases belong to the same group.

## 0.17.0 - 2026-08-23

### Added

**Two new packages**, both at 0.1.0:

- **`isotropic-instance-of`** Similar to the `instanceof` operator but is also aware of mixins.
- **`isotropic-state-context`** A subclass of `isotropic-state` enabling convenient event distribution and data passing.

### Changed

A library-wide maintenance release. Most packages changed only their published metadata, some gained new functionality.

| Package | What to watch for |
| --- | --- |
| `isotropic-pubsub` | **Breaking.** A bulk `once` subscription is now one subscription that fires once in total, not one per event name. Also adds `until`, subscription `filterFunction`, event snapshots, and `distributors` / `subscribe` construction config |
| `isotropic-state` | **Breaking.** Constructor values are run through the full assignment pipeline: validated, transformed, compared, and published as change events. `autoBatchChanges` is replaced by `batchChangeMode`. Also adds batch handles, `equalityFunction`, `get`, `reset`, `set`, `stateConfig`, `validateInternalFunction`, and writable computed properties |
| `isotropic-initializable` | Adds `untilInitialized()`, plus `initializing` and `initializeFailed` getters |
| `isotropic-cluster` | Adds `active`, `shuttingDown`, and `shutDownCompleted` getters on `ClusterPrimary` |
| `isotropic-request` | Per-request `subscribe` configs accept a `filterFunction` |
| `eslint-plugin-isotropic` | Updated ESLint and rule configuration updates |
| `isotropic-backoff` | Inherits the updates from `Pubsub` |
| `isotropic-dev-dependencies` | Dependency bumps |

- Every bundled package updated to its current release.
- Recommends `node ^26.7.0` / `npm ^11.19.0`.
- `repository` now uses npm's preferred object form with explicit `type` and `url` properties rather than the `github:` shorthand. This is package metadata only.

## 0.16.0 - 2026-07-15

The largest release in the library's history: the removal of the Babel build across every package, seven new packages, and breaking changes in some of the existing ones.

### Breaking changes

**`bunyan-stream-isotropic` was deprecated and replaced with `isotropic-logger-pretty`**

**Every package now ships unminified ES module source** rather than a Babel build. Source moved from `js/` to `lib/` throughout, so published code has readable identifiers and accurate stack-trace line numbers.

| Package | What to watch for |
| --- | --- |
| `eslint-plugin-isotropic` | Four new rules and ESLint 10 |
| `isotropic-character-fold` | Some characters fold differently |
| `isotropic-cluster` | Dead workers now restart through a backoff and can give up |
| `isotropic-dev-dependencies` | Babel, Mocha, and `cross-env` removed |
| `isotropic-duration-to-string` | `moment-timezone` replaced by `Temporal`. Strict ISO 8601 parsing only |
| `isotropic-error` | `Details:` block is now JavaScript source rather than JSON. Instances are now real native errors |
| `isotropic-later` | `cancelled` renamed to `canceled`. Canceling a promise-form timer now rejects |
| `isotropic-logger` | Backend changed from Bunyan to pino. Log JSON shape changes, and `task()` gained a leading `childData` argument |
| `isotropic-logger-pretty` | Renamed from `bunyan-stream-isotropic`. Export is now a `Writable` constructor |
| `isotropic-make` | Empty `mixins` array normalized to `null` |
| `isotropic-mutex` | Rejections identified by `error.name` instead of message text |
| `isotropic-timeout` | Timeout error message and `details` changed |
| `isotropic-value-to-source` | String escaping fixed (previous output could be invalid JavaScript). `Date` now serializes to `Temporal.Instant` |

### Added

**Seven new packages**, all at 0.1.0:

- **`isotropic-backoff`** escalating retry delays described as an array of levels, with a defined give-up point.
- **`isotropic-cancel`** a reusable cancellation primitive with reasons, abort signals, and standardized errors.
- **`isotropic-lexer`** splits a string on a set of known substrings, synchronously or as a `TransformStream`.
- **`isotropic-request`** an HTTP client built on `fetch` with retries, throttling, timeouts, and format handling.
- **`isotropic-temporal-format`** formats and parses `Temporal` values with PostgreSQL-style template patterns.
- **`isotropic-throttle`** a sliding-window rate limiter for asynchronous operations.
- **`isotropic-timeout-cancel`** `isotropic-cancel` plus a built-in time limit; the shared machinery behind backoff, mutex, request, throttle, and timeout.

**A consistent cancellation contract across the library.** Cancelable operations now share the same `cancel({ reason, signal, silent })` shape, the same error names (`AbortError`, `CanceledError`, `DisposedError`, `TimeoutError`), and `AbortSignal` support throughout.

**`Symbol.dispose` support** in the packages that manage a resource or a pending operation: `backoff`, `cancel`, `later`, `mutex`, `throttle`, and the logger's task objects. They can now be scoped with `using` declarations.

**Named constructors.** `isotropic-make` gained an optional leading name argument, and the constructors throughout the library now use it, so they appear by name in stack traces, debugger output, and `Object.prototype.toString`.

#### Migration

Upgrade the whole library together. Several cross-package changes must land in step, notably `isotropic-pubsub` `~0.16.0` with `isotropic-state` `~0.2.0`, and `isotropic-logger` `~0.5.0` with `isotropic-logger-pretty` `~0.5.0`.

### Changed

- Package dependency ranges updated across the board. See the version table in the README.
- `description` rewritten and `keywords` expanded.
- Test suite migrated to `node --test`.
- The Babel toolchain and `cross-env` were removed.
- Recommends `node ^26.5.0` / `npm ^11.17.0`. Several packages now use the global `Temporal` and `Error.isError`, so they may not even load on older runtimes without a polyfill.

## 0.15.0 - 2025-06-18

### Changed

Dependency roll-up: `isotropic-cluster` `~0.5.0`, `isotropic-initializable` `~0.12.0`, `isotropic-later` `~0.14.0` (which dropped its `asap` dependency in favor of `queueMicrotask`), `isotropic-logger` `~0.4.0`, `isotropic-mutex` `~0.4.0`, `isotropic-timeout` `~0.14.0`, and the newly added `isotropic-state` `~0.1.0`.

### Added

**`isotropic-state`** joined the library at 0.1.0: observable state with validation, computed properties, reactive cross-object dependencies, and batched changes.

## 0.14.0 - 2025-04-10

### Breaking changes

Roll-up of two interface changes that must be adopted together:

- **`isotropic-pubsub` 0.15.0** renamed the `default` stage to `complete` and `defaultFunction` to `completeFunction`, changed `allowPublicUnsubscription` to default to `false`, and removed its extra named exports.
- **`isotropic-mixin-prototype-chain` 0.11.0** replaced its three named exports with a single default export object.

`isotropic-initializable`, `isotropic-property-chainer`, and `isotropic-cluster` were all updated to match.

### Changed

- Comprehensive READMEs were added across the library.
- `eslint` was pinned at `~9.8.0` in every package.

## 0.13.0 - 2024-07-30

### Breaking changes

**The whole library converted to ES modules.** `"type": "module"` was added to every package. CommonJS `require` no longer works anywhere.

Notable per-package changes in this release:

- **`isotropic-character-fold`** widened folding to all Unicode nonspacing marks, which changes sort and fold output for non-Latin scripts and propagates to `isotropic-natural-sort`, `isotropic-console`, and `isotropic-value-to-source`.
- **`isotropic-cluster`** renamed "master" to "primary" throughout, tracking the Node.js `cluster` module.
- **`isotropic-pubsub`** renamed the `_events` configuration property to `_pubsub`, renamed `defineEvent` to `defineDispatcher`, and changed `allowPublicPublish` to default to `false`.

### Changed

- Tooling moved to ESLint flat config.
- Coverage switched from `nyc` to `c8`.
- Recommends `node ^22.5.1` / `npm ^10.8.2`.

## 0.12.0 - 2021-02-22

### Changed

- The per-package development toolchains were consolidated into the new `isotropic-dev-dependencies` package, removing the Babel, ESLint, and nyc configuration blocks from every `package.json`.
- Recommends `node ^14.15.5` / `npm ^7.5.4`.

## 0.11.0 - 2020-07-27

### Added

`isotropic-console`, `isotropic-duration-to-string`, `isotropic-logger`, `isotropic-mutex`, and `bunyan-stream-isotropic` joined the library.

### Changed

- Every package gained a `files` allowlist so only `lib` is published.
- Recommends `node ^12.18.3` / `npm ^6.14.6`.

## 0.10.0 - 2019-05-10

### Changed

- `isotropic` keyword addition.
- Dependency bumps.

## 0.9.2 - 2019-05-08

### Changed

Dependency bumps only.

## 0.9.0 - 2019-05-08

### Changed

- Roll-up of the Babel 7.4 / Mocha 6 / nyc 14 / ESLint 5.16 refresh.
- Recommends `node ^10.15.3` / `npm ^6.4.1`.

## 0.8.0 - 2019-02-18

### Changed

- Roll-up of a dependency refresh.
- Recommends `node ^10.15.1` / `npm ^6.4.1`.

## 0.7.0 - 2018-11-25

### Changed

- The library migrated from Babel 6 to Babel 7.
- Coverage switched from `babel-istanbul` to `nyc`.
- The `nsp` security check was dropped and replaced with the built-in `npm audit`.
- Recommends `node ^10.13.0` / `npm ^6.4.1`.

## 0.6.0 - 2017-09-12

### Breaking changes

**The `babel-runtime` runtime dependency was removed from every package.** Babel's `transform-runtime` plugin was dropped in favor of targeting the running Node.js version directly, so the library no longer pulls a transpiler runtime into your dependency tree.

### Changed

- ESLint configuration moved from `eslint-config-isotropic` to the new `eslint-plugin-isotropic`.
- Recommends `node ^8.4.0` / `npm ^5.4.1`.

## 0.5.0 - 2017-02-05

### Changed

- Dependency roll-up.
- Recommends `node ^6.9.5` / `npm ^4.1.2`;.

## 0.4.0 - 2017-01-09

### Changed

- `isotropic-initializable` and `isotropic-mixin-prototype-chain` joined the library.
- `isotropic-property-chainer` gained mixin support.
- Recommends `node ^6.9.4` / `npm ^4.1.1`. 

## 0.3.0 - 2016-11-28

### Changed

- The deprecated `prepublish` script was replaced by `prepare` and `prepublishOnly` throughout, so installing an Isotropic package as a dependency no longer runs its test suite.
- Recommends `node ^6.9.1` / `npm ^4.0.2`.

## 0.2.0 - 2016-07-14

### Changed

- Dependency roll-up.
- `babel-runtime` bumped to `~6.9.1` across the library.

## 0.1.0 - 2016-05-02

Initial release.

- Aggregates the initial Isotropic packages and re-exports each of them from `lib/`, so the whole library can be explored from one install.
- Serves as the central location for documentation and discovery, and as a reference implementation showing how the packages integrate.
- Most projects should depend on the individual packages they need rather than on this one.
