from functools import reduce


def find_elem(iterable, func):
    for item in iterable:
        if func(item):
            return item

    return None


def flatten(iterable):
    return reduce(list.__add__, iterable, [])


def flatmap(func, iterable):
    out = map(func, iterable)
    return flatten(out)
