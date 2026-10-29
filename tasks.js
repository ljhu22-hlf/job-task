// Task definitions. Items and answer keys are read at run time from each folder's answer_key.csv,
// so adding images = add rows to the CSV. Paths are relative to index.html.
// Scoring: 1 point per correct item.

window.TASKS = {

  // 1. Wildlife Classification (Nature, image classification, difficulty 2/5)
  wildlife: {
    title: "Wildlife Classification",
    instructions: "Researchers use motion-activated cameras to monitor wildlife populations in protected habitats. You will view camera-trap photographs. For each photograph, identify the animal species shown by selecting from the list.",
    dir: "wildlife/",
    csv: "answer_key.csv",
    species: [   // [value in answer_key.csv, label shown] -- only these 6 are offered and used
      ["baboon", "Baboon"], ["elephant", "Elephant"], ["hippopotamus", "Hippopotamus"],
      ["lionFemale", "Lion"], ["ostrich", "Ostrich"], ["porcupine", "Porcupine"]
    ],
    keep: ["baboon", "elephant", "hippopotamus", "lionFemale", "ostrich", "porcupine"],   // images of other species are skipped
    parse: r => ({ file: r.image_file, key: r.correct_answer })
  },

  // 2. Galaxy Disc Classification (Space, binary image classification, difficulty 2/5)
  galaxy: {
    title: "Galaxy Disc Classification",
    instructions: "Researchers use telescope images to study how galaxies form and change. Some galaxies have a visible disc (a flat, rotating structure that may show spiral arms or be seen edge-on). Others are smooth, rounded blobs without a disc. Study the examples below, then answer one question for each image: \"Is this galaxy a disc?\"",
    dir: "galaxy/",
    csv: "answer_key.csv",
    parse: r => ({ file: r.image_file, key: r.correct_answer === "Yes" }),
    // Examples on the instruction screen (separate from the scored items)
    examplesDir: "galaxy/examples/",
    examplesCsv: "example_key.csv",
    exampleLabel: r => r.correct_answer === "Yes" ? "A disc" : "Not a disc"
  },

  // 3. Plant Growth Mapper (Biology, point identification, difficulty 2/5)
  plant: {
    title: "Plant Growth Mapper",
    instructions: "Researchers are measuring how plants grow and develop. You will view plant images in which one target leaf is highlighted. For each image, click near the center of the highlighted leaf.",
    dir: "plant/",
    csv: "answer_key.csv",
    // correct if the click is within target_region_radius_px of (target_x, target_y), in image pixels
    parse: r => ({ file: r.image_file, key: { x: +r.target_x, y: +r.target_y, r: +r.target_region_radius_px, w: +r.image_width_px, h: +r.image_height_px } })
  },

  // 4. Penguin Counting Task (Nature, counting with numeric entry, difficulty 3/5)
  penguin: {
    title: "Penguin Counting",
    instructions: "Researchers use time-lapse cameras to monitor penguin colonies and study changes in population size, breeding activity, and behavior. You will view photographs of penguin colonies. For each photograph, enter the total number of penguins visible. Penguins that are partly hidden or far in the distance should still be counted when they are visible.",
    dir: "penguin/",
    csv: "answer_key.csv",
    // correct only if the typed number equals the expert total count (correct_answer)
    parse: r => ({ file: r.image_file, key: parseInt(r.correct_answer) })
  }
};
