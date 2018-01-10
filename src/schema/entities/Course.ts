export default {
  name: 'Course',
  description: 'Course',
  fields: {
    name: {
      identity: true,
    },
    subjects: {
      relation: {
        belongsToMany: 'Subject#',
        using: 'SubjectCourse#course',
      },
    },
    groups: {
      relation: {
        hasMany: 'Group#course',
        opposite: 'course',
      }
    },
  },
};
