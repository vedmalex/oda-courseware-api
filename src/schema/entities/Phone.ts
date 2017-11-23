export default {
  name: 'Phone',
  fields: {
    phoneNumber: {
      identity: true,
    },
    type: {
      indexed: true,
      relation: {
        belongsTo: 'PhoneType#name',
      },
    },
    person: {
      indexed: true,
      relation: {
        belongsTo: 'Person#',
        opposite: 'phones',
      },
    },
  },
};
