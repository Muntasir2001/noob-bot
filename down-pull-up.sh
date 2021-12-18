forever stopall

sleep 1

git pull

forever -o out.log -e err.log start ./src/bot.js