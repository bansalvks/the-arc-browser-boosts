# Bitbucket Pipeline Status in Title Bar

This script is designed to enhance your experience while navigating through Bitbucket, specifically for users utilizing the Arc browser with the Boost feature. It dynamically updates the browser tab's title to reflect the current page context, including the status of Bitbucket pipelines and pertinent breadcrumb information. This functionality provides an at-a-glance update on the pipeline status without needing to switch tabs or refresh the page actively.

## Features

- **Dynamic Title Update:** The browser tab title is continuously updated to reflect the page's current context, including the pipeline status and breadcrumb navigation root.
- **Pipeline Status Emoji:** Depending on the pipeline's current status (Failed, In Progress, Successful), an appropriate emoji (❌, 🌀, ✅) is displayed at the beginning of the tab title for quick identification.
- **Breadcrumb Information:** Adds breadcrumb root information for better context about the current page location within Bitbucket.
- **Automatic Updates:** Utilizes a set interval to keep the tab title updated and also listens for DOM changes to ensure the title reflects the most current information.

## How It Works

1. **Detecting Bitbucket Pipeline Page:** The script first checks if the current page is a Bitbucket pipeline page using the URL.
2. **Fetching Status and Breadcrumbs:** It then retrieves the pipeline status and breadcrumb root information.
3. **Updating the Document Title:** Combines the pipeline status (as an emoji) and breadcrumb information, updating the tab title accordingly.
4. **Continuous Update:** A set interval and a DOM observer ensure the title remains accurate, even as the user navigates through Bitbucket or as pipeline statuses change.

## Setup

To use this script with the Arc browser's Boost feature:

1. Ensure you're using the Arc browser with Boost enabled.
2. Open the Boost editor and paste the provided script into a new Boost.
3. Save the Boost and navigate to a Bitbucket pipeline page to see it in action.

## Examples of Outcomes

- When on a pipeline page that is currently running: `🌀 Pipeline Name | Project Name`
- If on a pipeline page and the pipeline has failed: `❌ Pipeline Name | Project Name`
- When viewing a successfully completed pipeline: `✅ Pipeline Name | Project Name`
- On non-pipeline pages, the script will still update the title to include breadcrumb information: `Page Title | Breadcrumb Root`

## Limitations

- This script is specifically tailored for Bitbucket and may not work as expected on other websites or future versions of Bitbucket if significant changes are made to the DOM structure.
- The script requires the Arc browser with Boost feature enabled to run.
