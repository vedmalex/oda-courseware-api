export default {
  name: 'User',
  description: 'Person role to be user identified in the system',
  fields: {
    userName: {
      identity: true,
    },
    password: {
      required: true,
    },
    isAdmin: {
      type: 'boolean',
    },
    isSystem: {
      type: 'boolean',
    },
    enabled: {
      type: 'boolean',
    },
  },
};
