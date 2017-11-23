export default {
  name: 'Email',
  fields: {
    email: {
      identity: true,
    },
    type: {
      indexed: true,
      relation: {
        belongsTo: 'EmailType#name',
      },
    },
    person: {
      indexed: true,
      relation: {
        belongsTo: 'Person#',
        opposite: 'emails',
      },
    },
  },
};
