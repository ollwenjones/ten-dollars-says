This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# TDS App Exercise

- [Goals](#goals)
- [Process](#process)
- [Results](#results)

## Goals

1. Learn Decisions.
1. Interact with Decisions as an external user / UI -application
1. Take notes along the way of things that could improve
1. Create a fun Ten Dollars Says Bet UI.

## Process

Initially considered a green-field app a probable place to test-drive tech that could work it's
way back into the Decisions core UI. I investigated some component and state-management
libraries with this in mind, but decided against using both. The rationale was I can create
a bare-bones POC more quickly without the additional learning curve of learning those tools.

In the end I'm not sure it saved me time. A component library may establish a design system for
you, where I spent time sorting one out along the way and hand-rolling CSS and components for
things that may have come for free. Having a state management library such as Mobx would have
simplified the React component design process as it would have eliminated the need to
evaluate which parts of the application state belonged in which components.

## Results

1. A vanilla React application (no state or component libraries) interacting with Decisions login, flows,
   and reports via http API calls (What Decisions exposes could not be called "RESTful", strictly speaking).
1. Documentation explaining now to integrate with a Decisions back-end.
1. Feedback Document explaining where Decisions can improve in this regard.

## Possibilities

- Some of the one-off API tools here could be expanded into a library for supporting interacting with
  a Decisions back-end _in general_
- Could still use this as a test-bed for theme-able component libraries / tools to work back into
  the Decisions core UI.
