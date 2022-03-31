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
    availabilityCount: 20,
    pricePerSemester: 2000.0,
    pricePerNight: 25.0,
    pictures: [
      {
        url: "https://upload.wikimedia.org/wikipedia/en/9/95/Test_image.jpg?20071023120759",
        description: "Test Image",
      },
    ],
    keywords: [{ tag: "dorm" }, { tag: "dorms" }],
  },
];

module.exports = { dorms };
