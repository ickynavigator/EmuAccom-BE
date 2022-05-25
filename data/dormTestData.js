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
  {
    name: "Alfam",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    address: {
      addressLine: "Alfam Dormitory",
      city: "Famagusta",
      postalCode: "99451",
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
        url: "https://tr.alfamcyprus.com/thumbnail.php?file=images/odalar/oda1.jpg",
        description: "Test Image 2",
      },
    ],
    keywords: [{ tag: "dorm" }, { tag: "dorms" }],
  },

  {
    name: "Pop Art",
    description:
      "ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo",
    address: {
      addressLine: "Pop Art Dorms",
      city: "Famagusta",
      postalCode: "99452",
      country: "cyprus",
    },
    bedroomCount: 1,
    bedCount: 1,
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
        url: "http://popartdorms.com/en/img/rooms/single-suit-room.jpg",
        description: "Test Image 2",
      },
    ],
    keywords: [{ tag: "dorm" }, { tag: "dorms" }],
  },

  {
    name: "Grand Aras",
    description:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem",
    address: {
      addressLine: "Grand Aras Dormitory",
      city: "Famagusta",
      postalCode: "99453",
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
        url: "http://arasdorm.com/assets/img/gallery/1.jpg",
        description: "Test Image 2",
      },
    ],
    keywords: [{ tag: "dorm" }, { tag: "dorms" }],
  },

  {
    name: "Novel Centre Point",
    description:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.",
    address: {
      addressLine: "Novel Centre Point Dormitory",
      city: "Famagusta",
      postalCode: "99454",
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
        url: "https://dormitories.emu.edu.tr/PhotoGalleries/dormitories/2017/novel/Double%20standart%201.jpg?RenditionID=7",
        description: "Test Image 2",
      },
    ],
    keywords: [{ tag: "dorm" }, { tag: "dorms" }],
  },

  {
    name: "Nural",
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
    address: {
      addressLine: "Nural deniz Dormitory",
      city: "Famagusta",
      postalCode: "99455",
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
        url: "https://www.nuraldorms.com/wp-content/uploads/2022/02/Single-Oda-Nural-Dorm-Magusa-Ogrenci-Yurdu-1000x1000.jpg",
        description: "Test Image 2",
      },
    ],
    keywords: [{ tag: "dorm" }, { tag: "dorms" }],
  },

  {
    name: "Golden Plus",
    description:
      "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus",
    address: {
      addressLine: "Golden Plus Dormitory",
      city: "Famagusta",
      postalCode: "99456",
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
        url: "https://www.goldenplusdorm.com/upload/odalar/tek_kiilik/single_room.jpg",
        description: "Test Image 2",
      },
    ],
    keywords: [{ tag: "dorm" }, { tag: "dorms" }],
  },

  {
    name: "Inn",
    description:
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    address: {
      addressLine: "Inn Dormitory",
      city: "Famagusta",
      postalCode: "99457",
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
        url: "https://inndormcyprus.com/galeri/magusa-ogrenci-yurtlari-photo-gallery%20(8).jpg",
        description: "Test Image 2",
      },
    ],
    keywords: [{ tag: "dorm" }, { tag: "dorms" }],
  },
  {
    name: "Astra Plus",
    description:
      "n elementum congue eros. Morbi ac risus et neque maximus lacinia cursus ut nunc. Ut at dolor nec dui vehicula viverra sit amet sit amet sem.",
    address: {
      addressLine: "Astra Plus Dormitory",
      city: "Famagusta",
      postalCode: "99458",
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
        url: "https://astraplusdorm.com/img/room/single.jpg",
        description: "Test Image 2",
      },
    ],
    keywords: [{ tag: "dorm" }, { tag: "dorms" }],
  },
  {
    name: "EMU",
    description:
      "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas in venenatis erat. Duis risus quam, vestibulum sit amet felis nec, semper posuere nibh.",
    address: {
      addressLine: "EMU Dormitory",
      city: "Famagusta",
      postalCode: "99459",
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
        url: "http://inndormcyprus.com/galeri/magusa-ogrenci-yurtlari-photo-gallery%20(3).jpg",
        description: "Test Image 2",
      },
    ],
    keywords: [{ tag: "dorm" }, { tag: "dorms" }],
  },
  {
    name: "City",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis porta lectus at lobortis",
    address: {
      addressLine: "City Dormitory",
      city: "Famagusta",
      postalCode: "99460",
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
        url: "https://city-dorm.com/wp-content/uploads/2018/12/B2_3088-Edit-750x330.jpg",
        description: "Test Image 2",
      },
    ],
    keywords: [{ tag: "dorm" }, { tag: "dorms" }],
  },
  {
    name: "Prime Living",
    description:
      "Aliquam ut tellus ut tortor cursus varius. Aenean sagittis varius ante, ac faucibus lacus auctor sed",
    address: {
      addressLine: "Prime Living Dormitory",
      city: "Famagusta",
      postalCode: "99461",
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
        url: "https://city-dorm.com/wp-content/uploads/2018/12/B2_3088-Edit-750x330.jpg",
        description: "Test Image 2",
      },
    ],
    keywords: [{ tag: "dorm" }, { tag: "dorms" }],
  },
  {
    name: "Dormita",
    description:
      "Nunc porta tincidunt lorem id suscipit. Aenean scelerisque rutrum erat eu ultrices. Donec bibendum lobortis dignissim",
    address: {
      addressLine: "Dormita Dormitory",
      city: "Famagusta",
      postalCode: "99462",
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
        url: "https://dormitaogrenciyurdu.com/assets/images/rooms/girne-standart-plus/yatak-odasi.jpg",
        description: "Test Image 2",
      },
    ],
    keywords: [{ tag: "dorm" }, { tag: "dorms" }],
  },
  {
    name: "Ada",
    description:
      " Sed elementum turpis eget iaculis tempus. Nam sit amet lobortis ex. Integer pellentesque augue et posuere lobortis. Vivamus a eros sit amet neque congue hendrerit.",
    address: {
      addressLine: "Ada Dormitory",
      city: "Famagusta",
      postalCode: "99463",
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
        url: "http://adadorm.com/en/thumbnail.php?file=assets/pics/yy1.jpg&pwidth=800&pheight=450",
        description: "Test Image 2",
      },
    ],
    keywords: [{ tag: "dorm" }, { tag: "dorms" }],
  },
  {
    name: "Zaim",
    description:
      "Sed rutrum ut sem vel eleifend. Donec ut felis suscipit, fermentum metus at, feugiat sem. Vivamus interdum lobortis magna, in efficitur nisl.",
    address: {
      addressLine: "Zaim Dormitory",
      city: "Famagusta",
      postalCode: "99464",
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
        url: "http://www.zaimogrenciyurdu.com/media/k2/galleries/3/a11.jpg",
        description: "Test Image 2",
      },
    ],
    keywords: [{ tag: "dorm" }, { tag: "dorms" }],
  },
  {
    name: "Elysium",
    description:
      "Vestibulum fermentum sagittis ultricies. Pellentesque ultricies sed nisl sed cursus. Nunc id quam fermentum, aliquet nisi quis, tincidunt quam.",
    address: {
      addressLine: "Elysium Dormitory",
      city: "Famagusta",
      postalCode: "99465",
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
        url: "http://yurtlar.gau.edu.tr/images/gallery/gau_yurt-49.jpg",
        description: "Test Image 2",
      },
    ],
    keywords: [{ tag: "dorm" }, { tag: "dorms" }],
  },
  {
    name: "Caretta",
    description:
      "Suspendisse a ipsum lacinia purus dictum porttitor et a nisl. Cras augue lectus, ultricies vitae turpis dignissim, tincidunt blandit eros. Morbi egestas vitae odio vitae vulputate.",
    address: {
      addressLine: "Caretta Dormitory",
      city: "Famagusta",
      postalCode: "99466",
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
        url: "http://carettadorm.com/wp-content/uploads/2018/08/DSC_0806-rev-800x530.jpg",
        description: "Test Image 2",
      },
    ],
    keywords: [{ tag: "dorm" }, { tag: "dorms" }],
  },
  {
    name: "Home",
    description:
      "Vestibulum finibus sollicitudin metus sed condimentum. In hac habitasse platea dictumst. Proin a metus quis augue imperdiet mollis ut eu neque.",
    address: {
      addressLine: "Home Dormitory",
      city: "Famagusta",
      postalCode: "99467",
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
        url: "https://housing.unc.edu/wp-content/uploads/2020/04/corridor-single-10.jpg",
        description: "Test Image 2",
      },
    ],
    keywords: [{ tag: "dorm" }, { tag: "dorms" }],
  },
  {
    name: "Hall",
    description:
      "Integer ut maximus turpis. Sed iaculis fringilla viverra. Donec tempus blandit fringilla. In sodales vitae nulla sit amet ornare.",
    address: {
      addressLine: "Hall Dormitory",
      city: "Famagusta",
      postalCode: "99468",
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
        url: "https://www.studenthall.com.cy/Content/img/about.jpg?v=1",
        description: "Test Image 2",
      },
    ],
    keywords: [{ tag: "dorm" }, { tag: "dorms" }],
  },
  {
    name: "Ecam Court",
    description:
      "Quisque tincidunt sapien ac ex convallis mattis. Vestibulum at suscipit leo, nec condimentum ante. Cras non porta augue. Fusce turpis nulla, varius nec eros sed, dictum auctor arcu.",
    address: {
      addressLine: "Ecam Court Dormitory",
      city: "Famagusta",
      postalCode: "99469",
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
        url: "https://ecamcourt.com/wp-content/uploads/2016/08/DSC_0016.jpg",
        description: "Test Image 2",
      },
    ],
    keywords: [{ tag: "dorm" }, { tag: "dorms" }],
  },
  {
    name: "Yucel",
    description:
      "Suspendisse in orci arcu. Nam nec fringilla enim, ut dapibus eros. Suspendisse ullamcorper ipsum at leo ultricies, id tristique sem interdum. Donec elementum enim augue, nec rutrum ipsum finibus nec. Integer vel posuere neque.",
    address: {
      addressLine: "yucel Dormitory",
      city: "Famagusta",
      postalCode: "99470",
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
        url: "https://www.yucelresidence.com//media/k2/galleries/3/STD_4060.jpg",
        description: "Test Image 2",
      },
    ],
    keywords: [{ tag: "dorm" }, { tag: "dorms" }],
  },
];

module.exports = { dorms };
