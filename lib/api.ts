import { gql, request } from 'graphql-request';

const BASE_URL = 'https://api.studio.thegraph.com/query/95050/funding-subgraph/version/latest';

export const fetchProjects = async () => {
  const query = gql`
    {
      campaigns(first: 2) {
        id
        fundraiser
        name
        description
        target
        progress
        deadline
        amountRaised
      }
    }
  `;
  return request(BASE_URL, query);
};

export const fetchProjectById = async (id: string) => {
  const query = gql`
    query ($id: String!) {
      campaign(id: $id) {
        amountRaised
        deadline
        description
        name
        progress
        target
        milestones {
          votes
          withdrawalRequested
          description
          completed
        }
        contributions {
          amount
          contributor
        }
        contributorsCount
        fundraiser
      }
    }
  `;
  return request(BASE_URL, query, { id });
};
