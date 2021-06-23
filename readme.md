# healthapp-node

This is a backend API server in Node.js for an example, sorta non-trivial app
that can be used to test/debug/hack against your deployment automation and other
related tooling. Initially created for [krutten](https://github.com/krutten)'s
upcoming (at the time of this writing) [CF Summit 2021](https://www.cloudfoundry.org/events/summit/cfsummit2021/) talk(s). Certainly can be used for just about
anything else.

## What's it do?

This allows you - as just a single unauthenticated (public) user - to create
entries to track your blood pressure, heart rate (BPM) and water intake several
times per day. This is just the API that lets you do that; it needs a frontend
to let you interact with it (still in development at the time of this writing).

There's no concept of users here. It's just a demo app. It assumes there's only
one person that ever uses it.

## How do I run it?

You'll need a few things installed and configured, as well as some environment
variables come runtime:

+ PostgreSQL (developed on 13, might work with earlier versions but untested)
    + Note: Internally the app uses [prisma](http://prisma.io) for database
    connectivity, and in theory that could work for any database prisma supports
    but that hasn't been tested beyond just PostgreSQL. Deviate at your own risk
+ Node.js (**IMPORTANT: See notes on Node.js versions below**)
+ NPM (whatever version is appropriate to accompany your node.js version)

### About Node.js Versions

One of the goals for the aforementioned talk(s) was to deploy a non-trivial
(yet still demo-scale) app _across multiple Node.js versions, including legacy
versions_, because developers have apps all over the place and have to maintain
them, out of favor (or out of date) or not. We don't live in a perfect world.

This app was initially developed with Node.js 10.24.1, and in future commits I
plan to create branches for each Node.js version for at least 10, 12 and 14, as
well as possibly 16 if time permits.

**So, deploy your version of choice.**

### Environment Variables

The app uses [dotenv](https://github.com/motdotla/dotenv) to automatically load
a file, `.env`, in the app root at runtime. This file is NOT provided by this
repo for security reasons; an example file, `.env.sample`, is provided instead.
Just modify its contents to reflect your connection values.

The app only needs two environment variables to run:

+ `PORT`: The port you want to run the app on. Defaults to 3000.
+ `DATABASE_URL`: A DB connection string. See `.env.sample` for an example.

### Bootstrap Your Database

To get started, bootstrap your database with the [prisma cli](https://www.prisma.io/docs/reference/api-reference/command-reference#db-push). This doesn't use
migrations; instead it uses the already-generated schema file to apply the
schema straight-out based on its state the last time the developer checked it
in to git, which should be the result of _locally_ applied migrations. In other
words, every time the developer runs a migration, the app's schema is saved in
full, and the following command just sets the schema to whatever that is:

```
$ npx prisma db push
```

Subsequent updates, after the database already exists in production, can be
applied with `npx prisma db migrate deploy`

### Install Dependencies

Install the application's dependencies with NPM:

```
$ npm install
```

### Run the App

To run the app, assuming all the above went swimmingly, just run:

```
$ npm start
```

This command, specified in `package.json`, just delegates to `node index.js`, so
you could run that too if you prefer.

## API

> This API treats all incoming requests as `application/json` unless you specify
> a different `Content-Type` header (and if you do that it's likely to break).

There are 3 basic functions to this API:

+ List all blood pressure and water intake entries for the last 7 days;
+ Create or lookup blood pressure entries;
+ Create or lookup water intake entries.

### GET `/`

```
$ curl http://example.com/
{"bp":[{"id":"d0e1b043-b028-4551-b756-90ee3d1fdbe4","createdAt":"2021-06-23T08:21:01.410Z","updatedAt":"2021-06-23T08:21:01.410Z","diastolic":65,"systolic":37,"heartrate":11},{"id":"67a515ed-220e-41a3-b0df-0ad0938ca155","createdAt":"2021-06-23T08:20:58.620Z","updatedAt":"2021-06-23T08:20:58.620Z","diastolic":85,"systolic":10,"heartrate":20},{"id":"c411e051-025e-400d-85d2-e0aef5097430","createdAt":"2021-06-23T08:20:07.866Z","updatedAt":"2021-06-23T08:20:07.866Z","diastolic":87,"systolic":20,"heartrate":27}],"water_entries":[{"id":"1185ab0a-9d58-41ed-b780-9bafc6e11be6","createdAt":"2021-06-23T08:21:14.705Z","updatedAt":"2021-06-23T08:21:14.705Z","ml":517},{"id":"c334a7d4-b812-44c1-b8d2-20da8c65e49e","createdAt":"2021-06-23T08:21:12.675Z","updatedAt":"2021-06-23T08:21:12.675Z","ml":601},{"id":"4a5b4ec4-b48e-430e-9302-52a8afb9d128","createdAt":"2021-06-23T08:21:11.771Z","updatedAt":"2021-06-23T08:21:11.771Z","ml":862}]}%
```

#### Request

+ Body: none
+ Content-Type: if not provided will automatically assume `application/json`
+ Required headers: none
+ URL Parameters: none

#### Response

+ Content-Type: `application/json` (plain text)

### POST `/bp`

```
$ curl -X POST

+ `/` - just gives you all the water intake and blood pressure data from the
last 7 days
