interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description:
        "Pendindg:: Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, voluptatem.",
      status: "pending",
      createAt: Date.now(),
    },
    {
      description:
        "In Progress:: Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, voluptatem.",
      status: "in-progress",
      createAt: Date.now() - 100000,
    },
    {
      description:
        "Completed:: Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, voluptatem.",
      status: "finished",
      createAt: Date.now() - 10000,
    },
  ],
};
