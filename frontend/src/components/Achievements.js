import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Grid,
  GridItem,
  Container,
} from "@chakra-ui/react";
import axios from "axios";
import Badge from "./Badge";

const Achievements = () => {
  const [monthlyStatsWithBadges, setMonthlyStatsWithBadges] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const base_url = "https://api.github.com";
        const headers = {
          Authorization: `token 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`,
        };

        // Retrieve contribution data for the user
        const contribResponse = await axios.get(
          `${base_url}/users/Star-Viper/repos`,
          { headers }
        );

        if (contribResponse.status !== 200) {
          console.error(
            `Error: Unable to retrieve user data (status code: ${contribResponse.status})`
          );
          return;
        }

        const reposData = contribResponse.data;

        // Initialize dictionary to store contributions counts per month
        const monthlyContributionStats = await calculateMonthlyStats(reposData);

        // Determine badges for each month based on contribution counts
        const monthlyStatsWithBadges = determineBadges(
          monthlyContributionStats
        );

        setMonthlyStatsWithBadges(monthlyStatsWithBadges);
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once on mount

  const calculateMonthlyStats = async (reposData) => {
    const monthlyContributionStats = {};

    for (const repo of reposData) {
      const ownerName = repo.owner.login;

      // Retrieve contribution data for each repo
      const contribResponse = await axios.get(
        `https://api.github.com/repos/${ownerName}/${repo.name}/stats/contributors`
      );

      if (contribResponse.status !== 200) {
        continue;
      }

      const contribData = contribResponse.data;

      for (const contributor of contribData) {
        if (contributor.author.login === "Star-Viper") {
          for (const weekData of contributor.weeks) {
            const timestamp = new Date(weekData.w * 1000);
            const monthYear = `${timestamp.getFullYear()}-${(
              timestamp.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}`;

            if (!monthlyContributionStats[monthYear]) {
              monthlyContributionStats[monthYear] = {
                commits: 0,
                additions: 0,
                deletions: 0,
              };
            }

            monthlyContributionStats[monthYear].commits += weekData.c;
            monthlyContributionStats[monthYear].additions += weekData.a;
            monthlyContributionStats[monthYear].deletions += weekData.d;
          }
        }
      }
    }

    return monthlyContributionStats;
  };

  const determineBadges = (monthlyContributionStats) => {
    const monthlyStatsWithBadges = {};

    for (const month in monthlyContributionStats) {
      const stats = monthlyContributionStats[month];

      let commitBadge = "Bronze Committer";
      if (stats.commits >= 10) {
        commitBadge = "Silver Committer";
      }
      if (stats.commits >= 20) {
        commitBadge = "Gold Committer";
      }

      let additionBadge = "Bronze Contributor";
      if (stats.additions >= 100) {
        additionBadge = "Silver Contributor";
      }
      if (stats.additions >= 500) {
        additionBadge = "Gold Contributor";
      }

      let deletionBadge = "Bronze Cleaner";
      if (stats.deletions >= 500) {
        deletionBadge = "Silver Cleaner";
      }
      if (stats.deletions >= 250) {
        deletionBadge = "Gold Cleaner";
      }

      monthlyStatsWithBadges[month] = {
        commits: stats.commits,
        additions: stats.additions,
        deletions: stats.deletions,
        commitBadge,
        additionBadge,
        deletionBadge,
      };
    }

    return monthlyStatsWithBadges;
  };

  if (!monthlyStatsWithBadges) {
    return <div>Loading...</div>;
  }

  const getBadgeColorScheme = (badgeType) => {
    switch (badgeType) {
      case "Bronze":
        return "yellow";
      case "Silver":
        return "gray";
      case "Gold":
        return "orange";
      default:
        return "gray";
    }
  };

  return (
    <Container maxW="container.lg" color="white" p={8}>
      <Heading as="h1" mb={4}>
        GitHub Monthly Stats with Badges
      </Heading>

      <Grid templateColumns="repeat(3, 1fr)" gap={6} flexWrap="wrap">
        {Object.entries(monthlyStatsWithBadges).map(([month, stats]) => (
          <GridItem key={month} flexBasis="30%" minWidth="300px">
            <Box p={4} bg="gray.700" borderRadius="md" flexDirection="column">
              <Heading as="h2" size="md" mb={2}>
                {month}
              </Heading>
              <Flex flexDirection="column">
                <Box mb={2}>
                  <Text>Commits: {stats.commits}</Text>
                  <Badge
                    count={stats.commits}
                    colorScheme={getBadgeColorScheme(
                      stats.commitBadge.split(" ")[0]
                    )}
                  >
                    {stats.commitBadge}
                  </Badge>
                </Box>
                <Box mb={2}>
                  <Text>Additions: {stats.additions}</Text>
                  <Badge
                    count={stats.additions}
                    colorScheme={getBadgeColorScheme(
                      stats.additionBadge.split(" ")[0]
                    )}
                  >
                    {stats.additionBadge}
                  </Badge>
                </Box>
                <Box>
                  <Text>Deletions: {stats.deletions}</Text>
                  <Badge
                    count={stats.deletions}
                    colorScheme={getBadgeColorScheme(
                      stats.deletionBadge.split(" ")[0]
                    )}
                  >
                    {stats.deletionBadge}
                  </Badge>
                </Box>
              </Flex>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
};

export default Achievements;
