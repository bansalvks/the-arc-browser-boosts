const isBitbucketPipelinePage = () =>
  window.location.href.includes("/pipelines/") &&
  !window.location.href.includes("/page/");

// Constants
const updateInterval = 5000; // Interval to update title in milliseconds

// Utility function to get document's breadcrumb root if present
function getBreadcrumbRoot() {
  try {
    const breadcrumbText =
      document.querySelector(
        'nav[aria-label="Breadcrumbs"] > ol > li:first-child > a',
      )?.innerText ||
      document.querySelector(".aui-nav-breadcrumbs > li:first-child > a")
        ?.innerText ||
      "";

    const pipelineName = isBitbucketPipelinePage()
      ? document.querySelector('span[aria-label="Pull Request"]')?.parentElement
          ?.parentElement?.childNodes[1]?.innerText
      : "";

    let output = "";

    if (pipelineName) {
      output += ` - ${pipelineName}`;
    }
    if (breadcrumbText) {
      output += ` | ${breadcrumbText}`;
    }
    return output;
  } catch (error) {
    console.error("Error in getBreadcrumbRoot:", error);
    return "";
  }
}

// Utility to determine the pipeline status and return corresponding emoji
function getPipelineStatusEmoji() {
  try {
    const statusSelectors = {
      Failed: 'span[role="img"][aria-label="Failed"]',
      "In progress": 'span[role="img"][aria-label="In progress"]',
      Successful: 'span[role="img"][aria-label="Successful"]',
    };

    for (const status in statusSelectors) {
      if (document.querySelectorAll(statusSelectors[status]).length > 0) {
        switch (status) {
          case "Failed":
            return "❌";
          case "In progress":
            return "🌀";
          case "Successful":
            return "✅";
        }
      }
    }
    return ""; // Default return if none of the statuses are matched
  } catch (error) {
    console.error("Error in getPipelineStatusEmoji:", error);
    return "";
  }
}

// Main function to update document title based on current page context
function updateDocumentTitle() {
  try {
    const targetSelector = isBitbucketPipelinePage() ? "h3" : "h1";
    const targetNode = document.querySelector(targetSelector);
    const breadcrumbRoot = getBreadcrumbRoot().trim();

    if (targetNode) {
      const heading = targetNode.innerText.trim();
      const newTitle =
        `${getPipelineStatusEmoji()} ${heading} ${breadcrumbRoot}`.trim();
      const currentTitle = document.title;

      if (newTitle !== currentTitle) {
        document.title = newTitle;
        console.log("--- Title updated ---");
        console.log("currentTitle", currentTitle);
        console.log("newTitle", newTitle);
        console.log("document.title", document.title);
      }
    }
  } catch (error) {
    console.error("Error in updateDocumentTitle:", error);
  }
}

let timeoutId = null;
// Function to continuously update document title at specified intervals
function keepUpdatingTitle() {
  try {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(keepUpdatingTitle, updateInterval);
    updateDocumentTitle();
  } catch (error) {
    console.error("Error in keepUpdatingTitle:", error);
  }
}

// Initial call to start updating the title
keepUpdatingTitle();

// after page load
document.addEventListener("DOMContentLoaded", () => {
  // Subscribe to DOM change of <title/> tag and call updateDocumentTitle()
  const observer = new MutationObserver(() => {
    console.log("boost - DOM change detected. Updating document title...");
    keepUpdatingTitle();
  });
  const config = { childList: true, subtree: true };
  observer.observe(document.querySelector("title"), config);
});
