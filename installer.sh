ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install node
npm install -g http-server && npm install -g gulp
npm install
gulp
http-server target -p 8888 -a localhost -o