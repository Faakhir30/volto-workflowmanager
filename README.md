# volto.workflowmanager (volto-workflowmanager)

A PoC Frontend add-on of Workflow Manager for Volto. For backend add-on see https://github.com/Faakhir30/plone.workflowmanager .
Built in 2 days, forgive me for not following plone best practices please :)
## Demo
[workflowmanager-initial-poc.webm](https://github.com/user-attachments/assets/dfe130ba-b111-466b-af33-fc2550fb1406)

A typical volto add-on structure

![image](https://github.com/user-attachments/assets/b65f1430-4e8c-469e-bf08-5a46ca853391)


## Features
This addon adds the following features to a Volto site
- adds a controlpanel item for workflow manager
- shows available custom workflows and Plone-shipped workflows
- adds the ability to create/initialize a new workflow
- ability to clone from a workflow
- A UI mockup for an individual workflow management page with some working features.
- the ability to do a `sanity check` for a workflow's correctness.
- An interactive and based workflow graph of the Finite State Machine of the workflow
- ability to look and search for a state or transition in the graph
- deletion of a workflow.

## Future Roadmap
**As this is mere PoC, I haven't followed best Plone practices**, so stopping this here, however the next steps in this PoC would have been the following:

### Features
- ability to add new states, clone states with transitions
- Create transitions and complete flow pending. Support guards, permissions...
- Complete flow of assigning a workflow to a content-type
- edit individual states and transitions in-depth features
- Update Security feature
- delete states and transitions
  
### UI
- Create transitions from the graph by connecting 2 states
- Maybe make UI easier by adding common actions as special options on right-clicking on a state and transition
- Reorder Graph logic

## Installation

The easiest installation would be installing this repo and doing `make install` followed by a `pnpm start`.
Otherwise, add this add-on to an existing Volto project to test using this repo from the git source URL.

**Note**: You must also install the [backend add-on](https://github.com/Faakhir30/plone.workflowmanager/) to make this work.

## Test installation

Visit http://localhost:3000/ in a browser, login, visit site-setup and check the awesome new features.


## Credits and Acknowledgements 🙏

Generated using [Cookieplone (0.9.5)](https://github.com/plone/cookieplone) and [cookieplone-templates (ac20da8)](https://github.com/plone/cookieplone-templates/commit/ac20da82a59d967b1c55d174f043f02d847febaa) on 2025-03-31 04:07:25.743519. A special thanks to all contributors and supporters!
