export default {
  name: 'Person',
  fields: {
    spiritualName: {
      identity: true,
      indexed: 'text',
    },
    fullName: {
      identity: true,
      indexed: 'text',
    },
    dateOfBirth: {
      type: 'Date',
    },
    ages: {
      type: 'Number',
      derived: true,
    },
    user: {
      indexed: true,
      relation: {
        belongsTo: 'User#',
      },
    },
    socialNetworks: {
      relation: {
        hasMany: 'SocialNetwork#person',
      },
    },
    phones: {
      relation: {
        hasMany: 'Phone#person',
      },
    },
    emails: {
      relation: {
        hasMany: 'Email#person',
      },
    },
    asStudents: {
      relation: {
        hasMany: 'Student#person',
      },
    },
    asCurator: {
      relation: {
        hasOne: "Curator#person",
      }
    },
    specialNotes: {
      type: 'richText',
      indexed: true,
    }
  },
};
