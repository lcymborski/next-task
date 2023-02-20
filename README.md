## Getting Started

First, install dependencies:
```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## FAQ

### How are you ensuring data consistency in your list (e.g. not show duplicates) when dealing with paginated content?

Data is stored in a normalized state structure. This implementation utilizes createEntityAdapter from Redux Toolkit which generates helper functions and prebuilt selectors (and combines it with RTK Query for data fetching). For every successful API call, a new set of items is merged into the existing state kept in memory.

### How would you ensure this list remains fast with many objects to be displayed?

By using some form of list virtualization (or a way to reduce the number of DOM elements). This application implements it in a simple manner by using IntersectionObserver API to keep track which elements are outside the viewport (and display them as empty placeholders only). For large lists a well-known library like [react-window](https://github.com/bvaughn/react-window) could be a better solution.

## Additional notes

Instead of doing the regular API requests (e.g. separate calls for Characters and Episodes) GraphQL API is used to save some requests, select the data that is needed and make the  transformations easier.

This app illustrates IntersectionObserver API usage to implement infinite scrolling without having to rely on scroll events. A sentinel element triggers the loading of additional elements once it comes into view and is being added again after the new elements have been attached to the list (and this detection happens early so usually there's no need for displaying a spinner but it can be tested by simulating slow connection).

