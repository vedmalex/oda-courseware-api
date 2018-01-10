export default {
  name: 'Group',
  fields: {
    name: {
      identity: true,
    },
    course: {
      indexed: true,
      relation: {
        belongsTo: 'Course#',
        opposite: 'groups',
      }
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
