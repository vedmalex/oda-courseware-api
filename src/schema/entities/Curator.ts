export default {
  name: 'Curator',
  description: 'Person role to be curator',
  fields: {
    person: {
      indexed: true,
      relation: {
        belongsTo: 'Person#',
        opposite: 'asCurator',
      },
    },
    groups: {
      relation: {
        hasMany: 'Group#curator',
        opposite: 'curator',
      },
    },
  },
};
