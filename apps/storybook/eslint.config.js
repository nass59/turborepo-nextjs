// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { config } from "@workspace/eslint-config/react-internal";

export default [...config, ...storybook.configs["flat/recommended"]];
