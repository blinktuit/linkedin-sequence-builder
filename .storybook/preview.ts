import type { Preview } from "@storybook/react";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "hsl(36, 38%, 98%)" },
        { name: "dark", value: "hsl(222.2, 47.4%, 11.2%)" },
      ],
    },
  },
};

export default preview;
