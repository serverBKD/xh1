#!/bin/bash

if git diff-index --quiet HEAD --; then
    echo "No hay cambios para agregar."
    exit 0
fi

git log --pretty=format:"%h, %ar : %s"
git add .

# Solicita un mensaje de commit al usuario
fecha_actual=$(LC_TIME=es_ES.UTF-8 date +"%Y%b%d" | awk '{print toupper($0)}')
echo "Introduce la versión del commit:"
read commit_version
echo "Introduce el mensaje del commit:"
read commit_message
commit_message="$fecha_actual: $commit_version: $commit_message"
git commit -m "$commit_message"
#git push -ufv
git push main HEAD:master
echo "commit --MAIN-- correct"
sleep 1
clear
# git switch dev-0125
# git merge main
# git push -ufv
# echo "Repo remoto DEV actualizado."
# sleep 2
# git switch main
# clear
git log -1 --oneline
