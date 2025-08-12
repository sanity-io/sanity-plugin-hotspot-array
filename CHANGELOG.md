<!-- markdownlint-disable --><!-- textlint-disable -->

# 📓 Changelog

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.0](https://github.com/sanity-io/sanity-plugin-hotspot-array/compare/v2.2.1...v3.0.0) (2025-08-12)

### ⚠ BREAKING CHANGES

- require sanity v4
- require node v20 or later

### Bug Fixes

- `@sanity/ui` should be a regular dependency ([ab33b35](https://github.com/sanity-io/sanity-plugin-hotspot-array/commit/ab33b3581f836951d353926d7f4c51a8f6337f3c))
- **deps:** update non-major deps ([88be932](https://github.com/sanity-io/sanity-plugin-hotspot-array/commit/88be9328b4d13c2ca502cdf1c1b369372d781727))
- require node v20 or later ([030b0df](https://github.com/sanity-io/sanity-plugin-hotspot-array/commit/030b0dfd33a8b218f8bd9e2bd108f2d8c233faed))
- require sanity v4 ([172ab01](https://github.com/sanity-io/sanity-plugin-hotspot-array/commit/172ab01b0c6be4caa955c86305d756d3778d35fa))
- styled-components isn't actually used directly ([803fdc2](https://github.com/sanity-io/sanity-plugin-hotspot-array/commit/803fdc2a8c067f94698b16e203209460f93e3558))

## [2.2.1](https://github.com/sanity-io/sanity-plugin-hotspot-array/compare/v2.2.0...v2.2.1) (2025-07-10)

### Bug Fixes

- **deps:** allow studio v4 in peer dep ranges ([#36](https://github.com/sanity-io/sanity-plugin-hotspot-array/issues/36)) ([a9e54ff](https://github.com/sanity-io/sanity-plugin-hotspot-array/commit/a9e54ff809cd8b6054098d681e35f534d09e190a))

## [2.2.0](https://github.com/sanity-io/sanity-plugin-hotspot-array/compare/v2.1.2...v2.2.0) (2025-03-07)

### Features

- add react 19 to peer deps ([646c253](https://github.com/sanity-io/sanity-plugin-hotspot-array/commit/646c25367c2fcdd4941dc82b89123a1bb1a6a2a8))

## [2.1.2](https://github.com/sanity-io/sanity-plugin-hotspot-array/compare/v2.1.1...v2.1.2) (2024-12-04)

### Bug Fixes

- reverse negated condition ([bb0d315](https://github.com/sanity-io/sanity-plugin-hotspot-array/commit/bb0d3153ebf2bf9a67e2b07808a0259a6cf332be))

## [2.1.1](https://github.com/sanity-io/sanity-plugin-hotspot-array/compare/v2.1.0...v2.1.1) (2024-11-19)

### Bug Fixes

- prevent tooltip from resetting tooltip position ([b9ec268](https://github.com/sanity-io/sanity-plugin-hotspot-array/commit/b9ec268363957ec60304fc9f1dcc99d194b55893))

## [2.1.0](https://github.com/sanity-io/sanity-plugin-hotspot-array/compare/v2.0.1...v2.1.0) (2024-10-15)

### Features

- support initial values ([d9cd56c](https://github.com/sanity-io/sanity-plugin-hotspot-array/commit/d9cd56c83f4cf36ae296bbc0a56aca9cb8478446))
- support initial values in image click ([b92c1f8](https://github.com/sanity-io/sanity-plugin-hotspot-array/commit/b92c1f892ec168da9c50af1f3df0540ce54a1080))

### Bug Fixes

- package lock weirdness ([da28862](https://github.com/sanity-io/sanity-plugin-hotspot-array/commit/da2886248b30bf9f30602606d9f938d93831d1a0))

## [2.0.1](https://github.com/sanity-io/sanity-plugin-hotspot-array/compare/v2.0.0...v2.0.1) (2024-10-09)

### Bug Fixes

- **deps:** upgrade `@sanity/asset-utils` to ^2 ([#29](https://github.com/sanity-io/sanity-plugin-hotspot-array/issues/29)) ([7c0c19d](https://github.com/sanity-io/sanity-plugin-hotspot-array/commit/7c0c19d5eba0ac54bb27721a6706a3b2fbe36630))

## [2.0.0](https://github.com/sanity-io/sanity-plugin-hotspot-array/compare/v1.0.1...v2.0.0) (2024-04-17)

### ⚠ BREAKING CHANGES

- @sanity/ui ^2 and styled-components ^6.1 are new peer deps

* New updated build process using our latest `@sanity/pkg-utils`
* Updated to use `@sanity/ui` v2
* Updated `@sanity/image-url` to v1.0.2 for compatibilty with newer `@sanity/client`s
* Upgraded `framer-motion` to v11
* Switched to `lodash-es`
* Updated dev deps for updated local dev (internal)

### Features

- v2; updated plugin with updated compatibilty ([#22](https://github.com/sanity-io/sanity-plugin-hotspot-array/issues/22)) ([0af19be](https://github.com/sanity-io/sanity-plugin-hotspot-array/commit/0af19bee25a61d0e6b5ca4005fc3ccca33cbc3ef))

## [1.0.1](https://github.com/sanity-io/sanity-plugin-hotspot-array/compare/v1.0.0...v1.0.1) (2022-11-25)

### Bug Fixes

- **deps:** sanity ^3.0.0 (works with rc.3) ([8fa35e3](https://github.com/sanity-io/sanity-plugin-hotspot-array/commit/8fa35e30633edd97a9e437a2cf130373b6ca3e61))

## [1.0.0](https://github.com/sanity-io/sanity-plugin-hotspot-array/compare/v0.0.8...v1.0.0) (2022-11-16)

### ⚠ BREAKING CHANGES

- this version does not work in Sanity Studio V2.
  It is built for sanity 3.0.0-rc.2 ->

### Features

- initial Sanity Studio V3 release ([4c6be44](https://github.com/sanity-io/sanity-plugin-hotspot-array/commit/4c6be44a9dd62d776d633ac493264bd6478109df))
- initial v3 version ([df513e8](https://github.com/sanity-io/sanity-plugin-hotspot-array/commit/df513e8597862226af5464b2411cc925c0a05744))

### Bug Fixes

- compiled for sanity 3.0.0-rc.0 ([3fd605f](https://github.com/sanity-io/sanity-plugin-hotspot-array/commit/3fd605f993de5631410ed7e25d55af39d9f36cca))
- **deps:** pkg-utils & @sanity/plugin-kit ([1f23928](https://github.com/sanity-io/sanity-plugin-hotspot-array/commit/1f239289bddaede28ad5098bdcfeb98fd87eeb76))

## [0.1.0-v3-studio.3](https://github.com/sanity-io/sanity-plugin-hotspot-array/compare/v0.1.0-v3-studio.2...v0.1.0-v3-studio.3) (2022-11-04)

### Bug Fixes

- **deps:** pkg-utils & @sanity/plugin-kit ([1f23928](https://github.com/sanity-io/sanity-plugin-hotspot-array/commit/1f239289bddaede28ad5098bdcfeb98fd87eeb76))

## [0.1.0-v3-studio.2](https://github.com/sanity-io/sanity-plugin-hotspot-array/compare/v0.1.0-v3-studio.1...v0.1.0-v3-studio.2) (2022-11-03)

### Bug Fixes

- compiled for sanity 3.0.0-rc.0 ([3fd605f](https://github.com/sanity-io/sanity-plugin-hotspot-array/commit/3fd605f993de5631410ed7e25d55af39d9f36cca))

## [0.1.0-v3-studio.1](https://github.com/sanity-io/sanity-plugin-hotspot-array/compare/v0.0.8...v0.1.0-v3-studio.1) (2022-10-31)

### Features

- initial v3 version ([df513e8](https://github.com/sanity-io/sanity-plugin-hotspot-array/commit/df513e8597862226af5464b2411cc925c0a05744))
