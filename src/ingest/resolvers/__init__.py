from requests import Response

ANILIST_ENDPOINT = 'https://graphql.anilist.co'
MAL_HINT_ENDPOINT = 'https://myanimelist.net/search/prefix.json?type=anime&keyword='


def is_request_successful(response: Response) -> bool:
    return response.status_code[0] == 2
