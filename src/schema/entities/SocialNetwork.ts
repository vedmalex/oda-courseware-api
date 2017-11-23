export default {
  name: 'SocialNetwork',
  fields: {
    account: {
      identity: true,
    },
    url: {
      indexed: true,
    },
    type: {
      indexed: true,
      relation: {
        belongsTo: 'SocialNetworkType#name',
      },
    },
    person: {
      indexed: true,
      relation: {
        belongsTo: 'Person#',
        opposite: 'socialNetworks',
      },
    },
  },
};
