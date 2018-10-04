OK_COLOR    = "\033[0;32m"
ERROR_COLOR = "\033[0;31m"
WARN_COLOR  = "\033[0;33m"
NO_COLOR    = "\033[m"

make all:
	@echo $(OK_COLOR)Building API...$(NO_COLOR)
	npm install

	@echo $(OK_COLOR)Building worker...$(NO_COLOR)
	pip install pipenv
	pipenv install
