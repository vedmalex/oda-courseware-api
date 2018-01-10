export default {
  name: 'Subject',
  description: 'Subject to be learned',
  fields: {
    name: { identity: true },
    course: {
      relation: {
        belongsToMany: 'Course#',
        using: 'SubjectCourse#subject',
        fields: {
          hours: {
            type: 'number',
          },
          level: {
            type: 'text',
            description: 'the level of depth'
          },
        }
      }
    }
  },
};
