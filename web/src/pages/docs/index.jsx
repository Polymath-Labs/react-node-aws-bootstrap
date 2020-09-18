import React from 'react';

export const Docs = () => {

    return (
        <div className="docs-page">
            <h3>Config</h3>
            <p>Configuration must be centralized so it's easier to maintain, for this reason all configuration vars and
                environment variables must be defined under <strong>constants/config.js</strong></p>

            <h3>Logger</h3>
            <p>Logger util helps managing log levels across environments, it can be found in <strong>utils/logger.js</strong> and it provides an interface for many log levels. Logger level can be configured for each instance. Logger levels must be declared in config file</p>

            <h3>Style</h3>
            <p>Style must be defined under assets/style based on functionality, directory tree must match with react components. Example <strong>pages/dashboard/users/index.jsx</strong> must match with <strong>styles/pages/dashboard/_users.scss</strong>. Index files are reserved to import sub styles so _style.scss on the root of <strong>assets/style</strong> imports only indexes of components/pages/mixins/etc. When you create a new style under components/, you import that style in components/_index.scss. It's forbidden to import styles outside of the scope. If one component have multiple nested components, it makes sense to have an index for that component as well.</p>
            <p>File: <strong>_base.scss</strong> is reserved for css reset / global styling</p>
            <p>File: <strong>_vars.scss</strong> is reserved for defining sass variables</p>

            <h4>Responsive mixins</h4>
            <p>Responsive styling is offered from three pre-defined breakpoints that are defined in _vars.scss</p>
            <p>Usage:</p>
            <pre>
{`.selector {
    display: block;

    @include mobile() {
        display: flex;
    }
}`}
            </pre>
            <p>Above code changes display to flex in mobile breakpoint.</p>

            <h3>Pages</h3>
            <p>Pages are bigger components that usually represents a dedicated route, pages can be defined under <strong>src/pages</strong>. Reason why pages are created with folders instead of direct file is to support nested pages. Example Users -> List || Create, directory structure for this example will be src/pages/users/index.jsx that will represent user list, src/pages/users/create/index.jsx that will represent user create page</p>

            <h3>Components</h3>
            <p>Components are smallest units, means an input, a button, in other words components must represent only one function, if a component is doing more than one thing, that's an anti-pattern and must be slitted in multiple components. Components can be defined under src/components/ directory and should follow same pattern as pages how components are defined.</p>
        </div>
    );
};
