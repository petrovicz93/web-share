try:
    import ujson
    import json
except ImportError:
    import json
import logging

logger = logging.getLogger(__name__)


if not ujson:
    ujson = json


def loads(data):
    return ujson.loads(data)


def dumps(data, default_parser=None):
    if default_parser:
        return json.dumps(data, default=default_parser)

    return ujson.dumps(data)


def parser(obj):

    if hasattr(obj, 'isoformat'):
        return obj.isoformat()
    else:
        msg = (
            'Object of type {} with value of {} is'
            ' not JSON serializable'
        ).format(type(obj), repr(obj))
        raise TypeError(msg)


def load(data):
    return ujson.load(data)

def dump(data, file):
    return ujson.dump(data, file, indent=4, sort_keys=True)