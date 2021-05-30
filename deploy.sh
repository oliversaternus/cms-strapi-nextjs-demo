git add *
git stash
echo "stashed local changes"
git checkout master
git fetch
PM2_ALIAS_FE=${jq '.apps[0].name' frontend/pm2.json}
PM2_ALIAS_BE=${jq '.apps[0].name' backend/pm2.json}
UPSTREAM=${1:-'@{u}'}
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse "$UPSTREAM")
BASE=$(git merge-base @ "$UPSTREAM")

if [ $LOCAL = $REMOTE ]; then
    echo "Skipping build."
elif [ $LOCAL = $BASE ]; then
    echo "Pulling from remote"
    git pull
    echo "Pulling successfull"
	cd "/home/${git_repo}/frontend"
	echo "changed to frontend directory"
    npm install
    echo "installed dependencies"
    npm run build
    echo "project built"
    pm2 restart "$PM2_ALIAS_FE"
	cd "/home/${git_repo}/backend"
	echo "changed to backend directory"
	npm install
    echo "installed dependencies"
    pm2 restart "$PM2_ALIAS_BE"
else
    echo "Skipping build."
fi
echo "done"