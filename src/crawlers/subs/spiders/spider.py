import asyncio
import logging
import scrapy
# No idea why we have to import this from src but not for
# the other imports in the same project... goddamn python
from src.crawlers.subs.downloader import download_archives


class SubsSpider(scrapy.Spider):
    """
    Spider for the russian subs website

    Important:
        cookies MUST be persisted for this to work
        the website doesn't redirect without a
        PHP session ID
    """
    name = "subs"
    logger = logging.getLogger(__name__)

    logging.basicConfig(
        level=logging.DEBUG,
        format='%(asctime)s %(name)-12s %(levelname)-8s %(message)s',
        datefmt='%y-%m-%d %H:%M',
        filename='log/spider-subs.com.ru.log',
        filemode='a'
    )

    # translation: href of all anchors whos href ends with 'dl'
    download_selector = 'a[href$="dl"]::attr(href)'
    download_prepend = 'http://subs.com.ru/'

    start_urls = [
        # incremental until 177 so far
        'http://subs.com.ru/list.php?c=enganime&d=1',
    ]

    def generate_download_link(self, link: str) -> str:
        return self.download_prepend + link

    def parse(self, response):
        """
        Parsing each individual page of the download section

        Each page contains maximum 30 files

        A request is made to download each archive in the page

        Notes:
            Fix this -> generalize the crawler to work both crawling backwards
            and as a cron job by checking against links that are
            already downloaded from previous crawls in the database

            while un-downloaded subs == 30; next page
            else; next page, if not un-downloaded subs; return
        """
        self.logger.info(f'Parsing {response.url}')

        local_links = response.css(self.download_selector).extract()

        download_links = [
            self.generate_download_link(link) for link in local_links
        ]

        session = response.headers.get('Set-Cookie')

        self.logger.info(f'Extracted {len(download_links)} links from {response.url}')

        download_archives(download_links, session)
