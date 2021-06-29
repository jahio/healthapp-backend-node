# healthapp-node

[API Documentation Is Here]('API.md')

This is a backend API server in Node.js for an example, sorta non-trivial app
that can be used to test/debug/hack against your deployment automation and other
related tooling. Initially created for [krutten](https://github.com/krutten)'s
upcoming (at the time of this writing) [CF Summit 2021](https://www.cloudfoundry.org/events/summit/cfsummit2021/) talk(s). Certainly can be used for just about
anything else.

[API Spec in API.md]('API.md')

## What's it do?

This allows you - as just a single unauthenticated (public) user - to create
entries to track your blood pressure, heart rate (BPM) and water intake several
times per day. This is just the API that lets you do that; it needs a frontend
to let you interact with it (still in development at the time of this writing).

There's no concept of users here. It's just a demo app. It assumes there's only
one person that ever uses it.

> **Note**: This is just the API. You need a front-end served somewhere to run
> this. (Or you can run `curl` or `httpie` commands against it, if you like)

## How do I run it?

You need the following prerequisites:

| Prerequsite | Version | Notes |
| ----------- | ------- | ----- |
| PostgreSQL  | 13      | This app needs the `pgrypto` extension already installed before you start. Haven't tested on any version lower than 13. |
| Node.js (with NPM) | 10      | See other branches for higher node versions |

You'll also need the following environment variables set for the shell that
will ultimately be responsible for invoking this process:

| Variable | Description | Example |
| -------- | ----------- | ------- |
| `DATABASE_URL` | A string in the form of `proto://user:pass@host:PORT/db-name?schema=public` | `postgresql://dev:dev@localhost:5432/healthapp-backend?schema=public` |
| `PORT` | The HTTP port you want your app running on. **Make this equal to Docker's `EXPOSE` value.** | `3000` |

> ProTip&trade;: Check out the [asdf](https://asdf-vm.com) tool and the
> [asdf-direnv](https://github.com/asdf-community/asdf-direnv) plugin, which
> will give you [direnv](https://direnv.net/): a _magical_ tool that lets you
> automatically load `.env` files right in your shell when you `cd` into that
> project's directory. Wicked handy.

### Quick Start

Assuming all of the above is in place, do this:

```
$ git clone <this repo> <wherever you want it>
...output...
$ cd <wherever you want it> && npm clean-install --production # omit if in dev
$ npx prisma db push
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "healthapp-backend", schema "public" at "localhost:5432"

The database is already in sync with the Prisma schema.

✔ Generated Prisma Client (2.24.1) to ./node_modules/@prisma/client in 95ms
$ npm start


> HealthApp@0.0.1 start /Users/jah/Projects/sw/health-app/backend-node
> node start.js

```

At this point you should be up and running. Either open your frontend, or a tool
like [paw](https://paw.cloud/client), and get hackin'.

## Developer Notes

If you installed just the _production_ version, it doesn't come with the libs
needed to work on things in dev mode. Reinstall with `node install` first.

### Environment Configuration Files

I **strongly** recommend using the following tools to make this a whole lot
smoother:

+ [asdf](https://asdf-vm.com), a package manager
+ [asdf-direnv](https://github.com/asdf-community/asdf-direnv), a plugin for said package manager
+ [direnv](https://direnv.net/), a wicked awesome look that lets you re-initialize your local shell environment _automatically_ when you `cd` somewhere.

If you go this route, next create two independent files that are **NOT** to be
checked in to source control:

+ `.env.development`
+ `.envrc`

Here's what you put into them:

```
# .env.development
DATABASE_URL="postgresql://dev:dev@localhost:5432/healthapp-backend?schema=public"
PORT=3000
COLORIZE_LOGS=true
NODE_ENV="development"
```

```
# .envrc
# This file is used by direnv; see .env.development for more info.
dotenv_if_exists .env.development
layout node
```

#### Setup Without direnv/asdf

If you want to set things up without using `direnv`, all you have to do is
export those specific environment variables to the app in advance.

### To regenerate the documentation

```
$ npm run doc
```

> **CAUTION**: This will delete any directory at the root of your project that
> may happen to be named `_doc` every time it's run.

This relies on you having lots of good documentation throughout your
comments, compatible with [apidoc](https://apidocjs.com/#getting-started),
_before_ you run that command.

### To Run a Self-Reloading Dev Server

```
$ npm run dev
```

Relies on [watchexec](https://github.com/watchexec/watchexec) being already
installed and available on your system in `$PATH`.

> **Issue**: Using watchexec in development, I ran into a bug with prisma (the
> database client/ORM for this app) that seems to have something to do with the
> Node.js process exiting _before_ it's fully killed all its child threads for
> some reason. Anyway, to get around that **this app needs to be able to create
> a UNIX socket in `/tmp`**.
