export default {
  name: 'StudentAttendance',
  description: 'StudentAttendance',
  fields: {
    meeting: {
      indexed: true,
    },
    student: {
      indexed: true,
    },
    meetingLink: {
      relation: {
        belongsTo: 'meeting@Meeting#',
      },
    },
    studentLink: {
      relation: {
        belongsTo: 'student@Student#',
      },
    },
    present: {
      required: true,
      type: 'boolean',
    },
    specialNotes: {
      type: 'richText',
    },
  }
}
