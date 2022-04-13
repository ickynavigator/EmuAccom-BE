const dorms = [
  {
    name: "Akdeniz",
    description: "Single room in Akdeniz Dorm",
    address: {
      addressLine: "Akdeniz Dormitory",
      city: "Famagusta",
      postalCode: "99450",
      country: "cyprus",
    },
    bedroomCount: 1,
    bedCount: 2,
    bathroomCount: 1,
    accomodateCount: 1,
    approved: true,
    availabilityCount: 20,
    pricePerSemester: 2000.0,
    pricePerNight: 25.0,
    pictures: [
      {
        url: "https://upload.wikimedia.org/wikipedia/en/9/95/Test_image.jpg?20071023120759",
        description: "Test Image",
      },
      {
        url: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80",
        description: "Test Image 2",
      },
    ],
    keywords: [{ tag: "dorm" }, { tag: "dorms" }],
  },
];

module.exports = { dorms };
