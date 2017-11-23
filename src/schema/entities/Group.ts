export default {
  name: 'Group',
  fields: {
    name: {
      identity: true,
    },
    students: {
      relation: {
        hasMany: 'Student#group',
      },
    },
    curator: {
      indexed: true,
      relation: {
        belongsTo: 'Curator#',
      },
    },
  },
};
