export default {
  name: 'Meeting',
  description: 'Meeting',
  fields: {
    date: {
      type: 'Date',
    },
    curator: {
      indexed: true,
      relation: {
        belongsTo: 'Curator#',
      },
    },
    group: {
      indexed: true,
      relation: {
        belongsTo: 'Group#',
      },
    },
    students: {
      relation: {
        belongsToMany: "Student#",
        using: "StudentAttendance#meeting",
        fields: {
          present: { type: 'boolean' },
          specialNotes: {}
        }
      }
    }
  }
}
