export default {
  name: 'StudentAttendance',
  description: 'StudentAttendance',
  fields: {
    meetingLink: {
      indexed: true,
      relation: {
        belongsTo: 'meeting@Meeting#',
      },
    },
    studentLink: {
      indexed: true,
      relation: {
        belongsTo: 'student@Student#',
      },
    },
    present: {
      required: true,
      type: 'boolean',
    },
    specialNotes: {
    },
  }
}
