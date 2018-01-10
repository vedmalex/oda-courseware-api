export default {
  name: 'SubjectCourse',
  description: 'SubjectCourse',
  fields: {
    description: {
      indexed: true,
    },
    subject: {
      indexed: true,
    },
    course: {
      indexed: true,
    },
    subjectLink: {
      relation: {
        belongsTo: 'subject@Subject#',
      }
    },
    courseLink: {
      relation: {
        belongsTo: 'course@Course#',
      }
    },
    hours: {
      type: 'number',
    },
    level: {
      type: 'text',
      description: 'the level of depth'
    },
  },
};
