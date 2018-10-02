import logging
import os

if not os.path.isdir('log'):
    os.mkdir('log')

# logging.config.fileConfig('logging.ini')

logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s %(name)-12s %(levelname)-8s %(message)s',
    datefmt='%y-%m-%d %H:%M',
    filename='log/worker/worker.log',
    filemode='a'
)

console = logging.StreamHandler()
console.setLevel(logging.INFO)

formatter = logging.Formatter('%(asctime)-12s: %(levelname)-8s %(message)s')

console.setFormatter(formatter)

logging.getLogger().addHandler(console)
