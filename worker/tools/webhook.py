from api.schema.anime import Anime

import os
import json
import requests


def send_discord_webhook(anime: Anime):
    """
    Sends a request to a discord webhook about the
    anime that got processed
    Args:
        anime: processed
    References:
        ENV VARIABLE: WEBHOOK_URL
    Notes:
        The anime must be populated at this point
        with the required information like character
        and episode

    """
    send_url = os.getenv('WEBHOOK_URL')

    if not send_url:
        return

    char_count = len(anime.characters)
    ep_count = len(anime.episodes)
    line_count = len(anime.dialogues)

    content = f'Processed {anime.raw_name} ' \
              f'with {char_count} characters, {ep_count} episodes ' \
              f'and {line_count} dialogues.'
    data = {
        'username': 'Weeb Search Worker',
        'content': content
    }

    header = {
        'Content-Type': 'application/json'
    }
    payload = json.dumps(data)

    response = requests.post(send_url, data=payload, headers=header)

    # print(response.json())
