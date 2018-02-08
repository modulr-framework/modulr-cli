# Modulr CLI Tool

A node driven Modulr CLI helper tool.

**NOTE:** This is only set up to work in **static/static-repo** and **orion/static** repositories.

## Install

Install the CLI tool globally:

```bash
npm install -g git+ssh://git@repo.nyc.foxnews.com:7999/orion/modulr-cli.git
```

## Commands

**init** - Initialize a Modulr package. This will create a basic package.


```bash
# initialize in the current path
modulr init

# initialize in a specific path
modulr init /path/to/modulr/package/dir
```

**info** - Show details of directory, if it is a Modulr package

```bash
# current path
modulr info

# specific path
modulr info /path/to/modulr/package/dir
```

**define** - Defines a module. It will create a basic module file

```bash
# current path
modulr define

# specific file path
modulr define /path/to/modulr/package/dir/foo.js
```
