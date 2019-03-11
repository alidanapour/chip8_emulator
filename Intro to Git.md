Core concepts:

- a **commit** = a node (contain a snapshot of a repo and other meta data), each has a unique id 
- a **branch** = a pointer pointing to a commit. A branch is not a copy of a repo, just a pointer to a snapshot (i.e., saved state) of the repo. 
- **HEAD** = special pointer pointing to something (branch or commit) you `checkout`
     - **Detached HEAD**: when the HEAD points to a commit instead of a branch. Just checkout a branch to resolve Detached HEAD. 
        - Be careful to checkout a commit that no branch is pointing to and start adding commits from that commit cause unreachable commits will be garbage collected. 
- **local repo**: a copy of the repo on your local machine, only you made changes to your local repos
- **remote repo**: a copy of the repo on GitHub, changes to remote repo are not only made by you and but may be by other people as well.
    - remote repo can on other server beside GitHub, or another person machine, or even another folder on your own machine but use GitHub to keep it simple.
- The 2 trees `git` manages: 
    1. **Working Directory**: actual files in your repo, dynamically changes depending on what you checkout. Think of working directory as a sandbox, where you can try changes out before add them to your staging area (index) and then commit to history.
    2. **Index** (Staging Area): Proposed next commit snapshot 
    3. **History**: linked list of commits 

- Note: `.git` folder contains index and history, do not delete that folder!

- 3 Videos you should watch:
    - [Core Concepts](https://www.youtube.com/watch?v=uR6G2v_WsRA)
    - [Branching and Merging](https://www.youtube.com/watch?v=FyAAIHHClqI)
    - [Local vs. Remotes](https://www.youtube.com/watch?v=Gg4bLk8cGNo)

- [Tutorial](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)

- [References](https://git-scm.com/docs)

- [Cheatsheet](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet)

- [Git playground](http://git-school.github.io/visualizing-git/)

Common commands:

- `git status` = list of tracked files that have been changed, what changes are staged for commit, files that are not tracked
- `git add`= added changes or starting tracking new files to staging area 
    - `git add *`: add all changes/new files to staging area
- `git commit`= take a snapshot of the repo, must write good commit message
    - `git commit -m "added commit message"`
- `git checkout` = (1) move the HEAD pointer to a branch or a commit (checkout a commit -> Detached HEAD)or (2) `git checkout [file]`: discard changes made to a tracked file (careful!), use `git reset [file]` if you just want to unstage the changes 
    - `git checkout -b mybranch`: create create a branch called mybranch and make HEAD points to mybranch
- `git branch` = list all local branches
    - `git branch mybranch`: create a branch called mybranch 
- `git fetch` = get latest commits of remote branch since the last fetch, the working directory will not be updated until these remotes commits are merged into local branch
    - `git fetch --all`: fetch latest commits for all remote branches 
    - `git fetch remote_name/remote_branch`: fetch latest commit for a specific remote branch e.g., `git fetch origin/master` 
- `git merge` = apply fetched commits in remote repo to local repo
- `git pull` = `git fetch` + `git merge` : fetch latest remote commits and immediately merge them to the corresponding local branch
- `git rebase` = result in linear commit history BUT only rebase your commits and only those you have NOT push or your commits that you pushed but you're 100% sure that people will not build their commits from
- `git push` = apply local commits to remote repo
- `git remote` = list current remote names
- `git reset`:
    - `git reset [file]`: unstages the file, but preserve its contents 
    - `git reset --soft [commit]`: move the branch that HEAD points to a specific commit (while `git checkout` only changes where HEAD points to)
    - `git reset --mixed [commit]`: (default) undoes all commits after [commit], preserving changes locally
    - `git reset --hard [commit]`: discards all history and changes back to the specified commit
- `git revert`: undo public commits with revert and alter the existing commit history so `git revert` should be used to undo changes on a public branch, and `git reset` should be reserved for undoing changes on a private branch. 
- `git log --all --decorate --oneline --graph` = display log info nicely
