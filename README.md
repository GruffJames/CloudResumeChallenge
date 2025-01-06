# CloudResumeChallenge
https://cloudresumechallenge.dev/docs/the-challenge/aws/

### If anyone from Ivanti is reading, I've made some tweaks to my CI/CD architecture.

Basically everything now goes through GitHub actions.
That includes:
- planning and applying the terraform configs
- building the Node js website e.g. npm run build
- automatically updating the API ids when they change (e.g. I remove then re-add them)

So now everything (as far as I know...) is done on the push of a branch

(06/01/24) I've taken the restraunt pages down and put the usual site back up, but don't hesitate to contact me and I'll happily put it back.