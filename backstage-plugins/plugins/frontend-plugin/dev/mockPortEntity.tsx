

export const mockEntity = {
    apiVersion: 'backstage.io/v1alpha1',
    kind: 'Component',
    metadata: {
        name: 'backstage',
        description: 'backstage.io',
        annotations: {
            'github.com/project-slug': 'backstage/backstage',
            'getport.io/Jira_Project': 'foo',
        },
    },
    spec: {
        lifecycle: 'production',
        type: 'website',
        owner: 'user:guest',
    },
};