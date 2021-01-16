import React from "react";
import { render } from "@testing-library/react-native";

import { RepositoryListContainer } from "../../components/RepositoryList";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      // mock data
      const repositories = {
        pageInfo: {
          totalCount: 8,
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          }
        ]
      };

      const { debug: _debug, getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);

      const allStatsSubHeadings = getAllByTestId("statsSubHeading");
      const allStatsTexts = getAllByTestId("statsText");
      const allRepoFullnames = getAllByTestId("repoFullname");
      const allRepoDescriptions = getAllByTestId("repoDescription");
      const allRepoLanguages = getAllByTestId("repoLanguage");

      expect(allRepoFullnames.length).toBe(2);
      expect(allRepoDescriptions.length).toBe(2);
      expect(allRepoLanguages.length).toBe(2);

      expect(allStatsSubHeadings.length).toBe(8);
      expect(allStatsTexts.length).toBe(8);

      const expectedStatsValues = [
        {
          label: "Stars",
          value: "21.9k"
        },
        {
          value: "1.6k",
          label: "Forks"
        },
        {
          value: "3",
          label: "Reviews"
        },
        {
          value: "88",
          label: "Rating"
        },
        {
          value: "1.8k",
          label: "Stars"
        },
        {
          value: "69",
          label: "Forks"
        },
        {
          value: "3",
          label: "Reviews"
        },
        {
          value: "72",
          label: "Rating"
        }
      ];

      allRepoFullnames.forEach((element, index) => {
        expect(element).toHaveTextContent(repositories.edges[index].node.fullName);
      });

      allRepoDescriptions.forEach((element, index) => {
        expect(element).toHaveTextContent(repositories.edges[index].node.description);
      });

      allRepoLanguages.forEach((element, index) => {
        expect(element).toHaveTextContent(repositories.edges[index].node.language);
      });

      allStatsSubHeadings.forEach((element, index) => {
        expect(element).toHaveTextContent(expectedStatsValues[index].value);
      });
      
      allStatsTexts.forEach((element, index) => {
        expect(element).toHaveTextContent(expectedStatsValues[index].label);
      });
    });
  });
});