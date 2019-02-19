#!/usr/bin/env bash

exists() {
    command -v "$1" >/dev/null 2>&1
}

error_redis="Could not find the command 'redis-cli' in path, the worker script requires caching of \
requests to function efficiently. Make sure you have redis set up properly (or you can just use docker)."

error_unar="Could not find the command 'unar' in path, for now the worker relies on being able \
to unpack rar files properly to be able to function. 'sudo apt install unar' will work for ubuntu \
machines (or you can just use docker)."

if ! exists "redis-cli"; then
    echo "$error_redis"
    exit 1
fi

if ! exists "unar"; then
    echo "$error_unar"
    exit 1
fi

