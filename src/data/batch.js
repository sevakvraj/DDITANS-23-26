/**
 * BATCH '26 PERSONAL NOTES & CAPTIONS
 * Use this file to add short notes and custom captions for each classmate.
 * Now includes a "replies" section for messages from other batchmates.
 */

export const batchDetails = {
  // Example for Roll 109
  109: {
    note: "The coding wizard of the batch. Always found with three tabs of Stack Overflow open and a coffee in hand.",
    caption: "Keep building the future!",
    branch: "BCA B",
    replies: [
      { text: "Stay blessed, Be happy", author: "Dev Shrivastava", date: "3/24/2026" },
      { text: "Best of luck for your MCA!", author: "Krushi Patel", date: "3/25/2026" }
    ]
  },
  // Example for Roll 110
  110: {
    note: "The soul of every party and the glue that holds our group together. Memories with you are the best.",
    caption: "Stay legend!",
    branch: "BCA B",
    replies: [
      { text: "Keep shining, Pinak!", author: "Vraj Shah", date: "4/02/2026" }
    ]
  },
  
  // Default values for others - replace these as you like!
  default: {
    note: "A core member of the Batch of '26. One of the legends who made this journey unforgettable.",
    caption: "Batch of Legends // 2026",
    branch: "BCA B",
    replies: []
  }
};
