## Configuration
| Variable                | Description                      |
|---------------------------|----------------------------------|
| PROJECT_NAME     | Name of project, used for creating resources not to have conflicts with other global/regional aws resources. Some resources requires unique name |
| STAGE            | Deployment stage, by default fallback to dev if not provided, usually it's used as postfix on resources name          |
| AWS_SECRET_NAME  | Secrets Manager name, it's mandatory and must be configured manually, see Secrets Manager below           |
| REGION           | AWS Region where resources should be created on      |

## Secrets Manager

It's required to have following properties already configured in secrets manager before trying to deploy.

| Secret Key                | Description                      |
|---------------------------|----------------------------------|
| SourceRepoOwner           | Github repository owner username |
| SourceRepoName            | Github repository name           |
| SourceRepoBranch          | Repository branch to deploy      |
| GitHubPersonalAccessToken | ********                         |
| DocumentDBUsername        | ********                         |
| DocumentDBPassword        | ********                         |

Creating github personal token documentation can be found [here](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)
