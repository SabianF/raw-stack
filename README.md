# Raw Stack

This is one of my "sandbox" projects. It's a bare website application setup designed with cleanliness (Clean Architecture), modularity, and reviewability + refactorability in mind.

# Use cases

I'm still playing around with this, but I want to extend the functionality to work better for
* Static websites (marketing, etc)
* Dynamic websites
  * Server-side management (user management, integrations with services...)
  * Content management system (e.g. WordPress, Webflow...)
  * Analytics (website visitors, per-page activity metrics...)
* More stuff as I play around...

# Architecture

The basic folder structure is as follows:
```
- root/
  - src/
    - data/
      - models/
        - (models to convert data from external sources into validated entities to be used internally)
      - repositories/
        - (single place of catching errors/exceptions, handling caches, external data sources, dealing with "the outside world")
      - sources/
        - (interfaces/wrappers for external dependencies, cache storage solutions, APIs, etc)
    - domain/
      - entities/
        - (validatable, consistent objects to be used for all structured data within the app)
      - repositories/
        - (all app business logic)
      - usecases/
        - (high-level user-behaviour-focused functions e.g. "logIn", "logOut", "sendMessage", etc)
    - presentation/
      - components/
        - (HTML templates/fragments)
      - pages/
        - (Full pages or page sections)
      - states/
        - (Client-side state management)
  - modules/
    - EXAMPLE_MODULE/
      - src/
        - (has the same folder structure as `/root/src/`)
      - index.js
      - package.json
      - (any other config files)
  - index.js
  - package.json
  - (any other config files)
```

# Languages, technologies, and tools used
From front end to back end
* Pure CSS
* HTML
* HTMX
* JavaScript
* NodeJS
  * MustacheJS
  * Express
* *(TODO: PostgreSQL)*
