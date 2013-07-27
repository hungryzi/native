#!/bin/bash

heroku maintenance:on

echo '==========> Start pushing to heroku/master'
git push heroku master
echo '==========> Finished pushing to heroku/master'

echo '==========> Migrating the database if necessary'
heroku run rake db:migrate

echo '==========> Restarting'
heroku restart

heroku maintenance:off

