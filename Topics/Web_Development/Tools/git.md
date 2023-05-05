# Git Basic

Initializing git (never do this in root directory)

     git init

Add remote origin (SSH key or http link)

    git remote add origin <link>

Git change remote url

    git remote set-url <remote-name> <remote-url>

- Git pull - $ git pull (Do this first after setting remote origin and then)
- Git status - $ git status
- Git add - $ git add <filename.filetype> / - $git add .
- Git comit -$ git commit -m "message..."
- Git push - $ git push heroku master/ $ git push origin master / $ git push -f origin master(for new projects only\* rewrie entire repo and not recommend)

# Git Checkout

- Git log - $ git log
- Git checkout
- Git revert branch - $ git revert --no-commit c318a..HEAD (revert the branch master to this git point!)

# Git Branch

- Listing all branch - $ git branch
-
- Adding a branch - $ git checkout -b <branch_name>
- Changing branch - $ git checkout <branch_name>
- Merging a branch - $ git merge <branch_name> // If you are trying to merge test branch into master branch
-                                              // Switch the branch back to master
-                                              // Inside the master branch - $git merge test
- Removing a branch - $ git branch -d <branch_name>

# Connect with heroku

- Login to heroku server - $ heroku login -i
- Create heroku app - $ heroku create
- Git remote - $ git remote -v
- Open heroku URL - $ heroku open
- Check heroku logs for error - $ heroku logs
- SSH to heroku - $ heroku run <command eg.ls, touch, mkdir,...etc.>

# Some random notes

- Sort mongodb (last one inserted .limit(1)) or you can adjust the limit to any number - db.collection.find().sort({"\_id" : -1}).limit(1)
- Descending order - put db.collection.find().sort({"\_id" : -1})her
