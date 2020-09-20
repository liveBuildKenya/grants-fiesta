<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

# Common Commands
Install Nest CLI
npm install -g @nestjs/cli

## Generate a service

`nest g s folder/structure/ServiceName --dry-run`

### Options
--dry-run test the creation
--flat don't create a folder


### Schematics
app		Generate a new application within a monorepo (converting to monorepo if it's a standard structure).
library	lib	Generate a new library within a monorepo (converting to monorepo if it's a standard structure).
class	cl	Generate a new class.
controller	co	Generate a controller declaration.
decorator	d	Generate a custom decorator.
filter	f	Generate a filter declaration.
gateway	ga	Generate a gateway declaration.
guard	gu	Generate a guard declaration.
interface		Generate an interface.
interceptor	in	Generate an interceptor declaration.
middleware	mi	Generate a middleware declaration.
module	mo	Generate a module declaration.
pipe	pi	Generate a pipe declaration.
provider	pr	Generate a provider declaration.
resolver	r	Generate a resolver declaration.
service	s	Generate a service declaration.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


