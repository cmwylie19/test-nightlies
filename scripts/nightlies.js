const { GitHubRelease, DefaultReleaseType } = require("release-please");

class NightlyReleaseType extends DefaultReleaseType {
  async buildReleaseNotes(commits, ...args) {
    const defaultNotes = await super.buildReleaseNotes(commits, ...args);
    const commitMessages = commits
      .map((commit) => `- ${commit.message}`)
      .join("\n");

    return `${defaultNotes}\n\n### Commits Since Last Release\n${commitMessages}`;
  }

  bumpVersion(version) {
    const date = new Date();
    const nightlyVersion = `${version}-${date.toISOString().replace(/[-:T]/g, "").slice(0, 12)}`;
    return nightlyVersion;
  }
}

// (async () => {
//   const release = new GitHubRelease({
//     repoUrl: "owner/repo", // Replace with your GitHub repo
//     releaseType: new NightlyReleaseType(),
//     packageName: "my-package", // Replace with your package name
//     token: process.env.GITHUB_TOKEN, // GitHub token for authentication
//   });

//   await release.run();
// })();
