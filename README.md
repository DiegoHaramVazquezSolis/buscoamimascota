# buscoamimascota
App de busco a mi mascota

## First release

### Git protocols

##### Branches

For convention we create a new branch to create our cool features, always create your branch based on the current release (at the moment we write this we are in the firstRelease).

##### I work hard, I can't clon from release

Sometimes you want to develop some cool feature probably based on other feature that is not on release yet (maybe because is under development or it's a pull request not merged with release yet) that happens sometimes, our general recomendation in this cases is create a new branch based on the branch of the parent of your feature, and make the pull request with the parent branch as base, this make the job easier for both, you and the person who make the review of your pull request in the future, this approach have the next advantages:

- No copy/paste from the parent branch (instead you can merge if the parent has changes because it's a pull request)
- The person who read the pull request see less changes (it's a pull request simplier)
- If the same person who read the parent branch pull request, read this pull request, he don't read the same code twice
- In our experience, you are going to have less merge conflicts and this conflicts are going to be simplier to solve

###### I need six branches to make my job

Sometimes is one branch, sometimes (also based on experience) may can be five or six branches, in this cases we recomend this structure: currentRelease -> coolFeature -> styleOfCoolFeature -> coolButtonOnStyle, ignore the names but consider the structure.

This structure force you to merge from bottom to top (the merge will be like: coolButtonOnStyle -> styleOfCoolFeature -> coolFeature -> currentRelease), this is something good, since you define the flow of the branches you are making sequentially work (you need some things from this branch, thats why you create a child) this why this approach generate less merge conflicts.
