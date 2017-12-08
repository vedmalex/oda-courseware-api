export default {
  name: 'Student',
  description: 'person role to be student',
  fields: {
    person: {
      indexed: true,
      relation: {
        belongsTo: 'Person#',
        opposite: 'asStudents',
      },
    },
    group: {
      indexed: true,
      relation: {
        belongsTo: 'Group#',
        opposite: 'students',
      },
    },
    meetings: {
      relation: {
        belongsToMany: "Meeting#",
        using: "StudentAttendance#student",
      }
    }
  },

};
