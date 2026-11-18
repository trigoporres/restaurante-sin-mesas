import type { Meta, StoryObj } from "@storybook/react-vite";
import { Obento } from "./Obento";

const meta = {
  title: "Recipientes/Obento",
  component: Obento,
  decorators: [
    (Story) => (
      <div style={{ width: "100vw", height: "100vh" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Obento>;

export default meta;

export const Vacio: StoryObj<typeof meta> = {};
